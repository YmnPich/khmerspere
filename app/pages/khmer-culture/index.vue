<script setup lang="ts">
useSeoMeta({ title: 'Khmer Culture', description: 'Explore the rich heritage of Khmer culture — dance, ceremony, tradition and belief.' })
</script>

<template>
  <div>
    <section class="khero" aria-label="Khmer Culture">
      <img v-parallax="{ mode: 'top', speed: 0.2, max: 70 }" src="/img/khmer/hero.webp" alt="Two masked Khmer dancers in warrior poses on rocky outcrops at dusk" width="1800" height="729">
    </section>
    <div class="wrap kc">
      <h1 v-reveal class="kc__title reveal">Explore the Rich Heritage of Khmer Culture</h1>
      <div class="kc__grid">
        <article v-for="(c, i) in KHMER_CULTURE" :key="c.slug" v-reveal class="kcard reveal" :style="{ '--i': Math.min(i % 4, 8) }">
          <NuxtLink class="zoom" :to="`/khmer-culture/${c.slug}`" :aria-label="`${c.title} — view detail`">
            <img :src="c.img" :alt="c.title" width="560" height="740" :loading="i > 3 ? 'lazy' : undefined" decoding="async">
          </NuxtLink>
          <h2>{{ c.title }}</h2>
          <p>{{ c.tag }}</p>
          <NuxtLink class="pill pill--thin" :to="`/khmer-culture/${c.slug}`" :aria-label="`View detail: ${c.title}`">View Detail <UiIcon name="arrow" /></NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>
