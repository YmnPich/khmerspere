<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const found = (['now', 'soon'] as const).flatMap(k => EXHIBITIONS[k].map(([name, price], i) => ({ k, i, name, price })))
  .find(e => exhibitionSlug(e.name) === slug)
if (!found) throw createError({ statusCode: 404, statusMessage: 'Exhibition not found', fatal: true })
const img = DETAIL_IMG[`exhibition:${slug}`] ?? `/img/exhibitions/${found.k}-${String(found.i + 1).padStart(2, '0')}.webp`
useSeoMeta({ title: `${found.name} Exhibition — Ticket Details`, description: `Tickets for the ${found.name} Exhibition at KhmerSpere.` })
</script>

<template>
  <TicketDetail
    heading="Exhibition’s Ticket Details" label="Exhibition" :name="`${found.name} Exhibition`" :price="found.price" :img="img"
    :img-alt="`${found.name} Exhibition gallery view`" :cart-id="`exh-${slug}`" :cart-title="`${found.name} Exhibition`" meta="Exhibition ticket"
    desc-title="Exhibition Description" cta="Add To Cart"
  />
</template>
