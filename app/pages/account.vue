<script setup lang="ts">
useSeoMeta({ title: 'My Account', description: 'Manage your KhmerSpere account details and view your order history.' })

const form = reactive({ name: '', email: '', phone: '' })
const err = reactive<Record<string, string>>({ name: '', email: '', phone: '' })
const status = ref<{ type: 'ok' | 'err'; text: string } | null>(null)
const nameEl = ref<HTMLInputElement>()
const rules: Record<string, () => string> = {
  name: () => (form.name.trim().length >= 2 ? '' : 'Enter your full name.'),
  email: () => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ? '' : 'Enter a valid email address.'),
  phone: () => (!form.phone.trim() || /^[+()\d\s-]{6,20}$/.test(form.phone.trim()) ? '' : 'Enter a valid phone number.')
}
const keys = Object.keys(rules)
const check = (k: string) => { err[k] = rules[k]!(); return !err[k] }
function editProfile() {
  document.getElementById('edit-info')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  nameEl.value?.focus({ preventScroll: true })
}
function cancel() { form.name = form.email = form.phone = ''; keys.forEach(k => { err[k] = '' }); status.value = null }
function save() {
  status.value = null
  if (!keys.map(check).every(Boolean)) { status.value = { type: 'err', text: 'Please fix the highlighted fields.' }; return }
  status.value = { type: 'ok', text: "This front end isn't connected to an account service yet, so your changes were not saved." }
}
</script>

<template>
  <div class="account">
    <header class="account__hero">
      <h1>Welcome, John Doe</h1>
      <p>Manage your account details here</p>
    </header>

    <div class="wrap">
      <div class="profile">
        <img class="profile__img" src="/img/account/avatar.webp" alt="Profile photo of Monypich Yun" width="102" height="102">
        <div class="profile__info">
          <h2>Monypich Yun</h2>
          <span class="badge">Gold Member</span>
          <p>Update your personal information</p>
        </div>
        <button class="btn-white" type="button" @click="editProfile">Edit Profile</button>
      </div>
      <p class="demo-note">Sample account shown for the design. <NuxtLink to="/login">Log in</NuxtLink> or <NuxtLink to="/signup">sign up</NuxtLink> — accounts aren't connected to a service yet.</p>

      <section id="edit-info" class="edit" aria-labelledby="edit-h">
        <h2 id="edit-h">Edit Personal Information</h2>
        <form class="aform" novalidate @submit.prevent="save">
          <div class="afield">
            <label for="a-name">Full Name</label>
            <input id="a-name" ref="nameEl" v-model="form.name" type="text" autocomplete="name" placeholder="Enter your full name" :aria-invalid="!!err.name" aria-describedby="a-name-e" @blur="check('name')" @input="err.name && check('name')">
            <p id="a-name-e" class="cfield__err">{{ err.name }}</p>
          </div>
          <div class="afield">
            <label for="a-email">Email Address</label>
            <input id="a-email" v-model="form.email" type="email" autocomplete="email" placeholder="Enter your email address" :aria-invalid="!!err.email" aria-describedby="a-email-e" @blur="check('email')" @input="err.email && check('email')">
            <p id="a-email-e" class="cfield__err">{{ err.email }}</p>
          </div>
          <div class="afield">
            <label for="a-phone">Phone Number</label>
            <input id="a-phone" v-model="form.phone" type="tel" autocomplete="tel" placeholder="Enter your phone number" :aria-invalid="!!err.phone" aria-describedby="a-phone-e" @blur="check('phone')" @input="err.phone && check('phone')">
            <p id="a-phone-e" class="cfield__err">{{ err.phone }}</p>
          </div>
          <div class="aform__btns">
            <button class="abtn" type="button" @click="cancel">Cancel</button>
            <button class="abtn" type="submit">Save Changes</button>
          </div>
          <p v-if="status" class="status" :class="`status--${status.type}`" role="status">{{ status.text }}</p>
        </form>
      </section>

      <section class="orders" aria-labelledby="ord-h">
        <h2 id="ord-h">Order History</h2>
        <ul>
          <li v-for="(o, i) in ORDERS" :key="o.id" v-reveal class="order reveal" :style="{ '--i': i }">
            <img :src="o.img" alt="" width="60" height="60" loading="lazy">
            <div><p class="order__id">Order {{ o.id }}</p><p class="order__st">{{ o.status }}</p></div>
            <time class="order__date">{{ o.date }}</time>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
