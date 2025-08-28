<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store'
import { TextParser } from '@/vue-interactive-ascii-tree/parsers/textParser/TextParser'
import { computed } from 'vue'

const uiStore = useUIStore()

const textParser = new TextParser({
  tabWidth: 2,
  minIndentDiff: 1,
})

const currentTextInput = computed(() => uiStore.textEditorValue)

const renderedText = computed(() => {
  // TODO: Handle errors
  if (currentTextInput.value.trim() === '') {
    return ''
  }
  const tree = textParser.parse(currentTextInput.value)
  return textParser.render(tree)
})
</script>
<template>
  <div :class="$style.container">
    <h2>Output</h2>
    <pre :class="$style.content">{{ renderedText }}</pre>
  </div>
</template>
<style module lang="scss">
.container {
  display: block;
}
.content {
  padding: 0.5rem;
  font-size: 1.1em;
  font-weight: normal;
  font-family: monospace;
}
</style>
