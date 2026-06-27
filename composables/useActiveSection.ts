// Tracks which section is in view for sticky-nav highlighting.
export const useActiveSection = (ids: string[]) => {
  const active = useState<string>('active-section', () => ids[0] ?? '')

  onMounted(() => {
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) active.value = id
          })
        },
        { threshold: 0.25, rootMargin: '-40% 0px -55% 0px' }
      )
      io.observe(el)
      observers.push(io)
    })

    onBeforeUnmount(() => observers.forEach((o) => o.disconnect()))
  })

  return { active }
}
