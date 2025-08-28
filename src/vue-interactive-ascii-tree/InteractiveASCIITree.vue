<script setup lang="ts">
import { TextParser } from '@/vue-interactive-ascii-tree/parsers/textParser/TextParser'
import { computed, ref } from 'vue'
import TreeItem from '@/vue-interactive-ascii-tree/components/TreeItem.vue'
import CopyButton from './components/CopyButton.vue'

type Props = {
  textInput: string
}

const textParser = new TextParser({
  tabWidth: 2,
  minIndentDiff: 1,
})

const props = defineProps<Props>()

// Everything is expanded by default
const collapsedItems = ref<Set<string>>(new Set())

const tree = computed(() => textParser.parse(props.textInput))

const renderedText = computed(() => {
  return textParser.render(tree.value)
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
