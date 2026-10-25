<script setup lang="ts">
const { lines, isOpen, total, close, change, remove } = useCart()
const drawer = ref<HTMLElement>()
const closeBtn = ref<HTMLButtonElement>()
const note = ref('')
let lastFocus: HTMLElement | null = null

watch(isOpen, async (open) => {
  if (open) {
    lastFocus = document.activeElement as HTMLElement
    note.value = ''
    await nextTick()
    closeBtn.value?.focus()
  } else {
    lastFocus?.focus?.()
  }
})

function onKey(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') { close(); return }
  if (e.key !== 'Tab' || !drawer.value) return
  const f = [...drawer.value.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]')].filter(el => el.offsetParent !== null)
  if (!f.length) return
  const first = f[0]!, last = f[f.length - 1]!
  if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault() }
  else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault() }
}
onMounted(() => addEventListener('keydown', onKey))
onBeforeUnmount(() => removeEventListener('keydown', onKey))
</script>

<template>
  <div class="scrim" :class="{ 'is-open': isOpen }" @click="close" />
  <aside ref="drawer" class="drawer" :class="{ 'is-open': isOpen }" role="dialog" aria-modal="true" aria-label="Shopping cart">
    <div class="drawer__head">
      <h2>Your cart</h2>
      <button ref="closeBtn" class="icon-btn" type="button" aria-label="Close cart" @click="close"><UiIcon name="x" /></button>
    </div>
    <div class="drawer__body">
      <p v-if="!lines.length" class="drawer__empty">Your cart is empty.</p>
      <div v-for="l in lines" :key="l.id" class="line">
        <img :src="l.img" alt="" width="64" height="64">
        <div>
          <h3>{{ l.title }}</h3>
          <small>{{ l.meta }}</small>
          <div class="qty">
            <button type="button" :aria-label="`Decrease quantity of ${l.title}`" @click="change(l.id, -1)">−</button>
            <span aria-live="polite">{{ l.qty }}</span>
            <button type="button" :aria-label="`Increase quantity of ${l.title}`" @click="change(l.id, 1)">+</button>
          </div>
        </div>
        <div>
          <div class="line__price">{{ money(l.price * l.qty) }}</div>
          <button type="button" class="line__rm" :aria-label="`Remove ${l.title}`" @click="remove(l.id)">Remove</button>
        </div>
      </div>
    </div>
    <div v-if="lines.length" class="drawer__foot">
      <div class="total"><span>Total</span><span>{{ money(total) }}</span></div>
      <button class="pill" type="button" @click="note = 'Checkout isn\'t connected to a payment service yet, so nothing has been charged or sent. Your cart is kept on this device.'">Checkout</button>
      <p class="note" role="status">{{ note }}</p>
    </div>
  </aside>
</template>
