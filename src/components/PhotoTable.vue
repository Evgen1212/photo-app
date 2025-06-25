<script setup>
import { computed, ref } from 'vue'
import { usePhotosStore } from '../store/photos'
import GlobalTooltip from './GlobalTooltip.vue'

const store = usePhotosStore()
const tooltipData = ref({ show: false, text: '' })

const columns = [
  { key: 'id', label: 'id', max: '60px' },
  { key: 'albumId', label: 'Альбом', max: '60px' },
  { key: 'title', label: 'Название', max: '120px' },
  { key: 'url', label: 'Ссылка', max: '120px' },
  { key: 'thumbnailUrl', label: 'Миниатюра', max: '80px' },
]

// Обработчик сортировки
const handleSort = (key) => {
  store.setSort(key)
}

// Обработчик скролла для бесконечной загрузки
const onScroll = (e) => {
  const el = e.target
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10 && !store.loading && !store.allLoaded) {
    store.loadMore()
  }
}

// Показать tooltip
const handleMouseEnter = (text) => {
  tooltipData.value = { show: true, text }
}

// Скрыть tooltip
const handleMouseLeave = () => {
  tooltipData.value = { show: false, text: '' }
}
</script>
<template>
  <div class="relative w-[600px] h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
    <div class="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <table class="w-full text-sm table-fixed">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" @click="handleSort(col.key)" class="cursor-pointer select-none px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" :style="col.key === 'id' || col.key === 'albumId' ? {width: '80px'} : {}">
              <div class="flex items-center gap-2">
                <span>{{ col.label }}</span>
                <span v-if="store.sort.key === col.key" class="text-blue-500">
                  {{ store.sort.order === 'asc' ? '▲' : '▼' }}
                </span>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- Тело таблицы с прокруткой -->
    <div class="flex-1 overflow-y-auto" @scroll="onScroll">
      <table class="w-full text-sm table-fixed">
        <tbody>
          <!-- Состояние загрузки -->
          <tr v-if="store.loading">
            <td :colspan="columns.length" class="text-center py-10">
              <div class="flex flex-col items-center gap-2">
                <div class="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-gray-600 dark:text-gray-400">Загрузка...</span>
              </div>
            </td>
          </tr>
          <!-- Состояние ошибки -->
          <tr v-else-if="store.error">
            <td :colspan="columns.length" class="text-center text-red-500 py-10">{{ store.error }}</td>
          </tr>
          <!-- Пустое состояние -->
          <tr v-else-if="!store.paginatedPhotos.length">
            <td :colspan="columns.length" class="text-center py-10 text-gray-500 dark:text-gray-400">Нет данных</td>
          </tr>
          <!-- Строки с данными -->
          <tr 
            v-for="(photo, index) in store.paginatedPhotos" 
            :key="photo.id" 
            class="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            :class="index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'"
          >
            <td 
              class="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium cursor-pointer"
              style="width: 80px"
              @mouseenter="handleMouseEnter(photo.id)"
              @mouseleave="handleMouseLeave"
            >
              <div class="truncate">{{ photo.id }}</div>
            </td>
            <td 
              class="px-4 py-3 text-gray-700 dark:text-gray-300 cursor-pointer"
              style="width: 80px"
              @mouseenter="handleMouseEnter(photo.albumId)"
              @mouseleave="handleMouseLeave"
            >
              <div class="truncate">{{ photo.albumId }}</div>
            </td>
            <td 
              class="px-4 py-3 text-gray-700 dark:text-gray-300 cursor-pointer"
              @mouseenter="handleMouseEnter(photo.title)"
              @mouseleave="handleMouseLeave"
            >
              <div class="truncate">{{ photo.title }}</div>
            </td>
            <td 
              class="px-4 py-3 text-gray-700 dark:text-gray-300 cursor-pointer"
              @mouseenter="handleMouseEnter(photo.url)"
              @mouseleave="handleMouseLeave"
            >
              <div class="truncate">{{ photo.url }}</div>
            </td>
            <td 
              class="px-4 py-3 text-gray-700 dark:text-gray-300 cursor-pointer"
              @mouseenter="handleMouseEnter(photo.thumbnailUrl)"
              @mouseleave="handleMouseLeave"
            >
              <div class="truncate">{{ photo.thumbnailUrl }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Глобальный tooltip -->
    <GlobalTooltip 
      :show="tooltipData.show" 
      :text="tooltipData.text"
    />
  </div>
</template> 