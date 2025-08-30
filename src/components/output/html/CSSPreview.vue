<script setup lang="ts">
import hljs from 'highlight.js'
import css from 'highlight.js/lib/languages/css'
import { TREE_CSS } from '@/components/output/html/css-code.constant'
import CopyButton from '@/components/output/CopyButton.vue'

// TODO: Add root element css class to options
hljs.registerLanguage('css', css)

const code = hljs.highlight(TREE_CSS, {
  language: 'CSS',
}).value
</script>

<template>
  <div :class="$style.container">
    <CopyButton
      :class="$style['copy-button']"
      :textToCopy="`<style>${TREE_CSS}</style>`"
      copyLabel="Copy CSS"
    />
    <pre :class="$style.code" v-html="code"></pre>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.code {
  width: 100%;
  max-height: 500px;
  overflow: auto;
}

.copy-button {
  position: absolute;
  top: 0;
  right: 0.6rem;
}
</style>
