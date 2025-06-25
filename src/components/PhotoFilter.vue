<script setup>
import { computed } from 'vue'
import { usePhotosStore } from '../store/photos'

const store = usePhotosStore()

// Двусторонняя привязка для поля ввода ID альбомов
const albumInput = computed({
  get: () => store.albumIds.join(' '),
  set: (value) => {
    const ids = value.trim().split(/\s+/).filter(Boolean)
    store.albumIds = ids
    localStorage.setItem('albumIds', ids.join(' '))
  }
})

// Обработчик поиска по альбомам
const handleSearch = () => {
  const ids = albumInput.value.trim().split(/\s+/).filter(Boolean)
  store.fetchPhotos(ids)
}
</script>
<template>
  <div class="flex w-full gap-2 items-center justify-between">
    <input
      v-model="albumInput"
      @keyup.enter="handleSearch"
      type="text"
      class="flex-1 rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
      placeholder="ID альбомов (например: 1 2 3)"
    />
    <button
      @click="handleSearch"
      :disabled="store.loading"
      class="ml-2 px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-60 flex items-center gap-2 transition-colors"
    >
      <svg v-if="store.loading" class="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
      <span>Поиск</span>
    </button>
  </div>

</template>
