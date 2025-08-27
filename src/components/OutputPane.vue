<script setup lang="ts"></script>
<template>
  <div :class="$style.container">
    <h2>Output</h2>
    <p :class="$style.content">Loading...</p>
  </div>
</template>
<style module lang="scss">
.container {
  display: block;
}
.content {
  padding: 0.5rem;
}
</style>
