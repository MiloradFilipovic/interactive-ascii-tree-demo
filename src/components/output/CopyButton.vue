<script setup lang="ts">
import { ref } from 'vue'
import { Clipboard, ClipboardCheck } from 'lucide-vue-next'

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
    :title="textCopied ? 'Copied!' : props.copyLabel"
    aria-label="Copy to clipboard"
    role="button"
    @click="onCopyButtonClick"
  >
    <ClipboardCheck v-if="textCopied" :size="20" />
    <Clipboard v-else :size="20" />
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
