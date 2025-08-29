<script setup lang="ts">
import TextEditor from '@/components/input/TextEditor.vue'
</script>
<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <h2>Input</h2>
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
  gap: 1rem;
}

.editors {
  display: flex;
  flex: 1;
  width: 100%;
}
</style>
