<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  text: {
    type: [String, Number],
    default: ''
  }
})

const tooltipRef = ref(null)
const position = ref({ x: 0, y: 0 })

// Обновление позиции tooltip при движении мыши
const updatePosition = (event) => {
  if (event) {
    position.value = { x: event.clientX, y: event.clientY }
  }
}

onMounted(() => {
  // Слушатель движения мыши для позиционирования
  document.addEventListener('mousemove', updatePosition)
})

onUnmounted(() => {
  // Очистка слушателя
  document.removeEventListener('mousemove', updatePosition)
})
</script>

<template>
  <!-- Глобальный tooltip с динамическим позиционированием -->
  <div
    v-if="show && text"
    ref="tooltipRef"
    class="fixed z-[9999] px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
    :style="{
      left: position.x + 10 + 'px',
      top: position.y + 10 + 'px'
    }"
  >
    {{ text }}
  </div>
</template> 