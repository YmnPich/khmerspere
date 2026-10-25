<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const item = KHMER_CULTURE.find(c => c.slug === slug)
if (!item) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const full = slug === 'apsara-dance'
useSeoMeta({ title: full ? APSARA.title : item.title, description: full ? 'Apsara dance — performance elements and historical background.' : `${item.title} — Khmer culture.` })
</script>

<template>
  <div class="wrap cdetail">
    <div class="cdetail__top">
      <div v-reveal class="cdetail__img reveal"><img :src="full ? APSARA.img : item.img" :alt="full ? 'Apsara dancer in front of Angkor Wat at night' : item.title" :width="full ? 458 : 560" :height="full ? 448 : 740" decoding="async"></div>
      <div v-reveal class="cdetail__info reveal" style="--i:1">
        <h1>{{ full ? APSARA.title : item.title }}</h1>
        <template v-if="full">
          <h2 class="cdetail__pe">Performance Element :</h2>
          <p v-for="[k, val] in APSARA.elements" :key="k" class="cdetail__el">{{ k }} : {{ val }}</p>
        </template>
        <p v-else class="cdetail__tag">{{ item.tag }}</p>
      </div>
    </div>
    <section v-if="full" aria-labelledby="hb-h">
      <h2 id="hb-h" class="detail__h2">Historical background</h2>
      <p class="cdetail__text">{{ APSARA.history }}</p>
    </section>
    <section v-else aria-labelledby="hb-h">
      <h2 id="hb-h" class="detail__h2">Historical background</h2>
      <p class="cdetail__text">A detailed write-up for {{ item.title }} is coming soon.</p>
    </section>
    <NuxtLink class="cdetail__back" to="/khmer-culture"><UiIcon name="arrow" class="flip" /> Back to Khmer Culture</NuxtLink>
  </div>
</template>
