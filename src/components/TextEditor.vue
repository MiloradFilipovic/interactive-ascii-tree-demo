<script setup lang="ts">
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

// Taken from https://github.com/beaubus/vue-itextarea/blob/master/src/vue-itextarea.vue :)
const handleKeydown = (event: KeyboardEvent) => {
  const target = event.target as HTMLTextAreaElement | null

  if (!target) return

  let value = target.value
  const start = target.selectionStart
  const end = target.selectionEnd

  if (event.key === 'Tab' && !event.metaKey) {
    event.preventDefault()

    event.preventDefault()
    value = value.substring(0, start) + ' '.repeat(props.tabSize) + value.substring(end)
    target.value = value
    target.selectionStart = target.selectionEnd = start + props.tabSize
  }

  if (event.key === 'Backspace' && !event.metaKey) {
    const charsBeforeCursor = value.substring(start - props.tabSize, props.tabSize)

    if (charsBeforeCursor === ' '.repeat(props.tabSize)) {
      event.preventDefault()
      value = value.substring(0, start - props.tabSize) + value.substring(end)
      target.value = value
      setTimeout(() => (target.selectionStart = target.selectionEnd = start - props.tabSize), 0)
    }
  }

  if (event.key === 'Enter') {
    const current_line = value.substring(0, start).split('\n').pop() // line, we are currently on

    if (current_line && current_line.startsWith(' '.repeat(props.tabSize))) {
      // type tab
      event.preventDefault()
      // detect how many tabs in the beginning and apply
      const spaces_count = current_line.search(/\S|$/) // position of first non white-space character
      const tabs_count = spaces_count ? spaces_count / props.tabSize : 0

      value =
        value.substring(0, start) +
        '\n' +
        ' '.repeat(props.tabSize).repeat(tabs_count) +
        currentValue.value.substring(end)
      target.value = value
      setTimeout(
        () =>
          (target.selectionStart = target.selectionEnd = start + props.tabSize * tabs_count + 1),
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
