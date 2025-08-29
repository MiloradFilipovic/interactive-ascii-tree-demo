<script setup lang="ts">
import type { InputEditorType } from '@/types'
import { computed } from 'vue'
import TextEditor from '@/components/input/TextEditor.vue'
import { useUIStore } from '@/stores/ui.store'

const uiStore = useUIStore()

const activeTab = computed(() => uiStore.inputMode)

const setActiveTab = (tab: InputEditorType) => {
  uiStore.inputMode = tab
}
</script>
<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <h2>Input</h2>
      <div :class="$style.tabs">
        <button :class="{ [$style.active]: activeTab === 'text' }" @click="setActiveTab('text')">
          Text
        </button>
        <button
          :class="{ [$style.active]: activeTab === 'interactive' }"
          @click="setActiveTab('interactive')"
        >
          Interactive
        </button>
      </div>
    </header>
    <div :class="$style.editors">
      <TextEditor v-if="activeTab === 'text'" :visible="activeTab === 'text'" />
      <div v-else-if="activeTab === 'interactive'" :class="$style.interactive">
        Interactive Editor coming soon...
      </div>
    </div>
  </div>
</template>
<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.3rem;
  background-color: var(--background-muted);

  button {
    background: none;
    border: none;
    font-family: inherit;
    color: var(--text-color);
    font-weight: 500;
    cursor: pointer;

    &.active {
      background-color: var(--background-color);
      color: var(--text-color);
    }
  }
}
.editors {
  display: flex;
  flex: 1;
  width: 100%;
}

.interactive {
  padding: 0.5rem;
}
</style>
