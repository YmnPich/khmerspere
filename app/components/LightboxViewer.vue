<script setup lang="ts">
const { items, index, isOpen, close, go } = useLightbox()
const root = ref<HTMLElement>()
const closeBtn = ref<HTMLButtonElement>()
const ready = ref(false)
const shown = ref({ src: '', alt: '' })
let token = 0

const current = computed(() => items.value[index.value])
const counter = computed(() => (items.value.length ? `${index.value + 1} / ${items.value.length}` : ''))

// preload the image first so it fades/zooms in only once it can actually be painted
watch([isOpen, index], ([open]) => {
  if (!open || !current.value) return
  const my = ++token
  ready.value = false
  const { src, alt } = current.value
  const pre = new Image()
  pre.onload = pre.onerror = () => {
    if (my !== token) return
    shown.value = { src, alt }
    requestAnimationFrame(() => { ready.value = true })
  }
  pre.src = src
  const n = items.value.length
  for (const d of [1, -1]) { const nb = items.value[(index.value + d + n) % n]; if (nb) new Image().src = nb.src }
})

watch(isOpen, async (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
  if (open) { await nextTick(); closeBtn.value?.focus() } else { token++; ready.value = false }
})

function onKey(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') go(-1)
  else if (e.key === 'ArrowRight') go(1)
  else if (e.key === 'Tab' && root.value) {
    const f = [...root.value.querySelectorAll<HTMLElement>('button')]
    const first = f[0]!, last = f[f.length - 1]!
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault() }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault() }
  }
}
function onBackdrop(e: MouseEvent) {
  const t = e.target as HTMLElement
  if (t === root.value || t.classList.contains('lb__stage')) close()
}
let sx: number | null = null
const onStart = (e: TouchEvent) => { sx = e.touches[0]!.clientX }
const onEnd = (e: TouchEvent) => {
  if (sx == null) return
  const dx = e.changedTouches[0]!.clientX - sx; sx = null
  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
}
onMounted(() => addEventListener('keydown', onKey))
onBeforeUnmount(() => { removeEventListener('keydown', onKey); document.documentElement.style.overflow = '' })
</script>

<template>
  <div ref="root" class="lb" :class="{ 'is-open': isOpen }" role="dialog" aria-modal="true" aria-label="Image viewer" @click="onBackdrop" @touchstart.passive="onStart" @touchend="onEnd">
    <button ref="closeBtn" class="lb__btn lb__close" type="button" aria-label="Close" @click="close"><UiIcon name="x" /></button>
    <button class="lb__btn lb__prev" type="button" aria-label="Previous image" @click="go(-1)"><UiIcon name="prev" /></button>
    <div class="lb__stage">
      <img class="lb__img" :class="{ 'is-ready': ready }" :src="shown.src || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='" :alt="shown.alt">
    </div>
    <button class="lb__btn lb__next" type="button" aria-label="Next image" @click="go(1)"><UiIcon name="next" /></button>
    <div class="lb__count" aria-live="polite">{{ counter }}</div>
  </div>
</template>
