<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const found = (['now', 'soon'] as const).flatMap(k => EVENTS[k].map(([name, venue, time], i) => ({ k, i, name, venue, time })))
  .find(e => eventSlug(e.name) === slug)
if (!found) throw createError({ statusCode: 404, statusMessage: 'Event not found', fatal: true })
const img = DETAIL_IMG[`event:${slug}`] ?? `/img/events/${found.k}-${String(found.i + 1).padStart(2, '0')}.webp`
useSeoMeta({ title: `${found.name} — Pre Order Ticket`, description: `Pre-order tickets for ${found.name}.` })
</script>

<template>
  <TicketDetail
    heading="Pre Order Event’s Ticket Details" label="Event" :name="found.name" :price="EVENT_PRICE" :img="img"
    :img-alt="`Gallery interior for ${found.name}`" :cart-id="`evt-${slug}`" :cart-title="found.name" :meta="`Pre-order · ${found.venue} · ${found.time} pm`"
    desc-title="Event Description" cta="Pre Order" sans
  />
</template>
