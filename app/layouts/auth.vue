<script setup lang="ts">
const router = useRouter()
// Close returns to wherever the visitor came from inside the site, otherwise Home.
function close(e: MouseEvent) {
  if (import.meta.client && window.history.state?.back) {
    e.preventDefault()
    router.back()
  }
}
</script>

<template>
  <div class="auth-page">
    <a class="skip" href="#main">Skip to content</a>
    <NuxtLink class="auth__close" to="/" aria-label="Close and go back" @click="close"><UiIcon name="close" /></NuxtLink>
    <main id="main" class="auth">
      <NuxtLink class="auth__logo" to="/" aria-label="KhmerSpere home">
        <img src="/img/ui/logo.png" alt="KhmerSpere" width="74" height="38">
      </NuxtLink>
      <div class="auth__photo" role="img" aria-label="Museum hall with Angkorian sculpture and exhibits" />
      <div class="auth__side"><slot /></div>
    </main>
  </div>
</template>
