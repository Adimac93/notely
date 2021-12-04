<template>
  <header></header>
  <main>
    <div class="grid justify-items-center justify-center mx-10">
      <div v-if="!isLoggedIn" class="password-box">
        <div v-if="password" class="inline-flex bg-gray-100 rounded-md m-5">
          <label class="m-2">Enter your password to register</label>
          <input
            class="border-2 rounded-md m-2"
            type="password"
            v-model="password1"
            @keyup.enter="checkPassword(password1)"
            @focus="playSound('mouse_click.mp3')"
          />
          <button
            class="m-2"
            @click="checkPassword(password1), playSound('mouse_click.mp3')"
          >Register</button>
        </div>
        <div v-else class="inline-flex bg-gray-100 rounded-md">
          <label class="m-2">Enter your password to log in</label>
          <input
            class="border-2 rounded-md m-2"
            v-model="password1"
            type="password"
            placeholder="Enter your password..."
            @keyup.enter="checkPassword(password1)"
            @focus="playSound('mouse_click.mp3')"
          />
          <input
            class="border-2 rounded-md m-2"
            v-model="password2"
            type="password"
            placeholder="Repeat your password..."
            @keyup.enter="checkPassword(password1)"
            @focus="playSound('mouse_click.mp3')"
          />
          <button
            class="m-2"
            @click="savePassword(password1, matchPasswords(password1, password2)), playSound('mouse_click.mp3')"
          >Log in</button>
        </div>
      </div>
      <div v-else class="note-box grid justify-items-center justify-center mx-10">
        <label class="font-bold pt-5 font">Notes</label>
        <br />
        <input
          v-model="title"
          placeholder="Title..."
          type="text"
          class="note-content p-2 border-2 rounded-md shadow-sm"
          @focus="playSound('mouse_click.mp3')"
        />
        <br />
        <textarea
          v-model="text"
          placeholder="Place for your note ↴"
          class="p-2 border-2 rounded-md shadow-sm"
          rows="5"
          cols="50"
          @focus="playSound('mouse_click.mp3')"
        ></textarea>
        <label class="p-2">{{ text.length }} / {{ maxChars }}</label>
        <div class="inline-flex">
          <button
            v-if="text.length <= maxChars"
            class="note-save shadow-md p-1 w-20 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-100 rounded-r-none"
            @click="saveNote(), playSound('mouse_click.mp3')"
          >Save</button>
          <button
            v-else
            class="note-save shadow-md p-1 w-20 bg-gray-100 rounded-md opacity-70 rounded-r-none"
          >Save</button>
          <button
            class="note-save shadow-md p-1 w-20 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-100 rounded-l-none"
            @click="clearFields(), playSound('mouse_click.mp3')"
          >Clear</button>
        </div>

        <br />
        <ul class="note-view items-center cursor-pointer">
          <!-- <li
            class="note text-center break-words max-w-6xl hover:bg-gray-100 active:bg-gray-200 rounded-md"
            v-for="(note, index) in notes"
            :key="note.title"
            @click="displayNote(index)"
            @dblclick="delNote(index)"
          >
            <a class="font-bold">{{ note.title }}</a>
            - {{ note.text }}
          </li>-->
          <NoteDisplay
            v-for="(note, index) in notes"
            :key="note.title"
            :noteTitle="note.title"
            :noteText="note.text"
            @isDelete="delNote(index)"
          ></NoteDisplay>
        </ul>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import NoteDisplay from './components/NoteDisplay.vue';
import { Note } from './Note'
export default defineComponent({
  components: {
    NoteDisplay
  },
  name: "app",
  data() {
    return {
      title: <string>'',
      text: <string>'',
      notes: <Note[]>JSON.parse(localStorage.getItem('notes') ?? '[]'),


      maxChars: <number>10000,
      currentChars: <number>0,


      isLoggedIn: <boolean>false,
      isMatching: <boolean>false,

      password: <string>localStorage.getItem('password') ?? '',
      password1: <string>'',
      password2: <string>'',

    }
  },
  methods: {
    matchPasswords(password1: string, password2: string) {
      if (password1 == password2) {
        return true
      }
      return false
    },
    async savePassword(password: string, perrmision: boolean) {
      if (perrmision) {
        const msgUint8 = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        console.log(hashHex)
        localStorage.setItem('password', hashHex)

        this.isLoggedIn = true
      }

    },
    async checkPassword(password: string) {

      const msgUint8 = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      console.log(hashHex)
      if (hashHex == localStorage.getItem('password')) {
        console.log('Matching password!')
        this.isLoggedIn = true
      }
      else {
        console.log('Wrong password!')
        this.isLoggedIn = false
      }

    },
    playSound(sound: string) {
      if (sound) {
        var audio = new Audio(sound);
        audio.volume = 0.08;
        audio.play();
      }

    },
    saveNote(): void {
      if (this.title != '' && this.text != '') {
        this.notes.unshift({
          title: this.title,
          text: this.text

        })
        localStorage.setItem("notes", JSON.stringify(this.notes))
      }

    },
    clearFields(): void {
      this.title = ''
      this.text = ''
    },
    displayNote(itemIndex: number): void {
      this.title = this.notes[itemIndex]["title"]
      this.text = this.notes[itemIndex]["text"]
    },
    delNote(itemIndex: number) {
      this.notes.splice(itemIndex, 1)
      localStorage.setItem("notes", JSON.stringify(this.notes))
    }
  },
  checkPassword(password: string) {

  },



});

</script>

<style>
* {
  border-color: aquamarine;
  border: 2px;
}
textarea {
  font-size: 20px;
}
</style>
