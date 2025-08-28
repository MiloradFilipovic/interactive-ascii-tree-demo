<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store'
import { onMounted, useTemplateRef, watch, nextTick } from 'vue'

const uiStore = useUIStore()

type Props = {
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
})

const textarea = useTemplateRef('textarea')

const placeholderText = `Root
  Child1
    Grandchild1
    - Can also use dashes
  Child2
`

onMounted(() => {
  textarea.value?.focus()
})

watch(
  () => props.visible,
  async (isVisible) => {
    if (isVisible) {
      await nextTick()
      textarea.value?.focus()
    }
  },
)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.preventDefault()
    const start = textarea.value?.selectionStart || 0
    const end = textarea.value?.selectionEnd || 0

    uiStore.textEditorValue =
      uiStore.textEditorValue.substring(0, start) + '  ' + uiStore.textEditorValue.substring(end)

    textarea.value!.selectionStart = textarea.value!.selectionEnd = start + 1
  }
}
</script>

<template>
  <div :class="$style.container">
    <textarea
      ref="textarea"
      :class="$style.textarea"
      v-model="uiStore.textEditorValue"
      :placeholder="placeholderText"
      @keydown="handleKeydown"
    />
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.textarea {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}
</style>
