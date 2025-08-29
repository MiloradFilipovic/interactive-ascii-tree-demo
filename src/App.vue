<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useUIStore } from '@/stores/ui.store'
import { computed } from 'vue'
import InputPane from '@/components/input/InputPane.vue'
import OutputPane from '@/components/output/OutputPane.vue'

const uiStore = useUIStore()

const currentTheme = computed(() => uiStore.theme)
</script>

<template>
  <div :class="$style['app-container']" :data-theme="currentTheme">
    <div :class="$style.toolbar">
      <ThemeToggle />
    </div>
    <div :class="$style.content">
      <header :class="$style.header">
        <h1>
          <code>vue-interactive-ascii-tree</code>
        </h1>
        <p>Interactive ASCII tree component built with Vue3 and TypeScript.</p>
      </header>
      <div :class="$style.panes">
        <div :class="[$style.pane]"><InputPane /></div>
        <div :class="[$style.pane]"><OutputPane /></div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.app-container {
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 1rem;
  height: 100%;
  min-height: 100vh;
  padding: 1rem;

  background-color: var(--background-color);
  color: var(--text-color);
}

.toolbar {
  display: flex;
  justify-content: end;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 0 10%;

  @media screen and (max-width: 1300px) {
    padding: 0 1rem;
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    margin: 0;
  }

  p {
    margin: 0;
    color: var(--text-color-lighter);
  }
}

.panes {
  display: flex;
  width: 100%;
  gap: 1rem;

  .pane {
    border: 1px solid var(--primary-color);
    padding: 0.5rem;
    background-color: var(--background-color);
    width: 50%;

    & > div {
      min-height: 400px;
    }
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;

    .pane {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
