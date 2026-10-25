<script setup lang="ts">
const props = defineProps<{
  heading: string; label: string; name: string; price: number; img: string; imgAlt: string
  cartId: string; cartTitle: string; meta: string; descTitle: string; cta: 'Add To Cart' | 'Pre Order'; sans?: boolean
}>()
const { add, open } = useCart()
const { show } = useToast()
const qty = ref(1)
const added = ref(false)
let t: ReturnType<typeof setTimeout> | undefined
function submit() {
  add({ id: props.cartId, title: props.cartTitle, price: props.price, img: props.img, meta: props.meta }, qty.value)
  show(`${qty.value} × ${props.cartTitle} ${props.cta === 'Pre Order' ? 'pre-ordered' : 'added to cart'}`)
  added.value = true
  clearTimeout(t)
  t = setTimeout(() => { added.value = false }, 1400)
  open()
}
const S = TICKET_SAMPLE
</script>

<template>
  <div class="wrap detail">
    <h1 class="detail__title">{{ heading }}</h1>
    <div class="detail__top">
      <div v-reveal class="detail__img reveal"><img :src="img" :alt="imgAlt" width="400" height="451" decoding="async"></div>
      <div v-reveal class="detail__info reveal" style="--i:1">
        <p class="detail__label">{{ label }}</p>
        <p class="detail__name">{{ name }}</p>
        <p class="detail__price">Price : <span>{{ price }}$</span></p>
        <p class="detail__row"><UiIcon name="book" /> {{ S.host }}</p>
        <p class="detail__row"><UiIcon name="pin" /> {{ S.address }}</p>
        <p class="detail__when" :class="{ 'has-icon': cta === 'Pre Order' }"><span><UiIcon v-if="cta === 'Pre Order'" name="calendar" /> {{ S.date }}</span><span>{{ S.time }}</span></p>
        <div class="detail__buy">
          <QtyStepper v-model="qty" label="Number of tickets" />
          <button class="pill pill--lg" :class="{ 'is-added': added }" type="button" @click="submit">{{ added ? 'Added ✓' : cta }}</button>
        </div>
      </div>
    </div>
    <section aria-labelledby="desc-h">
      <h2 id="desc-h" class="detail__h2" :class="{ 'is-sans': sans }">{{ descTitle }}</h2>
      <p class="detail__desc">{{ S.description }}</p>
    </section>
    <img v-reveal class="detail__map reveal" src="/img/detail/map.webp" alt="Map showing the venue location (sample map)" width="1600" height="638" loading="lazy" decoding="async">
  </div>
</template>
