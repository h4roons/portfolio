// Scroll-reveal directive logic via IntersectionObserver.
// Respects prefers-reduced-motion.
export const useReveal = () => {
  const observe = (el: HTMLElement, delay = 0) => {
    if (!import.meta.client) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      el.classList.add('is-revealed')
      return
    }

    el.style.setProperty('--reveal-delay', `${delay}ms`)
    el.classList.add('reveal')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
  }

  return { observe }
}
