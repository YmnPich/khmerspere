<script setup lang="ts">
useSeoMeta({ title: 'New Media Art', description: 'Browse kinetic and multimedia art at KhmerSpere.' })

const tabs = [{ key: 'kinetic', label: 'Kinetic Art' }, { key: 'multimedia', label: 'Multimedia Art' }]
const { active, set } = useTabParam(['kinetic', 'multimedia'], 'kinetic')
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="wrap">
    <h1 class="sr-only">New Media Art</h1>
    <TabList label="New media art categories" :items="tabs" :model-value="active" sans @update:model-value="set" />
    <template v-for="t in tabs" :key="t.key">
      <div v-if="active === t.key" :id="`panel-${t.key}`" role="tabpanel" :aria-labelledby="`tab-${t.key}`" class="grid-art">
        <div v-for="i in 20" :key="i" v-reveal class="zoom tile reveal" :style="{ '--i': Math.min(i - 1, 8) }">
          <img :src="`/img/gallery/${t.key}-${pad(i)}.webp`" :alt="`${t.label} artwork ${i} of 20`" width="305" height="467" :loading="i > 4 ? 'lazy' : undefined" decoding="async">
        </div>
      </div>
    </template>
  </div>
</template>
