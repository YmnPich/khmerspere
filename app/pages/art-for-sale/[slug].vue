<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const idx = SALE.findIndex(s => saleSlug(s.title) === slug)
if (idx < 0) throw createError({ statusCode: 404, statusMessage: 'Artwork not found', fatal: true })
const pad = (n: number) => String(n + 1).padStart(2, '0')
const mk = (i: number) => ({ ...SALE[i]!, slug: saleSlug(SALE[i]!.title), id: `art-${i + 1}`, src: `/img/sale/art-${pad(i)}.webp` })
const art = mk(idx)
const img = DETAIL_IMG[`sale:${slug}`] ?? art.src
const related = SALE.map((_, i) => mk(i)).filter(a => a.id !== art.id)
useSeoMeta({ title: art.title, description: `${art.title} — original artwork for sale at KhmerSpere.` })

const { add, open } = useCart()
const { show } = useToast()
const qty = ref(1)
const added = ref(false)
let t: ReturnType<typeof setTimeout> | undefined
function addToCart() {
  add({ id: art.id, title: art.title, price: art.price, img: art.src, meta: 'Original artwork' }, qty.value)
  show(`${qty.value} × ${art.title} added to cart`)
  added.value = true
  clearTimeout(t); t = setTimeout(() => { added.value = false }, 1400)
  open()
}

// Related Art carousel
const track = ref<HTMLElement>()
const atStart = ref(true), atEnd = ref(false)
const sync = () => {
  const el = track.value; if (!el) return
  atStart.value = el.scrollLeft < 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}
function scrollBy(dir: 1 | -1) {
  const el = track.value; if (!el) return
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
  el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? 'auto' : 'smooth' })
}
onMounted(() => { sync(); addEventListener('resize', sync) })
onBeforeUnmount(() => removeEventListener('resize', sync))
</script>

<template>
  <div class="wrap detail detail--art">
    <div class="detail__top">
      <div v-reveal class="detail__img reveal"><img :src="img" :alt="art.title" width="1000" height="1328" decoding="async"></div>
      <div v-reveal class="detail__info reveal" style="--i:1">
        <h1 class="detail__name detail__name--serif">{{ art.title }}</h1>
        <p class="detail__price detail__price--big">Price: {{ art.price }}$</p>
        <div class="detail__qty"><span>Quantity</span><QtyStepper v-model="qty" label="Quantity" /></div>
        <dl class="specs">
          <div><dt>Gallery :</dt><dd>{{ art.title }}</dd></div>
          <div><dt>Width :</dt><dd>{{ ART_SIZE.width }}</dd></div>
          <div><dt>Height :</dt><dd>{{ ART_SIZE.height }}</dd></div>
        </dl>
        <button class="pill pill--lg" :class="{ 'is-added': added }" type="button" @click="addToCart">{{ added ? 'Added ✓' : 'Add To Cart' }}</button>
      </div>
    </div>

    <section class="related" aria-labelledby="rel-h">
      <h2 id="rel-h" class="detail__h2">Related Art</h2>
      <div class="carousel">
        <button class="carousel__btn carousel__btn--prev" type="button" aria-label="Previous artworks" :disabled="atStart" @click="scrollBy(-1)"><UiIcon name="prev" /></button>
        <ul ref="track" class="carousel__track" tabindex="0" aria-label="Related artworks" @scroll.passive="sync">
          <li v-for="r in related" :key="r.id" class="rel">
            <NuxtLink :to="`/art-for-sale/${r.slug}`" class="zoom" :aria-label="`${r.title} — details`"><img :src="r.src" :alt="r.title" width="223" height="355" loading="lazy" decoding="async"></NuxtLink>
            <h3><NuxtLink :to="`/art-for-sale/${r.slug}`">{{ r.title }}</NuxtLink></h3>
            <p>Price: {{ r.price }}$</p>
          </li>
        </ul>
        <button class="carousel__btn carousel__btn--next" type="button" aria-label="Next artworks" :disabled="atEnd" @click="scrollBy(1)"><UiIcon name="next" /></button>
      </div>
    </section>
  </div>
</template>
