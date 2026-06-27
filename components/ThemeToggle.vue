<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'
const { theme, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    @click="toggle"
    class="relative grid place-items-center w-9 h-9 rounded-lg chip hover:bg-[rgb(var(--glass-fill)/var(--glass-alpha-strong))] transition-colors"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Transition name="icon" mode="out-in">
      <svg
        v-if="theme === 'dark'" key="sun"
        xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="text-base-c"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        v-else key="moon"
        xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="text-base-c"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </Transition>
  </button>
</template>

<style scoped>
.icon-enter-active,
.icon-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.icon-enter-from { opacity: 0; transform: rotate(-40deg) scale(0.6); }
.icon-leave-to { opacity: 0; transform: rotate(40deg) scale(0.6); }
</style>
