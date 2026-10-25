<script setup lang="ts">
useSeoMeta({ title: 'Contact Us', description: 'Get in touch with KhmerSpere — questions about artworks, exhibitions and events.' })

const v = reactive({ first: '', last: '', email: '', message: '' })
const err = reactive<Record<string, string>>({ first: '', last: '', email: '', message: '' })
const status = ref<{ type: 'ok' | 'err'; text: string } | null>(null)
const rules: Record<string, () => string> = {
  first: () => (v.first.trim() ? '' : 'Enter your first name.'),
  last: () => (v.last.trim() ? '' : 'Enter your last name.'),
  email: () => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()) ? '' : 'Enter a valid email address.'),
  message: () => (v.message.trim().length >= 10 ? '' : 'Please write at least 10 characters.')
}
const keys = Object.keys(rules)
const check = (k: string) => { err[k] = rules[k]!(); return !err[k] }
function submit() {
  status.value = null
  const ok = keys.map(check).every(Boolean)
  if (!ok) {
    document.getElementById(`c-${keys.find(k => err[k])}`)?.focus()
    status.value = { type: 'err', text: 'Please fix the highlighted fields.' }
    return
  }
  status.value = { type: 'ok', text: "This front end isn't connected to an email or messaging service yet, so your message was not sent. Your details look valid." }
}
</script>

<template>
  <div class="wrap contact">
    <div class="contact__form">
      <h1 class="contact__title">Contact us</h1>
      <form class="cform" novalidate @submit.prevent="submit">
        <div class="cform__two">
          <div class="cfield">
            <label for="c-first">First Name</label>
            <input id="c-first" v-model="v.first" type="text" name="first" autocomplete="given-name" placeholder="Jane" :aria-invalid="!!err.first" aria-describedby="c-first-e" @blur="check('first')" @input="err.first && check('first')">
            <p id="c-first-e" class="cfield__err">{{ err.first }}</p>
          </div>
          <div class="cfield">
            <label for="c-last">Last Name</label>
            <input id="c-last" v-model="v.last" type="text" name="last" autocomplete="family-name" placeholder="Smitherton" :aria-invalid="!!err.last" aria-describedby="c-last-e" @blur="check('last')" @input="err.last && check('last')">
            <p id="c-last-e" class="cfield__err">{{ err.last }}</p>
          </div>
        </div>
        <div class="cfield">
          <label for="c-email">Email</label>
          <input id="c-email" v-model="v.email" type="email" name="email" autocomplete="email" placeholder="email@janesfakedomain.net" :aria-invalid="!!err.email" aria-describedby="c-email-e" @blur="check('email')" @input="err.email && check('email')">
          <p id="c-email-e" class="cfield__err">{{ err.email }}</p>
        </div>
        <div class="cfield">
          <label for="c-message">Your message</label>
          <textarea id="c-message" v-model="v.message" name="message" rows="6" placeholder="Enter your question or message" :aria-invalid="!!err.message" aria-describedby="c-message-e" @blur="check('message')" @input="err.message && check('message')" />
          <p id="c-message-e" class="cfield__err">{{ err.message }}</p>
        </div>
        <button class="cform__submit" type="submit">Submit</button>
        <p v-if="status" class="status" :class="`status--${status.type}`" role="status">{{ status.text }}</p>
      </form>
    </div>
    <div v-reveal class="contact__img reveal">
      <img src="/img/contact/hero.webp" alt="KhmerSpere wordmark over a museum gallery with a visitor walking toward a statue" width="1100" height="1225">
    </div>
  </div>
</template>
