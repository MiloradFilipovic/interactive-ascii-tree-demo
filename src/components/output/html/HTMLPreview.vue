<script setup lang="ts">
import type { TreeNode } from '@/parsers/TreeNode'
import { Construction } from 'lucide-vue-next'

type Props = {
  tree: TreeNode[]
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style['under-construction']">
      <Construction :size="16" />
      HTML Preview is coming soon
    </div>
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
