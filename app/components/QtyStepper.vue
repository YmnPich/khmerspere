<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue: number; min?: number; max?: number; label?: string }>(), { min: 1, max: 20, label: 'Quantity' })
const emit = defineEmits<{ 'update:modelValue': [number] }>()
const set = (n: number) => emit('update:modelValue', Math.min(props.max, Math.max(props.min, Math.round(n) || props.min)))
</script>

<template>
  <div class="stepper" role="group" :aria-label="label">
    <input
      class="stepper__input" type="number" inputmode="numeric" :min="min" :max="max" :value="modelValue" :aria-label="label"
      @input="e => { const v = (e.target as HTMLInputElement).valueAsNumber; if (!Number.isNaN(v)) emit('update:modelValue', Math.min(max, Math.max(min, v))) }"
      @blur="set(modelValue)"
      @keydown.up.prevent="set(modelValue + 1)" @keydown.down.prevent="set(modelValue - 1)"
    >
    <span class="stepper__btns">
      <button type="button" :disabled="modelValue >= max" aria-label="Increase quantity" @click="set(modelValue + 1)"><UiIcon name="up" /></button>
      <button type="button" :disabled="modelValue <= min" aria-label="Decrease quantity" @click="set(modelValue - 1)"><UiIcon name="down" /></button>
    </span>
  </div>
</template>
