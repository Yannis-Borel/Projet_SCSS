<script lang="ts" setup>
// Show component usages
defineProps<{
  value: string,
  text: string
}>()
</script>

<template>
  <div class="c-stat-card">
    <span>{{ value }}</span>
    <span>{{ text }}</span>
  </div>
</template>

<style lang="scss">
</style>
