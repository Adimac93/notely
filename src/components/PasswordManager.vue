<template>
  <div
    v-if="password"
    class="dark:bg-gray-800 dark:text-gray-100 inline-flex bg-gray-100 rounded-md m-5"
  >
    <label class="m-2">Enter your password to log in</label>
    <input
      class="dark:bg-gray-700 border-2 rounded-md m-2"
      type="password"
      v-model="password1"
      @keyup.enter="checkPassword(password1)"
    />
    <!-- <input
      class="dark:bg-gray-700 border-2 rounded-md m-2"
      type="password"
      v-model="sessionHash"
      @keyup.enter="checkPassword(password1)"
    />-->
    <button
      class="inline-block dark:hover:text-gray-900 hover:text-white self-center text-sm h-8 px-4 py-2 mx-2 leading-none border rounded-md dark:text-white text-gray-800 dark:border-white border-gray-800 hover:border-transparent dark:hover:bg-white hover:bg-gray-800"
      @click="checkPassword(password1)"
    >Log in</button>
  </div>
  <div
    v-else
    class="justify-center items-center inline-flex dark:bg-gray-800 dark:text-gray-100 bg-gray-100 rounded-md"
  >
    <label class="m-2">Enter your password to register</label>
    <input
      class="dark:bg-gray-700 border-2 rounded-md m-2"
      v-model="password1"
      type="password"
      placeholder="Enter your password..."
      @keyup.enter="checkPassword(password1)"
    />
    <input
      class="dark:bg-gray-700 border-2 rounded-md m-2"
      v-model="password2"
      type="password"
      placeholder="Repeat your password..."
      @keyup.enter="checkPassword(password1)"
    />
    <button
      class="inline-block dark:hover:text-gray-900 hover:text-white self-center text-sm h-8 px-4 py-2 mx-2 leading-none border rounded-md dark:text-white text-gray-800 dark:border-white border-gray-800 hover:border-transparent dark:hover:bg-white hover:bg-gray-800"
      @click="savePassword(password1, password2)"
    >Register</button>
  </div>
</template>
<script setup lang="ts">
// const props = defineProps({
//   isLoggedI    type: Boolean,
//     default: false,
//   }

// })

</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {

      password: <string>localStorage.getItem('password') ?? '',
      password1: <string>'',
      password2: <string>'',
      sessionHash: <string>'',

    }
  },
  methods: {
    async checkPassword(password: string) {

      let passwordHash = await this.encrypt(password)
      if (passwordHash == localStorage.getItem('password')) {
        console.log('+Matching password')
        this.$emit('logIn', true)
      }
      else {
        console.log('+Wrong password')
        this.$emit('logIn', false)
      }
    },
    async savePassword(password1: string, password2: string) {
      if (password1 == password2) {
        let passwordHash = await this.encrypt(password1)
        localStorage.setItem('password', passwordHash)
        this.$emit('logIn', true)
        console.log('+Account created')
      }
    },
    async encrypt(data: string) {
      const msgUint8 = new TextEncoder().encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      return hashHex
    }
  },

})

</script>

<style>
</style>