<script setup lang="ts">
import { AsciiGenerator } from '@/generators/ASCIIGenerator'
import type { TreeNode } from '@/parsers/TreeNode'
import { computed } from 'vue'
import CopyButton from '@/components/output/CopyButton.vue'
import { HTMLGenerator } from '@/generators/HTMLGenerator'

type Props = {
  tree: TreeNode[]
}

const asciiGenerator = new AsciiGenerator()
const htmlGenerator = new HTMLGenerator()

const props = defineProps<Props>()

// TODO: Looks like pipes are missing from ASCII output
const asciiResult = computed(() => asciiGenerator.renderTree(props.tree))

const htmlResult = computed(() => htmlGenerator.renderTree(props.tree))
</script>

<template>
  <div :class="$style.container">
    <CopyButton
      v-if="asciiResult"
      :class="$style['copy-button']"
      :textToCopy="asciiResult"
      copyLabel="Copy ASCII Tree"
    />
    <div v-html="htmlResult"></div>
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

.copy-button {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}
</style>

<style>
/* TODO: Figure out how to load styles from the constant */
.interactive-ascii-tree {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.2;
}

.interactive-ascii-tree ul {
  list-style: none;
  margin: 0;
  padding-left: 0;
  position: relative;
}

.interactive-ascii-tree li {
  margin: 0;
  padding: 2px 0;
  position: relative;
}

.interactive-ascii-tree li li {
  padding-left: 2em;
}

.interactive-ascii-tree li li > *:first-child::before {
  content: '├── ';
  color: #666;
  position: absolute;
  left: 0;
}

.interactive-ascii-tree li li:last-child > *:first-child::before {
  content: '└── ';
}

.interactive-ascii-tree li li::after {
  content: '│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│';
  color: #666;
  position: absolute;
  left: 0;
  top: 1.4em;
  white-space: pre-line;
  line-height: 1.2;
  pointer-events: none;
  overflow: hidden;
  height: calc(100% - 1.4em);
}

.interactive-ascii-tree li li:last-child::after {
  display: none;
}

.interactive-ascii-tree > li::after,
.interactive-ascii-tree > li > *:first-child::before {
  display: none !important;
}

.interactive-ascii-tree details {
  display: block;
}

.interactive-ascii-tree summary {
  cursor: pointer;
  display: inline;
  outline: none;
  user-select: none;
}

.interactive-ascii-tree summary::marker,
.interactive-ascii-tree summary::-webkit-details-marker {
  display: none;
}

.interactive-ascii-tree summary::after {
  content: ' [+]';
  color: #666;
}

.interactive-ascii-tree details[open] > summary::after {
  content: ' [-]';
}

.interactive-ascii-tree summary:focus-visible {
  background: rgba(0, 100, 200, 0.1);
  outline: 2px solid #0064c8;
  outline-offset: 2px;
  border-radius: 2px;
}

.interactive-ascii-tree summary:hover {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.interactive-ascii-tree li li > span::before {
  content: '├── ';
  color: #666;
  position: absolute;
  left: 0;
}

.interactive-ascii-tree li li:last-child > span::before {
  content: '└── ';
}
</style>
