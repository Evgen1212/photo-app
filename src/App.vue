<script setup>
import { onMounted, onUnmounted } from 'vue'
import { usePhotosStore } from './store/photos'
import PhotoFilter from './components/PhotoFilter.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import PhotoTable from './components/PhotoTable.vue'

const store = usePhotosStore()

// Обработчик системных изменений темы
const handleSystemThemeChange = () => {
  if (store.theme === 'system') {
    document.documentElement.classList.remove('dark')
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  }
}

onMounted(() => {
  // Восстановление настроек и загрузка данных
  store.restoreFromStorage()
  store.fetchPhotos(store.albumIds)
  
  // Инициализация темы
  if (store.theme === 'system') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  } else if (store.theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
  
  // Слушатель изменений системной темы
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange)
})

onUnmounted(() => {
  // Очистка слушателя
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleSystemThemeChange)
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
    <div class="w-full max-w-xl flex flex-col items-center gap-4 py-8">
      <!-- Панель управления -->
      <div class="flex w-full gap-2 items-center justify-between">
        <PhotoFilter />
        <ThemeToggle />
      </div>
      <PhotoTable />
    </div>
  </div>
</template>

<style>
html.dark {
  background: #18181b;
}
</style>
