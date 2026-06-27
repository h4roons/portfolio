<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile } = usePortfolio()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="px-4 md:px-6 pb-5">
    <div class="mx-auto max-w-content rounded-2xl glass px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="font-mono text-sm text-faint-c">© {{ year }} {{ profile.name }}</p>
      <p class="font-mono text-xs text-faint-c">Built with Nuxt 3 · Vue 3 · TypeScript · Tailwind</p>
      <div class="flex items-center gap-4">
        <a
          v-for="s in profile.socials"
          :key="s.label"
          :href="s.href"
          :target="s.icon === 'linkedin' || s.icon === 'github' ? '_blank' : undefined"
          rel="noopener"
          class="text-sm text-muted-c hover:text-base-c transition-colors"
        >{{ s.label }}</a>
      </div>
    </div>
  </footer>
</template>
