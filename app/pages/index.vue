<script setup lang="ts">
useSeoMeta({
  title: 'Art Gallery, Exhibitions & Events',
  description: 'KhmerSpere is a gallery showcasing contemporary and classic artworks, exhibitions and events in Cambodia.'
})

const cards = [
  { title: 'Art for Sale', to: '/art-for-sale', img: 'card-1', alt: 'Gallery shelves with ceramics and framed paintings' },
  { title: 'Exhibited Art', to: '/exhibited-art', img: 'card-2', alt: 'Grey gallery room with framed paintings' },
  { title: 'New Media Art', to: '/new-media-art', img: 'card-3', alt: 'Gallery corridor with colourful paintings' }
]
const rows = [
  { id: 'exh', title: 'Exhibition', soon: ['/exhibition?tab=soon', 'exh-soon', 'Dim gallery with lit paintings'], now: ['/exhibition', 'exh-now', 'Visitors gathered in a gallery'] },
  { id: 'evt', title: 'Event', soon: ['/event?tab=soon', 'evt-soon', 'Crowded art fair'], now: ['/event', 'evt-now', 'Gallery wall with framed prints'] }
]
</script>

<template>
  <div>
    <section class="hero" aria-label="Welcome">
      <img v-parallax="{ mode: 'top', speed: 0.22, max: 70 }" src="/img/home/hero.webp" alt="Gallery hall with an Angkorian statue on a plinth" width="1440" height="555">
    </section>

    <div class="wrap">
      <section id="gallery" class="section" aria-labelledby="h-gallery">
        <h1 id="h-gallery" v-reveal class="h2 reveal">Art Gallery</h1>
        <div class="cards3">
          <article v-for="(c, i) in cards" :key="c.to" v-reveal class="card3 reveal" :style="{ '--i': i }">
            <NuxtLink class="zoom" :to="c.to" :aria-label="c.title">
              <img :src="`/img/home/${c.img}.webp`" :alt="c.alt" width="386" height="280" loading="lazy" decoding="async">
            </NuxtLink>
            <h3>{{ c.title }}</h3>
            <NuxtLink class="link-more" :to="c.to">Explore More <UiIcon name="arrow" /></NuxtLink>
          </article>
        </div>
      </section>

      <section v-for="r in rows" :key="r.id" class="section" :aria-labelledby="`h-${r.id}`">
        <h2 :id="`h-${r.id}`" v-reveal class="h2 reveal">{{ r.title }}</h2>
        <p v-reveal class="sub reveal">Get An Exclusive peek into event</p>
        <div v-reveal class="pillrow reveal">
          <NuxtLink :to="r.soon[0]!">
            <img :src="`/img/home/${r.soon[1]}.webp`" :alt="r.soon[2]" width="100" height="98" loading="lazy" decoding="async">
            <div><h3>Coming Soon</h3><p>Exciting exhibitions on the horizon</p></div>
          </NuxtLink>
          <NuxtLink :to="r.now[0]!">
            <img :src="`/img/home/${r.now[1]}.webp`" :alt="r.now[2]" width="100" height="98" loading="lazy" decoding="async">
            <div><h3>Now Showing</h3><p>Exciting exhibitions on the horizon</p></div>
          </NuxtLink>
        </div>
      </section>

      <section id="about" class="about" aria-labelledby="h-about">
        <div v-reveal class="reveal">
          <h2 id="h-about" class="h2 h2--reg">About KhmerSpere</h2>
          <p>Discover a world of art at Khmer Spere, where creativity and inspiration come to life. Our gallery is dedicated to showcasing exceptional contemporary and classic artworks from both established and emerging artists. Whether you are an art enthusiast, a seasoned collector, or simply seeking a source of inspiration, our gallery offers a rich and diverse selection of pieces to explore.</p>
        </div>
        <div v-reveal class="zoom reveal" style="--i: 2">
          <img v-parallax="{ speed: 0.07, max: 40 }" src="/img/home/about.webp" alt="Dark gallery room with a lit display case and religious panel paintings" width="508" height="657" loading="lazy" decoding="async">
        </div>
      </section>
    </div>
  </div>
</template>
