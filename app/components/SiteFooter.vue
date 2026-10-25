<script setup lang="ts">
// Same eight links as the design, in its two-column order.
const links = [
  { label: 'Art Gallery', to: '/#gallery' }, { label: 'Exhibition', to: '/exhibition' },
  { label: 'Art for sale', to: '/art-for-sale' }, { label: 'Contact us', to: '/contact' },
  { label: 'New Media Art', to: '/new-media-art' }, { label: 'Event', to: '/event' },
  { label: 'Exhibited Art', to: '/exhibited-art' }, { label: 'Khmer Culture', to: '/khmer-culture' }
]
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <hr class="site-footer__rule">
      <div class="site-footer__grid">
        <div>
          <NuxtLink class="logo" to="/" aria-label="KhmerSpere home">
            <img src="/img/ui/logo.png" alt="KhmerSpere" width="74" height="38">
          </NuxtLink>
          <div class="social">
            <a v-for="s in SOCIAL" :key="s.name" :href="s.url" target="_blank" rel="noopener noreferrer" :aria-label="s.name">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="s.d" /></svg>
            </a>
          </div>
        </div>
        <nav class="footer-links" aria-label="Footer">
          <NuxtLink v-for="l in links" :key="l.label" :to="l.to">{{ l.label }}</NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
