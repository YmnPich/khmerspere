// v-parallax: shifts an image slightly against the scroll direction (via the individual `translate` property, so it
// composes with hover/entrance transforms). Value: { speed?: number, mode?: 'top' | 'center', max?: number }.
// Off for reduced-motion users; one passive scroll listener + rAF for every element.
type Opts = { speed?: number; mode?: 'top' | 'center'; max?: number }
export default defineNuxtPlugin((nuxtApp) => {
  const items = new Map<HTMLElement, Opts>()
  let ticking = false
  const reduce = import.meta.client && matchMedia('(prefers-reduced-motion: reduce)').matches

  function update() {
    ticking = false
    const vh = innerHeight
    items.forEach((o, el) => {
      const host = el.parentElement ?? el
      const r = host.getBoundingClientRect()
      if (r.bottom < -100 || r.top > vh + 100) return
      const speed = o.speed ?? 0.12
      const raw = o.mode === 'top' ? scrollY * speed : (vh / 2 - (r.top + r.height / 2)) * speed
      const max = o.max ?? 60
      el.style.setProperty('--py', `${Math.max(-max, Math.min(max, raw)).toFixed(1)}px`)
    })
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }

  nuxtApp.vueApp.directive('parallax', {
    mounted(el: HTMLElement, b) {
      if (reduce) return
      if (!items.size) { addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll) }
      items.set(el, (b.value as Opts) || {})
      el.classList.add('is-parallax')
      onScroll()
    },
    unmounted(el: HTMLElement) {
      items.delete(el)
      if (!items.size) { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) }
    },
    getSSRProps() { return {} }
  })
})
