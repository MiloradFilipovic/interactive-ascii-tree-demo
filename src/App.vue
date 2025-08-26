<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useUIStore } from './stores/ui.store'
import { computed } from 'vue'

const uiStore = useUIStore()

const currentTheme = computed(() => uiStore.theme)
</script>

<template>
  <div :class="$style['app-container']" :data-theme="currentTheme">
    <div :class="$style.toolbar">
      <ThemeToggle />
    </div>
    <div :class="$style.header">
      <div>
        <h1>
          <code>interactive-ascii-tree Demo</code>
        </h1>
        <p>Interactive ASCII tree component built with Vue3 and TypeScript.</p>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.app-container {
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: calc(100vh - 1rem);
  padding: 0.5rem;

  background-color: var(--background-color);
  color: var(--text-color);
}

.toolbar {
  display: flex;
  justify-content: end;
  width: 100%;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  h1 {
    margin: 0;
  }

  p {
    margin: 0;
    color: var(--text-color-lighter);
  }
}
</style>
