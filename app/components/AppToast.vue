<script setup lang="ts">
const { msg, on } = useToast()
</script>

<template>
  <div class="toast" :class="{ 'is-on': on }" role="status" aria-live="polite">{{ msg }}</div>
</template>
