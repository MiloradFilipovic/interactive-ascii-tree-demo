<script setup lang="ts">
import type { TreeNode } from '@/parsers/TreeNode'
import hljs from 'highlight.js'
import html from 'highlight.js/lib/languages/xml'
import { HTMLGenerator } from '@/generators/HTMLGenerator'
import { computed } from 'vue'

hljs.registerLanguage('xml', html)

type Props = {
  tree: TreeNode[]
}

// TODO: Add root element css class to options
const htmlGenerator = new HTMLGenerator()

const props = defineProps<Props>()

const result = computed(() => htmlGenerator.renderTree(props.tree))
</script>

<template>
  <div :class="$style.container">
    <pre>{{ result }}</pre>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: auto;

  &:hover .copy-button {
    display: block;
  }
}

.under-construction {
  display: flex;
  gap: 0.5rem;
}

.copy-button {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
