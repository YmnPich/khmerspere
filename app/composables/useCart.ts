export interface CartLine { id: string; title: string; price: number; img: string; meta?: string; qty: number }

const KEY = 'khmerspere.cart.v1'
let toastTimer: ReturnType<typeof setTimeout> | undefined

export const useToast = () => {
  const msg = useState('toast-msg', () => '')
  const on = useState('toast-on', () => false)
  const show = (m: string) => {
    msg.value = m
    on.value = true
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { on.value = false }, 2200)
  }
  return { msg, on, show }
}

export const useCart = () => {
  const lines = useState<CartLine[]>('cart-lines', () => [])
  const isOpen = useState('cart-open', () => false)
  const bump = useState('cart-bump', () => 0)
  const loaded = useState('cart-loaded', () => false)

  const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))
  const total = computed(() => lines.value.reduce((s, l) => s + l.price * l.qty, 0))

  // storage may be blocked (private mode) — never let it break the page
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(lines.value)) } catch { /* ignore */ } }
  function load() {
    if (!import.meta.client || loaded.value) return
    loaded.value = true
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || '[]')
      if (Array.isArray(v)) lines.value = v
    } catch { /* ignore */ }
  }
  function add(item: Omit<CartLine, 'qty'>, qty = 1) {
    const found = lines.value.find(l => l.id === item.id)
    if (found) found.qty += qty
    else lines.value.push({ ...item, qty })
    bump.value++
    persist()
  }
  function change(id: string, delta: number) {
    const l = lines.value.find(x => x.id === id)
    if (!l) return
    l.qty = Math.max(1, l.qty + delta)
    persist()
  }
  function remove(id: string) {
    lines.value = lines.value.filter(l => l.id !== id)
    persist()
  }
  const open = () => { isOpen.value = true }
  const close = () => { isOpen.value = false }
  return { lines, isOpen, bump, count, total, load, add, change, remove, open, close }
}
