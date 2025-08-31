<script setup lang="ts">
import { AsciiGenerator } from '@/generators/ASCIIGenerator'
import type { TreeNode } from '@/parsers/TreeNode'
import { computed } from 'vue'
import CopyButton from '@/components/output/CopyButton.vue'
import { HTMLGenerator } from '@/generators/HTMLGenerator'
import { useUIStore } from '@/stores/ui.store'

type Props = {
  tree: TreeNode[]
}

const uiStore = useUIStore()

const currentTheme = computed(() => uiStore.theme)

const asciiGenerator = new AsciiGenerator()
const htmlGenerator = new HTMLGenerator()

const props = defineProps<Props>()

const asciiResult = computed(() => asciiGenerator.renderTree(props.tree))
const htmlResult = computed(() => htmlGenerator.renderTree(props.tree, currentTheme.value))
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
}

.copy-button {
  position: absolute;
  top: 0;
  right: 0.6rem;
}
</style>

<style>
/* TODO: Figure out how to load styles from the constant */
.interactive-ascii-tree {
  --background-color: #ffffff;
  --background-muted: #eeeeee;
  --text-color-base: #222222;
  --text-color-muted: #999999;

  &[data-theme='dark'] {
    --background-color: #222222;
    --background-muted: #555555;
    --text-color-base: #ffffff;
    --text-color-muted: #aaaaaa;
  }

  --indent: 4ch;
  --v-line: '│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A';

  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 1;
  font-family: "Consolas", "Menlo", "DejaVu Sans Mono", "Lucida Console", monospace;
  color: var(--text-color-base);

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin: 0;
    padding: 0;
    padding-top: 6px;
    position: relative;
    
    li {
      padding-left: var(--indent);
      
      > *:first-child::before {
        content: '├── ';
        color: var(--text-color-muted);
        position: absolute;
        left: 0;
      }
      
      &:last-child > *:first-child::before {
        content: '└── ';
      }
      
      &::after {
        content: var(--v-line);
        color: var(--text-color-muted);
        position: absolute;
        left: 0;
        top: 1.4em;
        white-space: pre-line;
        line-height: 1;
        pointer-events: none;
        overflow: hidden;
        height: calc(100% - 1.4em);
      }
      
      &:last-child::after {
        display: none;
      }
    }
  }
  
  > li {
    &::after,
    > *:first-child::before {
      display: none !important;
    }
  }
  
  summary {
    cursor: pointer;
    display: inline;
    outline: none;
    user-select: none;
    
    &::marker,
    &::-webkit-details-marker {
      display: none;
    }
    
    &::after {
      content: '[+]';
      color: var(--text-color-muted);
    }
    
    details[open] > &::after {
      content: '[-]';
    }
    
    &:hover {
      background: var(--background-muted);
      border-radius: 2px;
    }
  }
}
</style>
