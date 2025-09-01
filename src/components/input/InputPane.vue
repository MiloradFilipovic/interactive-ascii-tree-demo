<script setup lang="ts">
import TextEditor from '@/components/input/TextEditor.vue'
import { EXAMPLE_TREE } from '@/constants'
import { useUIStore } from '@/stores/ui.store'
import { FileInput, Eraser } from 'lucide-vue-next'
import { computed } from 'vue'

const uiStore = useUIStore()

const currentText = computed(() => uiStore.textEditorValue)

const importButtonDisabled = computed(() => currentText.value !== '')

const eraserButtonDisabled = computed(() => currentText.value === '')

const loadExample = () => {
  uiStore.textEditorValue = EXAMPLE_TREE
  uiStore.outputMode = 'ascii'
}

const clearText = () => {
  uiStore.textEditorValue = ''
  uiStore.outputMode = 'ascii'
}
</script>
<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <h2>Input</h2>
      <div :class="$style.toolbar">
        <button title="Load example" aria-label="Load example" role="button" :disabled="importButtonDisabled" @click="loadExample">
          <FileInput :size="20"/>
        </button>
        <button title="Clear" aria-label="Clear" role="button" :disabled="eraserButtonDisabled" @click="clearText">
          <Eraser :size="20"/>
        </button>
      </div>
    </header>
    <div :class="$style.editors">
      <TextEditor />
    </div>
  </div>
</template>
<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar {
  display: flex;
  gap: 0.5rem;
}

.editors {
  display: flex;
  flex: 1;
  width: 100%;
}
</style>
