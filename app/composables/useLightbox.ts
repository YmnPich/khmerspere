export interface LightboxItem { src: string; alt: string }

let opener: HTMLElement | null = null

export const useLightbox = () => {
  const items = useState<LightboxItem[]>('lb-items', () => [])
  const index = useState('lb-index', () => 0)
  const isOpen = useState('lb-open', () => false)

  function openAt(list: LightboxItem[], i: number, from?: EventTarget | null) {
    items.value = list
    index.value = i
    opener = (from as HTMLElement) || null
    isOpen.value = true
  }
  function close() {
    isOpen.value = false
    opener?.focus?.()
  }
  const go = (delta: number) => {
    const n = items.value.length
    if (n) index.value = (index.value + delta + n) % n
  }
  return { items, index, isOpen, openAt, close, go }
}
