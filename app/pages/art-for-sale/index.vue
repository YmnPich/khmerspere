<script setup lang="ts">
useSeoMeta({ title: 'Art For Sale', description: 'Original artworks for sale at KhmerSpere. Filter by price, style and subject.' })

const { add } = useCart()
const { show } = useToast()

const MIN = 50, MAX = 200
const lo = ref(MIN), hi = ref(MAX)
const styles = ref<string[]>([])
const subjects = ref<string[]>([])
const subjectOpen = ref(true)
const justAdded = ref<string | null>(null)

const items = SALE.map((s, i) => ({ ...s, id: `art-${i + 1}`, slug: saleSlug(s.title), src: `/img/sale/art-${String(i + 1).padStart(2, '0')}.webp` }))
const shown = computed(() => items.filter(a =>
  a.price >= lo.value && a.price <= hi.value
  && (!styles.value.length || styles.value.includes(a.style))
  && (!subjects.value.length || a.subjects.some(s => subjects.value.includes(s)))))

// the two handles can't cross
const onLo = () => { if (lo.value > hi.value) lo.value = hi.value }
const onHi = () => { if (hi.value < lo.value) hi.value = lo.value }
const fillStyle = computed(() => ({
  left: `${((lo.value - MIN) / (MAX - MIN)) * 100}%`,
  right: `${100 - ((hi.value - MIN) / (MAX - MIN)) * 100}%`
}))
function clear() { lo.value = MIN; hi.value = MAX; styles.value = []; subjects.value = [] }

let t: ReturnType<typeof setTimeout> | undefined
function addToCart(a: (typeof items)[number]) {
  add({ id: a.id, title: a.title, price: a.price, img: a.src, meta: 'Original artwork' })
  show(`${a.title} added to cart`)
  justAdded.value = a.id
  clearTimeout(t)
  t = setTimeout(() => { justAdded.value = null }, 1400)
}
</script>

<template>
  <div class="wrap">
    <h1 class="page-title">Art For Sale</h1>
    <div class="sale">
      <aside class="filters" aria-label="Filter artworks">
        <h2>Filter By</h2>

        <div class="fgroup">
          <div class="fgroup__head" style="cursor: default">Price</div>
          <div class="range">
            <div class="range__track" /><div class="range__fill" :style="fillStyle" />
            <input v-model.number="lo" type="range" :min="MIN" :max="MAX" step="10" aria-label="Minimum price" @input="onLo">
            <input v-model.number="hi" type="range" :min="MIN" :max="MAX" step="10" aria-label="Maximum price" @input="onHi">
          </div>
          <div class="range-vals"><span>{{ money(lo) }}</span><span>{{ money(hi) }}</span></div>
        </div>

        <div class="fgroup">
          <div class="fgroup__head" style="cursor: default">Style</div>
          <label v-for="s in STYLES" :key="s.value" class="check"><input v-model="styles" type="checkbox" :value="s.value"> {{ s.label }}</label>
        </div>

        <div class="fgroup">
          <button class="fgroup__head" type="button" :aria-expanded="subjectOpen" aria-controls="f-subject" @click="subjectOpen = !subjectOpen">Subject<span class="tog" /></button>
          <div id="f-subject" class="fgroup__body">
            <div><label v-for="s in SUBJECTS" :key="s.value" class="check"><input v-model="subjects" type="checkbox" :value="s.value"> {{ s.label }}</label></div>
          </div>
        </div>

        <button class="clear" type="button" @click="clear">Clear filters</button>
        <p class="sr-only" aria-live="polite">{{ shown.length }} artwork{{ shown.length === 1 ? '' : 's' }} shown</p>
      </aside>

      <div class="grid-sale">
        <article v-for="(a, i) in shown" :key="a.id" v-reveal class="art reveal" :style="{ '--i': Math.min(i % 4, 8) }">
          <NuxtLink class="zoom" :to="`/art-for-sale/${a.slug}`" :aria-label="`${a.title} — details`">
            <img :src="a.src" :alt="a.title" width="223" height="355" :loading="i > 7 ? 'lazy' : undefined" decoding="async">
          </NuxtLink>
          <h3><NuxtLink :to="`/art-for-sale/${a.slug}`">{{ a.title }}</NuxtLink></h3>
          <p>Price: {{ a.price }}$</p>
          <button class="pill" :class="{ 'is-added': justAdded === a.id }" type="button" @click="addToCart(a)">{{ justAdded === a.id ? 'Added ✓' : 'Add To Cart' }}</button>
        </article>
        <div v-if="!shown.length" class="empty">
          <p>No artworks match these filters.</p>
          <button class="pill" type="button" @click="clear">Clear filters</button>
        </div>
      </div>
    </div>
  </div>
</template>
