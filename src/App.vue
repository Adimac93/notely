<template>
  <header></header>
  <main class="dark:bg-gray-900 min-h-screen">
    <div class="min-h-2 flex justify-items-end justify-end">
      <button
        v-if="isLoggedIn"
        class="p-2 rounded-md dark:shadow-none shadow-md dark:bg-gray-100 hover:bg-gray-200 active:bg-gray-100 justify-end right"
        @click="isLoggedIn = false, password1 = ''"
      >Log out</button>
    </div>
    <div class="grid justify-items-center justify-center mx-10">
      <div v-if="!isLoggedIn" class="justify-center items-center flex password-box h-screen">
        <PasswordManager @logIn="isLoggedIn = $event"></PasswordManager>
      </div>
      <div v-else class="note-box grid justify-items-center justify-center mx-10">
        <label class="dark:text-gray-100 font-bold pt-5 font">Notes</label>
        <br />
        <input
          v-model="title"
          :maxLength="maxCharsTitle"
          v-text="(maxCharsTitle - title.length)"
          placeholder="Title..."
          type="text"
          class="note-content p-2 border-2 rounded-md shadow-sm"
          @focus="playSound('mouse_click.mp3')"
        />
        <br />
        <textarea
          v-model="text"
          :maxlength="maxCharsText"
          v-text="(maxCharsText - text.length)"
          placeholder="Place for your note ↴"
          class="p-2 border-2 rounded-md shadow-sm"
          rows="5"
          cols="50"
          @focus="playSound('mouse_click.mp3')"
        ></textarea>
        <label class="dark:text-gray-100 p-2">{{ text.length }} / {{ maxCharsText }}</label>
        <div class="inline-flex">
          <button
            class="note-save shadow-md p-1 w-20 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-100 rounded-r-none"
            @click="saveNote(), playSound('mouse_click.mp3')"
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
            @delete="delNote(index)"
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
import PasswordManager from './components/PasswordManager.vue';
import PasswordManager1 from './components/PasswordManager.vue';
export default defineComponent({
  components: {
    NoteDisplay,
    PasswordManager,
    PasswordManager1
  },
  name: "app",
  data() {
    return {
      title: <string>'',
      text: <string>'',
      notes: <Note[]>JSON.parse(localStorage.getItem('notes') ?? '[]'),


      maxCharsText: <number>10000,
      currentChars: <number>0,

      maxCharsTitle: <number>20,

      isLoggedIn: <boolean>false,
      isMatching: <boolean>false,

      password: <string>localStorage.getItem('password') ?? '',
      password1: <string>'',
      password2: <string>'',

    }
  },
  methods: {
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
          text: this.text,
          iat: new Date().getTime()
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
