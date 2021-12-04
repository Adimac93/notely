<template>
  <div class="rounded-sm p-1">
    <div class="inline-flex">
      <div
        class="border bg-gray-100 px-10 py-6 shadow-md hover:opacity-70"
        :class="{ 'rounded-md rounded-r-none': !isVisible, 'rounded-t-md rounded-r-none': isVisible }"
        @click="isVisible = !isVisible"
      >
        <button class="font-bold text-black focus:outline-none" type="button">{{ noteTitle }}</button>
      </div>
      <button
        class="border bg-gray-100 px-6 py-6 shadow-md rounded-r-md hover:opacity-70"
        :class="{ 'rounded-b-none': isVisible }"
        @click="$emit('delete', $event)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
          <path
            d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
          />
        </svg>
      </button>
    </div>

    <div v-if="isVisible" class="dark:bg-gray-100 border px-10 py-6 rounded-b-md">{{ noteText }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  noteTitle: {
    type: String,
    default: 'Title'
  },
  noteText: {
    type: String,
    default: 'Text'
  }


})

</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      isVisible: <boolean>false,

    }
  }
})
</script>

<style>
</style>