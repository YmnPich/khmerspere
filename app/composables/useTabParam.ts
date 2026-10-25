/** Tab state kept in the URL (?tab=soon) so it is deep-linkable and renders correctly on the server. */
export function useTabParam(keys: string[], fallback: string) {
  const route = useRoute()
  const router = useRouter()
  const active = computed(() => {
    const q = String(route.query.tab ?? '')
    return keys.includes(q) ? q : fallback
  })
  const set = (key: string) => {
    router.replace({ query: { ...route.query, tab: key === fallback ? undefined : key } })
  }
  return { active, set }
}
