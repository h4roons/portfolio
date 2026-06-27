<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { education, certifications } = usePortfolio()
</script>

<template>
  <section id="education" class="py-24 md:py-32">
    <div class="mx-auto max-w-content px-5 md:px-8">
      <SectionHeading index="06" eyebrow="Education" title="Foundations" />

      <div class="grid gap-5">
        <div
          v-for="edu in education"
          :key="edu.institution"
          class="group rounded-3xl glass glass-hover p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6"
          v-reveal
          v-spotlight
        >
          <div class="shrink-0 grid place-items-center w-14 h-14 rounded-2xl chip text-base-c transition-all duration-300 group-hover:grad-bg group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5"/></svg>
          </div>
          <div class="flex-1">
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 class="font-display text-xl font-bold text-base-c">{{ edu.degree }}</h3>
              <span class="font-mono text-xs text-faint-c">{{ edu.period }}</span>
            </div>
            <p class="text-base-c font-medium mt-0.5 opacity-80">{{ edu.institution }}</p>
            <p class="text-sm text-muted-c mt-2">{{ edu.detail }}</p>
          </div>
        </div>

        <div
          v-if="certifications.length"
          class="rounded-3xl glass glass-hover p-7 md:p-8"
          v-reveal="100"
        >
          <h3 class="font-mono text-xs uppercase tracking-[0.2em] text-faint-c mb-5">
            Certifications &amp; Training
          </h3>
          <ul class="grid sm:grid-cols-2 gap-4">
            <li
              v-for="cert in certifications"
              :key="cert.name"
              class="flex gap-3.5 items-start"
            >
              <span class="shrink-0 grid place-items-center w-9 h-9 rounded-xl chip text-base-c mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="m8.5 13.5-1.5 7L12 18l5 2.5-1.5-7"/></svg>
              </span>
              <span class="min-w-0">
                <span class="block text-base-c font-medium leading-snug">{{ cert.name }}</span>
                <span class="block text-sm text-faint-c mt-0.5">{{ cert.issuer }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
