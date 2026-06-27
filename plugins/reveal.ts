// Global v-reveal directive. Registered universally so SSR/prerender
// doesn't choke on a missing directive definition; the IntersectionObserver
// logic only runs on the client inside mounted().
import { useReveal } from '~/composables/useReveal'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    // Server-side: provide no extra props
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client) return
      const { observe } = useReveal()
      const delay = typeof binding.value === 'number' ? binding.value : 0
      observe(el, delay)
    },
  })
})
