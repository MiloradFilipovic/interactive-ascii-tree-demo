<script setup lang="ts">
import type { TreeNode } from '@/parsers/TreeNode'
import hljs from 'highlight.js'
import html from 'highlight.js/lib/languages/xml'
import { HTMLGenerator } from '@/generators/HTMLGenerator'
import { computed } from 'vue'
import CopyButton from '@/components/output/CopyButton.vue'

hljs.registerLanguage('xml', html)

type Props = {
  tree: TreeNode[]
}

// TODO: Add root element css class to options
const htmlGenerator = new HTMLGenerator()

const props = defineProps<Props>()

const result = computed(() => htmlGenerator.renderTree(props.tree))

const highlightedCode = computed(() => {
  if (!result.value) return ''
  return hljs.highlight(result.value, {
    language: 'xml',
  }).value
})
</script>

<template>
  <div :class="$style.container">
    <CopyButton
      v-if="result"
      :class="$style['copy-button']"
      :textToCopy="result"
      copyLabel="Copy HTML"
    />
    <pre v-html="highlightedCode" :class="$style.code"></pre>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.code {
  overflow: auto;
}

.copy-button {
  position: absolute;
  top: 0;
  right: 0.6rem;
}
</style>
