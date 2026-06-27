// Global v-spotlight directive: tracks the cursor over an element and exposes
// --mx / --my CSS vars so a radial highlight can follow the pointer.
// Pairs with the `.spotlight` class in main.scss. Skipped for touch / reduced motion.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('spotlight', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement) {
      if (!import.meta.client) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const fine = window.matchMedia('(pointer: fine)').matches
      if (reduced || !fine) return

      el.classList.add('spotlight')

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        el.style.setProperty('--my', `${e.clientY - rect.top}px`)
      }

      el.addEventListener('mousemove', onMove)
      ;(el as any).__spotCleanup = () => el.removeEventListener('mousemove', onMove)
    },
    unmounted(el: HTMLElement) {
      ;(el as any).__spotCleanup?.()
    },
  })
})
