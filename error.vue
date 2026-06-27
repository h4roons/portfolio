<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = props.error?.statusCode === 404
const heading = is404 ? 'Page not found' : 'Something went wrong'
const detail = is404
  ? "The page you're looking for doesn't exist or may have moved."
  : 'An unexpected error occurred. Try heading back home.'

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
    <!-- Reuse the ambient aurora so the error page is on-brand -->
    <div class="aurora-field" aria-hidden="true">
      <span /><span /><span />
    </div>

    <div class="relative text-center max-w-lg">
      <p class="font-display font-extrabold tracking-tightest text-gradient text-7xl sm:text-8xl md:text-9xl leading-none">
        {{ error?.statusCode || 'Oops' }}
      </p>
      <h1 class="mt-4 font-display text-2xl md:text-3xl font-bold text-base-c">{{ heading }}</h1>
      <p class="mt-3 text-muted-c leading-relaxed">{{ detail }}</p>

      <button
        @click="goHome"
        class="group mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-accent font-semibold"
      >
        <svg class="transition-transform group-hover:-translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
        Back home
      </button>
    </div>
  </div>
</template>
