<script setup lang="ts">
const route = useRoute()
const { count, bump, open: openCart, load } = useCart()

const scrolled = ref(false)
const progress = ref(0)
const menuOpen = ref(false)
const subOpen = ref(false)
const item = ref<HTMLElement>()
const parentBtn = ref<HTMLButtonElement>()

const galleryPaths = GALLERY_MENU.map(m => m.to)
const isCurrent = (to: string) => route.path === to || route.path.startsWith(to + '/')
const galleryActive = computed(() => galleryPaths.some(isCurrent))

// --- Art Gallery dropdown ---------------------------------------------------
// Desktop mouse: opens on hover, stays open while the pointer travels into the panel (short close delay).
// Touch / click / keyboard: the button toggles it. Esc or an outside click closes it.
let closeTimer: ReturnType<typeof setTimeout> | undefined
let hoverOpened = false
const cancelClose = () => clearTimeout(closeTimer)
function closeSub(focusButton = false) {
  cancelClose(); subOpen.value = false; hoverOpened = false
  if (focusButton) parentBtn.value?.focus()
}
const isDesktop = () => import.meta.client && matchMedia('(min-width:901px)').matches
function onPointerEnter(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || !isDesktop()) return
  cancelClose()
  if (!subOpen.value) { subOpen.value = true; hoverOpened = true }
}
function onPointerLeave(e: PointerEvent) {
  if (e.pointerType !== 'mouse' || !isDesktop() || !hoverOpened) return
  cancelClose(); closeTimer = setTimeout(() => closeSub(), 180)
}
function toggleSub() {
  if (hoverOpened) { hoverOpened = false; return } // a click on a hover-opened menu keeps it open
  subOpen.value = !subOpen.value
}
async function openAndFocus() {
  subOpen.value = true
  await nextTick()
  item.value?.querySelector<HTMLElement>('.subnav__link')?.focus()
}
function onSubKey(e: KeyboardEvent) {
  const links = [...(item.value?.querySelectorAll<HTMLElement>('.subnav__link') ?? [])]
  if (!links.length || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return
  // a closed menu opens on ArrowDown; otherwise the arrows move between items
  if (!subOpen.value) {
    if (e.key === 'ArrowDown') { e.preventDefault(); openAndFocus() }
    return
  }
  const i = links.indexOf(document.activeElement as HTMLElement)
  e.preventDefault()
  if (e.key === 'ArrowDown') links[(i + 1) % links.length]?.focus()
  else if (e.key === 'ArrowUp') (i <= 0 ? parentBtn.value : links[i - 1])?.focus()
  else if (e.key === 'Home') links[0]?.focus()
  else links[links.length - 1]?.focus()
}
function onFocusOut(e: FocusEvent) {
  if (item.value && !item.value.contains(e.relatedTarget as Node | null)) closeSub()
}

// --- lifecycle ---------------------------------------------------------------
const onScroll = () => {
  scrolled.value = window.scrollY > 24
  const max = document.documentElement.scrollHeight - innerHeight
  progress.value = max > 0 ? Math.min(1, scrollY / max) : 0
}
const onDocClick = (e: MouseEvent) => { if (item.value && !item.value.contains(e.target as Node)) closeSub() }
const onKey = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  if (subOpen.value) closeSub(true)
  else if (menuOpen.value) { menuOpen.value = false }
}
const mq = import.meta.client ? matchMedia('(min-width:901px)') : null
const onMq = () => { menuOpen.value = false; closeSub() }

onMounted(() => {
  load()
  onScroll()
  addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onDocClick)
  addEventListener('keydown', onKey)
  mq?.addEventListener('change', onMq)
})
onBeforeUnmount(() => {
  removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocClick)
  removeEventListener('keydown', onKey)
  mq?.removeEventListener('change', onMq)
  cancelClose()
})
watch(() => route.fullPath, () => { menuOpen.value = false; closeSub() })
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="site-header__inner">
      <NuxtLink class="logo" to="/" aria-label="KhmerSpere home">
        <img src="/img/ui/logo.png" alt="KhmerSpere" width="74" height="38">
      </NuxtLink>

      <nav id="site-nav" class="nav" :class="{ 'is-open': menuOpen }" aria-label="Main">
        <div class="nav__links">
          <!-- Art Gallery: dropdown parent with exactly three children -->
          <div
            ref="item"
            class="nav__item"
            :class="{ 'is-open': subOpen }"
            @pointerenter="onPointerEnter"
            @pointerleave="onPointerLeave"
            @focusout="onFocusOut"
            @keydown="onSubKey"
          >
            <button
              ref="parentBtn"
              class="nav__link--parent"
              :class="{ 'is-current': galleryActive }"
              type="button"
              aria-haspopup="true"
              aria-controls="subnav-gallery"
              :aria-expanded="subOpen"
              @click="toggleSub"
            >
              Art Gallery <UiIcon name="caret" />
            </button>
            <div id="subnav-gallery" class="subnav">
              <ul>
                <li v-for="m in GALLERY_MENU" :key="m.to">
                  <NuxtLink v-slot="{ href, navigate }" :to="m.to" custom>
                    <a class="subnav__link" :href="href" :aria-current="isCurrent(m.to) ? 'page' : undefined" @click="navigate">{{ m.label }}</a>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Exhibition, Event, Khmer Culture: separate main items -->
          <NuxtLink v-for="m in MAIN_NAV" :key="m.to" v-slot="{ href, navigate }" :to="m.to" custom>
            <a class="nav__link" :href="href" :aria-current="isCurrent(m.to) ? 'page' : undefined" @click="navigate">{{ m.label }}</a>
          </NuxtLink>
        </div>
        <div class="nav__tools">
          <NuxtLink class="avatar" to="/account" aria-label="Your account">
            <img src="/img/ui/avatar.webp" alt="" width="57" height="57">
          </NuxtLink>
        </div>
      </nav>

      <button class="cart-btn" type="button" :aria-label="`Open cart, ${count} item${count === 1 ? '' : 's'}`" @click="openCart">
        <UiIcon name="cart" />
        <span :key="bump" class="cart-count" :class="{ 'has-items': count > 0, bump: bump > 0 }" aria-hidden="true">{{ count > 99 ? '99+' : count }}</span>
      </button>
      <button
        class="menu-btn"
        type="button"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        @click="menuOpen = !menuOpen"
      >
        <span />
      </button>
    </div>
    <span class="site-header__progress" aria-hidden="true" :style="{ transform: `scaleX(${progress})` }" />
  </header>
</template>
