// Initialise theme before paint to avoid flash of incorrect theme
import { useTheme } from '~/composables/useTheme'

export default defineNuxtPlugin(() => {
  const { init } = useTheme()
  init()
})
