<script setup lang="ts">
import type { TreeNode } from '@/vue-interactive-ascii-tree/parsers/TreeNode'
import { computed } from 'vue'
import {
  COLLAPSED_BUTTON,
  DEFAULT_CHILD_PREFIX,
  DEFAULT_SPACER,
  EXPANDED_BUTTON,
  LAST_CHILD_PREFIX,
  PIPE_PREFIX,
} from '@/vue-interactive-ascii-tree/constants'

type Props = {
  node: TreeNode
  isExpanded?: boolean
  isExpandedFunction?: (id: string) => boolean
  ancestorIsLast?: boolean[]
}

const props = withDefaults(defineProps<Props>(), {
  isExpanded: false,
})

const emit = defineEmits<{
  (e: 'expandItem', id: string): void
  (e: 'collapseItem', id: string): void
}>()

const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

const isLastChild = (parent: TreeNode, child: TreeNode) => {
  return parent.children[parent.children.length - 1] === child
}

const expandItem = (id: string) => {
  emit('expandItem', id)
}

const collapseItem = (id: string) => {
  emit('collapseItem', id)
}
</script>

<template>
  <div :class="$style.node">
    <div :class="$style['nodeName']">
      <template v-if="ancestorIsLast">
        <span v-for="(isLast, index) in ancestorIsLast.slice(0, -1)" :key="index">
          {{ isLast ? DEFAULT_SPACER : PIPE_PREFIX }}
        </span>
      </template>
      <span v-if="ancestorIsLast && ancestorIsLast.length > 0">
        {{ ancestorIsLast[ancestorIsLast.length - 1] ? LAST_CHILD_PREFIX : DEFAULT_CHILD_PREFIX }}
      </span>
      <span>{{ node.name }}</span>
      <div v-if="hasChildren" :class="$style['expand-button']">
        <span v-if="isExpanded" @click="collapseItem(node.id)">
          {{ EXPANDED_BUTTON }}
        </span>
        <span v-else @click="expandItem(node.id)">{{ COLLAPSED_BUTTON }}</span>
      </div>
    </div>
    <div v-if="hasChildren && isExpanded" :class="$style.children">
      <TreeItem
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :is-expanded="isExpandedFunction ? isExpandedFunction(child.id) : false"
        :is-expanded-function="isExpandedFunction"
        :ancestor-is-last="[...(ancestorIsLast || []), isLastChild(node, child)]"
        @expand-item="expandItem"
        @collapse-item="collapseItem"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.nodeName {
  display: flex;
  align-items: center;
  gap: 0.3rem;

  > span {
    white-space: pre;
  }
}

.expand-button {
  cursor: pointer;
  user-select: none;

  &:hover {
    text-decoration: underline;
  }
}

.children {
  margin-left: 0;
}
</style>
