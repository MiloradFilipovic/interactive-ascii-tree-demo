<script setup lang="ts">
import { ref } from 'vue'

const COPIED_LABEL = 'Copied!'
const COPY_TIMEOUT = 2000

type Props = {
  textToCopy: string
  copyLabel: string
}

const props = defineProps<Props>()

const textCopied = ref(false)

const onCopyButtonClick = async () => {
  try {
    await navigator.clipboard.writeText(props.textToCopy)
    textCopied.value = true
    setTimeout(() => {
      textCopied.value = false
    }, COPY_TIMEOUT)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <button
    :class="$style['copy-button']"
    :disabled="props.textToCopy === ''"
    @click="onCopyButtonClick"
  >
    {{ textCopied ? COPIED_LABEL : props.copyLabel }}
  </button>
</template>

<style module lang="scss">
.copy-button {
  background: none;
  outline: none;
  cursor: pointer;
  color: inherit;
  font: inherit;
  z-index: 99;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
