<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/khmer-culture')
</script>

<template>
  <div class="shell">
    <a class="skip" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main" class="page" :class="{ 'page--home': isHome }" style="flex:1 0 auto">
      <slot />
    </main>
    <SiteFooter />
    <CartDrawer />
    <LightboxViewer />
    <AppToast />
  </div>
</template>
