<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store'
import { computed } from 'vue'
import OutputTabs from '@/components/output/OutputTabs.vue'
import AsciiPreview from '@/components/output/ascii/ASCIIPreview.vue'
import CSSPreview from '@/components/output/html/CSSPreview.vue'
import HTMLPreview from '@/components/output/html/HTMLPreview.vue'
import WebComponentPreview from '@/components/output/WebComponentPreview.vue'
import { TextParser } from '@/parsers/textParser/TextParser'

const uiStore = useUIStore()

const textParser = new TextParser({
  tabWidth: 2,
  minIndentDiff: 1,
})

const tree = computed(() => textParser.parse(currentTextInput.value))

const activeTab = computed(() => uiStore.outputMode)

const currentTextInput = computed(() => uiStore.textEditorValue)
</script>
<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <h2>Result</h2>
      <OutputTabs :disabled="currentTextInput === ''" />
    </header>
    <AsciiPreview v-if="activeTab === 'ascii'" :tree="tree" />
    <HTMLPreview v-if="activeTab === 'html'" :tree="tree" />
    <CSSPreview v-if="activeTab === 'css'" :tree="tree" />
    <WebComponentPreview v-if="activeTab === 'web-component'" :tree="tree" />
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
