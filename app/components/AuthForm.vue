<script setup lang="ts">
const props = defineProps<{ kind: 'login' | 'signup' }>()
const login = props.kind === 'login'

const values = reactive({ username: '', email: '', password: '', terms: false, remember: false })
const errors = reactive<Record<string, string>>({ username: '', email: '', password: '', terms: '' })
const touched = reactive<Record<string, boolean>>({})
const showPw = ref(false)
const status = ref<{ type: 'ok' | 'err'; text: string } | null>(null)

const NOTE = "This front end isn't connected to an account service yet, so nothing was sent or saved."
const rules: Record<string, () => string> = {
  username: () => (values.username.trim().length >= 3 ? '' : 'Enter a username of at least 3 characters.'),
  email: () => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()) ? '' : 'Enter a valid email address.'),
  password: () => (login ? (values.password ? '' : 'Enter your password.') : (values.password.length >= 8 ? '' : 'Use at least 8 characters.')),
  terms: () => (values.terms ? '' : 'Please accept the terms to continue.')
}
const fields = login ? ['email', 'password'] : ['username', 'email', 'password', 'terms']
const check = (k: string) => { errors[k] = rules[k]!(); return !errors[k] }
const blur = (k: string) => { touched[k] = true; check(k) }
const input = (k: string) => { if (errors[k]) check(k) }

function submit() {
  status.value = null
  fields.forEach(k => { touched[k] = true })
  const ok = fields.map(check).every(Boolean)
  if (!ok) {
    const first = fields.find(k => errors[k])
    document.getElementById(first === 'terms' ? 'f-terms' : `f-${first === 'password' ? 'pass' : first === 'username' ? 'user' : first}`)?.focus()
    status.value = { type: 'err', text: 'Please fix the highlighted fields.' }
    return
  }
  status.value = { type: 'ok', text: `${NOTE} Your details look valid.` }
}
const oauth = (name: string) => { status.value = { type: 'err', text: `${name} sign-in isn't connected yet. Use email and password once an account service is attached.` } }
const forgot = () => { status.value = { type: 'err', text: "Password reset isn't connected to an account service yet." } }

const verb = login ? 'Log In' : 'Sign up'
</script>

<template>
  <section class="auth__panel" aria-labelledby="auth-h">
    <h1 id="auth-h">
      <template v-if="login">Welcome back to the<br>Khmer Spere</template>
      <template v-else>Get Start With us</template>
    </h1>
    <div class="social-btns">
      <button class="sbtn" type="button" @click="oauth('Google')"><UiIcon name="google" />{{ verb }} with Google</button>
      <button class="sbtn" type="button" @click="oauth('Github')"><UiIcon name="github" />{{ verb }} with Github</button>
    </div>

    <form class="form" novalidate @submit.prevent="submit">
      <div v-if="!login" class="field">
        <label for="f-user">username</label>
        <div class="field__wrap">
          <input id="f-user" v-model="values.username" type="text" name="username" autocomplete="username" placeholder="Your username" :aria-invalid="!!errors.username" aria-describedby="f-user-err" @blur="blur('username')" @input="input('username')">
        </div>
        <p id="f-user-err" class="field__err">{{ errors.username }}</p>
      </div>

      <div class="field">
        <label for="f-email">Email</label>
        <div class="field__wrap">
          <input id="f-email" v-model="values.email" type="email" name="email" autocomplete="email" placeholder="you@example.com" :aria-invalid="!!errors.email" aria-describedby="f-email-err" @blur="blur('email')" @input="input('email')">
        </div>
        <p id="f-email-err" class="field__err">{{ errors.email }}</p>
      </div>

      <div class="field">
        <label for="f-pass">Password</label>
        <div class="field__wrap">
          <input id="f-pass" v-model="values.password" :type="showPw ? 'text' : 'password'" name="password" :autocomplete="login ? 'current-password' : 'new-password'" placeholder="••••••••" :aria-invalid="!!errors.password" aria-describedby="f-pass-err" @blur="blur('password')" @input="input('password')">
          <button class="eye" type="button" :aria-label="showPw ? 'Hide password' : 'Show password'" :aria-pressed="showPw" aria-controls="f-pass" @click="showPw = !showPw"><UiIcon name="eye" /></button>
        </div>
        <p id="f-pass-err" class="field__err">{{ errors.password }}</p>
      </div>

      <div class="row" style="margin-top:44px">
        <label v-if="login" class="cbox"><input v-model="values.remember" type="checkbox" name="remember"> Remember me</label>
        <label v-else class="cbox"><input id="f-terms" v-model="values.terms" type="checkbox" name="terms" :aria-invalid="!!errors.terms" aria-describedby="f-terms-err" @change="touched.terms && check('terms')"> I accept the terms &amp; Conditions</label>
        <button class="pill submit" type="submit">{{ login ? 'LOG IN' : 'SIGN UP' }}</button>
      </div>
      <p v-if="!login" id="f-terms-err" class="field__err" style="position:static;margin-top:10px">{{ errors.terms }}</p>
      <p v-if="status" class="status" :class="`status--${status.type}`" role="status">{{ status.text }}</p>
    </form>

    <div class="auth__alt">
      <template v-if="login">
        <p>No Account yet? <NuxtLink to="/signup">SIGN UP</NuxtLink></p>
        <button type="button" style="font-weight:700" @click="forgot">Forgot Password?</button>
      </template>
      <p v-else>Already have an account? <NuxtLink to="/login">LOG IN</NuxtLink></p>
    </div>
  </section>
</template>
