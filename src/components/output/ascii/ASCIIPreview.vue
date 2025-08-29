<script setup lang="ts">
import { AsciiGenerator } from '@/generators/ASCIIGenerator'
import type { TreeNode } from '@/parsers/TreeNode'
import { computed } from 'vue'
import CopyButton from '@/components/output/CopyButton.vue'

type Props = {
  tree: TreeNode[]
}

const asciiGenerator = new AsciiGenerator()

const props = defineProps<Props>()

const result = computed(() => asciiGenerator.renderTree(props.tree))
</script>

<template>
  <div :class="$style.container">
    <CopyButton
      v-if="result"
      :class="$style['copy-button']"
      :textToCopy="result"
      copyLabel="Copy ASCII Tree"
    />
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

.copy-button {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
