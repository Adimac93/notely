<template>
  <header>
    
  </header>
  <main>
    <div class="grid justify-items-center justify-center mx-10">

      <label class="font-bold pt-5" >Notes</label>
      <br>
      <input type="text" class="note-content p-2 border-2 rounded-md " v-model="title" placeholder="Title..." 
      @focus="playSound('mouse_click.mp3')"
      >
      <br>
      <textarea class="p-2 border-2 rounded-md" rows="5" cols="50" v-model="text" placeholder="Place for your note ↴" 
      @focus="playSound('mouse_click.mp3')"
      ></textarea>
      <label class="p-2">{{text.length}} / {{maxChars}}</label>
      <div class="inline-flex">
        <button v-if="text.length <= maxChars" class="note-save p-1 w-20 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-100 rounded-r-none" 
        @click="saveNote(), playSound('mouse_click.mp3')"
        >Save</button>
        <button v-else class="note-save p-1 w-20 bg-gray-100 rounded-md opacity-70 rounded-r-none">Save</button>
        <button class="note-save p-1 w-20 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-100 rounded-l-none" 
        @click="clearFields(), playSound('mouse_click.mp3')"
        >Clear</button>
      </div>
      
      <br>
      <ul class="note-view items-center cursor-pointer">
        <li class="note text-center break-words max-w-6xl hover:bg-gray-100 active:bg-gray-200 rounded-md" 
        v-for="(note, index) in notes" :key="note.title" 
        @click="displayNote(index)" 
        @dblclick="delNote(index)"
        >
          <a class="font-bold">{{note.title}}</a> - {{note.text}}
        </li>
        
      </ul>

    </div>
  </main>
  
  
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { Note } from './Note'

export default defineComponent({

  name: "app",
  data() {
    return {

      title:<string> '',
      text:<string> '',
      notes:<Note[]> JSON.parse(localStorage.getItem("notes") ?? "[]"),

      maxChars:<number> 1000,
      currentChars:<number> 0,
      
    }
  },
  methods: {
    playSound(sound: string) {
      if(sound) {
        var audio = new Audio(sound);
        audio.volume = 0.05;
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
