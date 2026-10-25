<script setup lang="ts">
const props = defineProps<{ label: string; items: { key: string; label: string }[]; modelValue: string; sans?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [key: string] }>()
const root = ref<HTMLElement>()
const bar = reactive({ x: 0, w: 0, ready: false })
function measure() {
  const el = root.value?.querySelector<HTMLElement>('[role=tab][aria-selected=true]')
  if (!el) return
  bar.x = el.offsetLeft; bar.w = el.offsetWidth
  if (!bar.ready) requestAnimationFrame(() => { bar.ready = true })
}
onMounted(() => { measure(); addEventListener('resize', measure); document.fonts?.ready.then(measure) })
onBeforeUnmount(() => removeEventListener('resize', measure))
watch(() => props.modelValue, () => nextTick(measure))

function onKey(e: KeyboardEvent, i: number) {
  const n = props.items.length
  let next = -1
  if (e.key === 'ArrowRight') next = (i + 1) % n
  else if (e.key === 'ArrowLeft') next = (i - 1 + n) % n
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = n - 1
  if (next < 0) return
  e.preventDefault()
  emit('update:modelValue', props.items[next]!.key)
  nextTick(() => root.value?.querySelectorAll<HTMLElement>('[role=tab]')[next]?.focus())
}
</script>

<template>
  <div ref="root" class="tabs" :class="{ 'tabs--sans': sans, 'has-bar': bar.ready }" role="tablist" :aria-label="label">
    <button
      v-for="(t, i) in items"
      :id="`tab-${t.key}`"
      :key="t.key"
      class="tab"
      role="tab"
      type="button"
      :aria-controls="`panel-${t.key}`"
      :aria-selected="modelValue === t.key"
      :tabindex="modelValue === t.key ? 0 : -1"
      @click="emit('update:modelValue', t.key)"
      @keydown="onKey($event, i)"
    >{{ t.label }}</button>
    <span class="tabs__bar" aria-hidden="true" :style="{ '--x': bar.x + 'px', '--w': bar.w + 'px' }" />
  </div>
</template>
