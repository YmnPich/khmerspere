<script setup lang="ts">
useSeoMeta({ title: 'Event Tickets', description: 'Buy tickets for art events happening across Cambodia.' })

const tabs = [{ key: 'now', label: 'Now Showing' }, { key: 'soon', label: 'Coming Soon' }]
const { active, set } = useTabParam(['now', 'soon'], 'now')
const src = (k: string, i: number) => `/img/events/${k}-${String(i + 1).padStart(2, '0')}.webp`
const to = (name: string) => `/event/${eventSlug(name)}`
</script>

<template>
  <div class="wrap">
    <h1 class="page-title">Event Ticket</h1>
    <TabList label="Event status" :items="tabs" :model-value="active" @update:model-value="set" />
    <template v-for="t in tabs" :key="t.key">
      <div v-if="active === t.key" :id="`panel-${t.key}`" role="tabpanel" :aria-labelledby="`tab-${t.key}`" class="grid-evt">
        <article v-for="([name, venue, time], i) in EVENTS[t.key as 'now' | 'soon']" :key="name" v-reveal class="evt reveal" :style="{ '--i': Math.min(i % 2, 8) }">
          <NuxtLink class="zoom" :to="to(name)" :aria-label="`${name} ticket details`"><img :src="src(t.key, i)" :alt="`Gallery interior for ${name}`" width="224" height="228" :loading="i > 3 ? 'lazy' : undefined" decoding="async"></NuxtLink>
          <div>
            <h3><NuxtLink :to="to(name)">{{ name }}</NuxtLink></h3>
            <p>{{ venue }}</p>
            <p>Price: {{ EVENT_PRICE }}$</p>
            <p>Event Time: {{ time }} pm</p>
            <NuxtLink class="buy" :to="to(name)" :aria-label="`Buy ${name} tickets`">Buy Now <UiIcon name="chev" /></NuxtLink>
          </div>
        </article>
      </div>
    </template>
  </div>
</template>
