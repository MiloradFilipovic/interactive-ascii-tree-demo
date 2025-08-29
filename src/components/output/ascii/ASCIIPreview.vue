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
  --indent: 4ch;
  --line-color: #666;
  --v-line: '│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A│\A';
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 1;
  font-family: "Consolas", "Menlo", "DejaVu Sans Mono", "Lucida Console", monospace;

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
        color: var(--line-color);
        position: absolute;
        left: 0;
      }
      
      &:last-child > *:first-child::before {
        content: '└── ';
      }
      
      &::after {
        content: var(--v-line);
        color: var(--line-color);
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
      color: var(--line-color);
    }
    
    details[open] > &::after {
      content: '[-]';
    }
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 2px;
    }
    
    &:focus-visible {
      background: rgba(0, 100, 200, 0.1);
      outline: 2px solid #0064c8;
      outline-offset: 2px;
      border-radius: 2px;
    }
  }
}
</style>
