<script setup lang="ts">
useSeoMeta({ title: 'Exhibition Tickets', description: 'Buy tickets for current and upcoming exhibitions at KhmerSpere.' })

const tabs = [{ key: 'now', label: 'Now Showing' }, { key: 'soon', label: 'Coming Soon' }]
const { active, set } = useTabParam(['now', 'soon'], 'now')
const src = (k: string, i: number) => `/img/exhibitions/${k}-${String(i + 1).padStart(2, '0')}.webp`
const to = (name: string) => `/exhibition/${exhibitionSlug(name)}`
</script>

<template>
  <div class="wrap">
    <h1 class="page-title">Exhibitions Ticket</h1>
    <TabList label="Exhibition status" :items="tabs" :model-value="active" @update:model-value="set" />
    <template v-for="t in tabs" :key="t.key">
      <div v-if="active === t.key" :id="`panel-${t.key}`" role="tabpanel" :aria-labelledby="`tab-${t.key}`" class="grid-exh">
        <article v-for="([name, price], i) in EXHIBITIONS[t.key as 'now' | 'soon']" :key="name" v-reveal class="exh reveal" :style="{ '--i': Math.min(i % 3, 8) }">
          <NuxtLink class="zoom" :to="to(name)" :aria-label="`${name} Exhibition ticket details`"><img :src="src(t.key, i)" :alt="`${name} Exhibition gallery view`" width="386" height="298" :loading="i > 2 ? 'lazy' : undefined" decoding="async"></NuxtLink>
          <h3><NuxtLink :to="to(name)">{{ name }} Exhibition</NuxtLink></h3>
          <p class="price">Price : {{ price }}$</p>
          <NuxtLink class="buy" :to="to(name)" :aria-label="`Buy ${name} Exhibition tickets`">Buy Now <UiIcon name="chev" /></NuxtLink>
        </article>
      </div>
    </template>
  </div>
</template>
