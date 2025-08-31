<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store'
import { computed } from 'vue'

import { Moon, Sun } from 'lucide-vue-next'

const uiStore = useUIStore()

const currentTheme = computed(() => uiStore.theme)

const icon = computed(() => (currentTheme.value === 'light' ? Moon : Sun))

const toggleTheme = () => {
  uiStore.updateTheme(currentTheme.value === 'light' ? 'dark' : 'light')
}
</script>

<template>
  <div>
    <button :class="$style['theme-toggle']" @click="toggleTheme">
      <component :is="icon" :size="14" />
      {{ currentTheme === 'light' ? 'Dark' : 'Light' }}
    </button>
  </div>
</template>

<style module lang="scss">
.theme-toggle {
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  outline: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.9rem;
  background-color: var(--background-color);
  color: var(--text-color-base);
  border: 1px solid var(--text-color-dark);
}
</style>
