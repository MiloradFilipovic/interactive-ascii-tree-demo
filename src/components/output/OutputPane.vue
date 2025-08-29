<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store'
import InteractiveASCIITree from '@/components/output/InteractiveASCIITree.vue'
import { computed } from 'vue'
import OutputTabs from '@/components/output/OutputTabs.vue'

const uiStore = useUIStore()

const activeTab = computed(() => uiStore.outputMode)

const currentTextInput = computed(() => uiStore.textEditorValue)
</script>
<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <h2>Result</h2>
      <OutputTabs :disabled="currentTextInput === ''" />
    </header>
    <InteractiveASCIITree v-if="activeTab === 'ascii'" :textInput="currentTextInput" />
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
