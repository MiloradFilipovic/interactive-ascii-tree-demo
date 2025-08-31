<script setup lang="ts">
import { EXAMPLE_TREE } from '@/constants'
import { useUIStore } from '@/stores/ui.store'
import { onMounted, useTemplateRef, watch, nextTick, ref } from 'vue'

const uiStore = useUIStore()

type Props = {
  visible?: boolean
  tabSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  tabSize: 2,
})

const textarea = useTemplateRef('textarea')

const currentValue = ref('')

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

// Taken from https://github.com/beaubus/vue-itextarea/blob/master/src/vue-itextarea.vue :)
const handleKeydown = (event: KeyboardEvent) => {
  const target = event.target as HTMLTextAreaElement | null

  if (!target) return

  let value = target.value
  const start = target.selectionStart
  const end = target.selectionEnd

  // Tab key moves cursor by tabSize
  if (event.key === 'Tab' && !event.metaKey) {
    event.preventDefault()

    value = value.substring(0, start) + ' '.repeat(props.tabSize) + value.substring(end)
    target.value = value
    target.selectionStart = target.selectionEnd = start + props.tabSize
  }

  // Backspace key removes tabSize spaces
  if (event.key === 'Backspace' && !event.metaKey) {
    const charsBeforeCursor = value.substring(start - props.tabSize, props.tabSize)

    if (charsBeforeCursor === ' '.repeat(props.tabSize)) {
      event.preventDefault()
      value = value.substring(0, start - props.tabSize) + value.substring(end)
      target.value = value
      setTimeout(() => (target.selectionStart = target.selectionEnd = start - props.tabSize), 0)
    }
  }

  // Enter key adds a new line and indents it to the current line's indentation
  if (event.key === 'Enter') {
    const currentLine = value.substring(0, start).split('\n').pop() // line, we are currently on

    if (currentLine && currentLine.startsWith(' '.repeat(props.tabSize))) {
      // type tab
      event.preventDefault()
      // detect how many tabs in the beginning and apply
      const spaceCount = currentLine.search(/\S|$/) // position of first non white-space character
      const tabCount = spaceCount ? spaceCount / props.tabSize : 0

      value =
        value.substring(0, start) +
        '\n' +
        ' '.repeat(props.tabSize).repeat(tabCount) +
        value.substring(end)
      target.value = value
      setTimeout(
        () => (target.selectionStart = target.selectionEnd = start + props.tabSize * tabCount + 1),
        0,
      )
    }
  }

  setTimeout(() => {
    currentValue.value = target.value
  }, 0)
}
</script>

<template>
  <div :class="$style.container">
    <textarea
      ref="textarea"
      :class="$style.textarea"
      v-model="uiStore.textEditorValue"
      :placeholder="EXAMPLE_TREE"
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
  margin-top: 1rem;
}

.textarea {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color-base);
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  font-family: "Consolas", "Menlo", "DejaVu Sans Mono", "Lucida Console", monospace;

  &:focus {
    outline: none;
    border-color: var(--text-color-base);
  }
}
</style>
