<script setup lang="ts">
import { Construction } from 'lucide-vue-next'
</script>

<template>
  <div :class="$style.container">
    <div :class="$style['under-construction']">
      <Construction :size="16" />
      Web Component is coming soon
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: auto;
}

.under-construction {
  display: flex;
  gap: 0.5rem;
}
</style>
