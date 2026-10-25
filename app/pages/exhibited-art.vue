<script setup lang="ts">
useSeoMeta({ title: 'Exhibited Art', description: 'A look inside past KhmerSpere exhibitions.' })

const { openAt } = useLightbox()
const pad = (n: number) => String(n).padStart(2, '0')
// cell 10 has a larger source image for the viewer
const full = (n: number) => (n === 10 ? '/img/exhibited/lightbox-gauguin.webp' : `/img/exhibited/ex-${pad(n)}.webp`)
const items = Array.from({ length: 11 }, (_, i) => ({ src: full(i + 1), alt: `Exhibition gallery view ${i + 1}` }))
const groups = [{ cls: 'mosaic--a', ids: [1, 2, 3, 4, 5, 6] }, { cls: 'mosaic--b', ids: [7, 8, 9, 10, 11] }]
</script>

<template>
  <div class="bleed">
    <h1 class="page-title page-title--sans" style="padding-left: calc(var(--pad) - clamp(10px, 1.5vw, 21px))">Exhibited Art</h1>
    <div v-for="g in groups" :key="g.cls" class="mosaic" :class="g.cls">
      <a
        v-for="(n, k) in g.ids"
        :key="n"
        v-reveal
        class="zoom reveal"
        :class="`m${n}`"
        :style="{ '--i': Math.min(k, 8) }"
        :href="full(n)"
        :aria-label="`View exhibition gallery image ${n} larger`"
        @click.prevent="openAt(items, n - 1, $event.currentTarget)"
      >
        <img :src="`/img/exhibited/ex-${pad(n)}.webp`" :alt="`Exhibition gallery view ${n}`" :width="MOSAIC_SIZES[n - 1]![0]" :height="MOSAIC_SIZES[n - 1]![1]" :loading="n > 5 ? 'lazy' : undefined" decoding="async">
      </a>
    </div>
  </div>
</template>
