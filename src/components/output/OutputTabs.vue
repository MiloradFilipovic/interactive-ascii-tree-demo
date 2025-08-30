<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store'
import { computed } from 'vue'
import type { OutputType } from '@/types'
import { Eye, Palette, Puzzle, CodeXml } from 'lucide-vue-next'

type Props = {
  disabled?: boolean
}

const uiStore = useUIStore()

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const activeTab = computed(() => uiStore.outputMode)

const setActiveTab = (tab: OutputType) => {
  uiStore.outputMode = tab
}
</script>

<template>
  <div :class="{ [$style.tabs]: true, [$style.disabled]: props.disabled }">
    <button
      :class="{ [$style.active]: activeTab === 'ascii' }"
      :disabled="props.disabled"
      @click="setActiveTab('ascii')"
    >
      <Eye :size="14" :class="$style.icon" />
      <span :class="$style.label">Preview</span>
    </button>
    <button
      :class="{ [$style.active]: activeTab === 'html' }"
      :disabled="props.disabled"
      @click="setActiveTab('html')"
    >
      <code-xml :size="14" :class="$style.icon" />
      <span :class="$style.label">HTML</span>
    </button>
    <button
      :class="{ [$style.active]: activeTab === 'css' }"
      :disabled="props.disabled"
      @click="setActiveTab('css')"
    >
      <Palette :size="14" :class="$style.icon" />
      <span :class="$style.label">CSS</span>
    </button>
  </div>
</template>

<style module lang="scss">
.tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.3rem;
  background-color: var(--background-muted);
}

button {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 1rem;
  background: none;
  border: none;
  font-family: inherit;
  color: var(--text-color);
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background-color: var(--background-color);
    color: var(--text-color);
  }
}
</style>
