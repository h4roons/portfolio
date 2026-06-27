// Dark/light theme management with persistence + system preference fallback
export const useTheme = () => {
  const theme = useState<'dark' | 'light'>('theme', () => 'dark')

  const apply = (value: 'dark' | 'light') => {
    if (import.meta.client) {
      const root = document.documentElement
      root.classList.toggle('dark', value === 'dark')
      root.style.colorScheme = value
      localStorage.setItem('theme', value)
    }
  }

  const init = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      const resolved = stored ?? (prefersDark ? 'dark' : 'light')
      theme.value = resolved
      apply(resolved)
    }
  }

  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    apply(theme.value)
  }

  return { theme, init, toggle }
}
