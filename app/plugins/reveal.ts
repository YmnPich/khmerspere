// v-reveal: fades/slides an element in when it scrolls into view.
// Put class="reveal" on the element too (so the server HTML already carries it) and optionally :style="{'--i': n}" to stagger.
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null
  const reduce = import.meta.client && matchMedia('(prefers-reduced-motion: reduce)').matches

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      if (reduce || !('IntersectionObserver' in window)) { el.classList.add('in'); return }
      io ??= new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (en.isIntersecting) { en.target.classList.add('in'); io!.unobserve(en.target) }
        }
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 })
      io.observe(el)
    },
    unmounted(el: HTMLElement) { io?.unobserve(el) },
    getSSRProps() { return {} }
  })
})
