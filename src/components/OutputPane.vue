<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store'
import InteractiveASCIITree from '@/vue-interactive-ascii-tree/InteractiveASCIITree.vue'
import { computed } from 'vue'

const uiStore = useUIStore()

const currentTextInput = computed(() => uiStore.textEditorValue)
</script>
<template>
  <div :class="$style.container">
    <h2>Output</h2>
    <InteractiveASCIITree :textInput="currentTextInput" />
  </div>
</template>
<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.content {
  padding: 0.5rem;
  font-size: 1.1em;
  font-weight: normal;
  font-family: monospace;
}
</style>
