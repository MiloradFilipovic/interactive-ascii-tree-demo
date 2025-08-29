<script setup lang="ts">
import { TextParser } from '@/parsers/textParser/TextParser'
import { computed, ref } from 'vue'
import TreeItem from '@/components/output/TreeItem.vue'
import CopyButton from '@/components/output/CopyButton.vue'
import { AsciiGenerator } from '@/generators/ASCIIGenerator'

type Props = {
  textInput: string
}

const textParser = new TextParser({
  tabWidth: 2,
  minIndentDiff: 1,
})

const asciiGenerator = new AsciiGenerator()

const props = defineProps<Props>()

// Everything is expanded by default
const collapsedItems = ref<Set<string>>(new Set())

const tree = computed(() => textParser.parse(props.textInput))

const renderedText = computed(() => {
  return asciiGenerator.renderTree(tree.value)
})

const expandItem = (id: string) => {
  collapsedItems.value.delete(id)
}

const collapseItem = (id: string) => {
  collapsedItems.value.add(id)
}

const isExpanded = (id: string) => {
  return !collapsedItems.value.has(id)
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style['copy-button']">
      <CopyButton :text-to-copy="renderedText" />
    </div>
    <TreeItem
      v-for="node in tree"
      :key="node.id"
      :node="node"
      :is-expanded="isExpanded(node.id)"
      :is-expanded-function="isExpanded"
      @expandItem="expandItem"
      @collapseItem="collapseItem"
    />
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

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
