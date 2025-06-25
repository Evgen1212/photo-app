<script setup>
import { ref, computed } from 'vue'
import { usePhotosStore } from '../store/photos'

const store = usePhotosStore()
const isOpen = ref(false)

// Доступные темы
const themes = [
  { value: 'system', label: 'Как в системе', icon: '🖥️' },
  { value: 'light', label: 'Светлая', icon: '☀️' },
  { value: 'dark', label: 'Тёмная', icon: '🌙' }
]

// Текущая активная тема
const currentTheme = computed(() => {
  return themes.find(t => t.value === store.theme) || themes[0]
})

// Обработчик смены темы
const handleThemeChange = (theme) => {
  store.setTheme(theme)
  
  // Удаляем все классы тем
  document.documentElement.classList.remove('dark', 'light')
  
  if (theme === 'system') {
    // Проверяем системную тему
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
      console.log('Applied dark theme (system)')
    } else {
      document.documentElement.classList.add('light')
      console.log('Applied light theme (system)')
    }
  } else if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    console.log('Applied dark theme')
  } else {
    // light theme - не добавляем класс, используем дефолтные стили
    console.log('Applied light theme')
  }
  
  console.log('Current classes:', document.documentElement.className)
  isOpen.value = false
}

// Переключение выпадающего меню
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="relative">
    <!-- Кнопка переключения темы -->
    <button 
      @click="toggleDropdown"
      class="ml-2 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
      :title="`Тема: ${currentTheme.label}`"
    >
      <span>{{ currentTheme.icon }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <!-- Выпадающее меню с темами -->
    <div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <div class="py-1">
        <button
          v-for="theme in themes"
          :key="theme.value"
          @click="handleThemeChange(theme.value)"
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors text-gray-700 dark:text-white"
          :class="{ 'bg-blue-50 dark:bg-blue-900': theme.value === store.theme }"
        >
          <span>{{ theme.icon }}</span>
          <span>{{ theme.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template> 