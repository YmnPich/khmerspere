<script setup lang="ts">
defineProps<{ name: 'cart' | 'chev' | 'arrow' | 'close' | 'x' | 'prev' | 'next' | 'eye' | 'caret' | 'google' | 'github' | 'book' | 'pin' | 'calendar' | 'up' | 'down' }>()
</script>

<template>
  <svg v-if="name === 'cart'" viewBox="0 0 28 28" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4h4l3 13.5h12.5L24 8H7" /><circle cx="11" cy="23" r="1.6" /><circle cx="20" cy="23" r="1.6" /></svg>
  <svg v-else-if="name === 'chev'" viewBox="0 0 18 26" aria-hidden="true"><path d="M3 2l12 11L3 24" /></svg>
  <svg v-else-if="name === 'arrow'" viewBox="0 0 24 16" aria-hidden="true"><path d="M0 8h22M15 1l7 7-7 7" /></svg>
  <svg v-else-if="name === 'close'" viewBox="0 0 28 28" aria-hidden="true"><path d="M4 4l20 20M24 4L4 24" /></svg>
  <svg v-else-if="name === 'x'" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
  <svg v-else-if="name === 'prev'" viewBox="0 0 26 40" aria-hidden="true"><path d="M20 2L4 20l16 18" /></svg>
  <svg v-else-if="name === 'next'" viewBox="0 0 26 40" aria-hidden="true"><path d="M6 2l16 18L6 38" /></svg>
  <svg v-else-if="name === 'caret'" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4.2l4 4 4-4" /></svg>
  <template v-else-if="name === 'eye'">
    <svg class="on" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
    <svg class="off" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /><path d="M3 21L21 3" /></svg>
  </template>
  <svg v-else-if="name === 'book'" viewBox="0 0 40 32" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h14c2.2 0 4 1.8 4 4v22c0-2.2-1.8-4-4-4H2zM38 3H24c-2.2 0-4 1.8-4 4v22c0-2.2 1.8-4 4-4h14z" /></svg>
  <svg v-else-if="name === 'pin'" viewBox="0 0 40 40" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M20 3a8 8 0 0 0-8 8c0 6 8 14 8 14s8-8 8-14a8 8 0 0 0-8-8z" fill="#fff" /><circle cx="20" cy="11" r="2.6" fill="#000" stroke="none" /><path d="M10 28l-7 9h34l-7-9" /></svg>
  <svg v-else-if="name === 'calendar'" viewBox="0 0 40 36" fill="none" stroke="#fff" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h34v22H3zM3 12l3-9h28l3 9M13 6v6M27 6v6" /><text x="20" y="29" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" stroke="none" font-family="Montserrat,sans-serif">31</text></svg>
  <svg v-else-if="name === 'up'" viewBox="0 0 16 10" aria-hidden="true"><path d="M2 8l6-6 6 6" /></svg>
  <svg v-else-if="name === 'down'" viewBox="0 0 16 10" aria-hidden="true"><path d="M2 2l6 6 6-6" /></svg>
  <svg v-else-if="name === 'google'" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z" /><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3a7.2 7.2 0 0 1-10.7-3.78H1.4v3.09A12 12 0 0 0 12 24z" /><path fill="#FBBC05" d="M5.37 14.31a7.2 7.2 0 0 1 0-4.62V6.6H1.4a12 12 0 0 0 0 10.8l3.97-3.09z" /><path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A12 12 0 0 0 1.4 6.6l3.97 3.09A7.15 7.15 0 0 1 12 4.77z" /></svg>
  <svg v-else-if="name === 'github'" viewBox="0 0 24 24" aria-hidden="true"><path fill="#111" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
</template>
