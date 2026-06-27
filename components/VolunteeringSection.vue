<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { volunteering } = usePortfolio()
</script>

<template>
  <section id="volunteering" class="py-24 md:py-32">
    <div class="mx-auto max-w-content px-5 md:px-8">
      <SectionHeading index="05" eyebrow="Volunteering" title="Community & beyond" />

      <div class="grid md:grid-cols-2 gap-5">
        <article
          v-for="(v, i) in volunteering"
          :key="v.organization"
          class="group rounded-3xl glass glass-hover p-7"
          :class="i === 0 ? 'md:col-span-2 grad-border' : ''"
          v-reveal="i * 70"
          v-spotlight
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="font-mono text-xs uppercase tracking-[0.15em] text-faint-c">{{ v.period }}</span>
              <h3 class="mt-2 font-display text-xl font-bold text-base-c leading-snug">{{ v.role }}</h3>
              <p class="text-sm text-base-c mt-0.5 opacity-80">{{ v.organization }}</p>
              <p class="text-sm text-faint-c">{{ v.location }}</p>
            </div>
            <span class="shrink-0 grid place-items-center w-11 h-11 rounded-xl chip text-muted-c transition-all duration-300 group-hover:grad-bg group-hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
          </div>

          <ul class="mt-5 space-y-2.5">
            <li v-for="c in v.contributions" :key="c" class="flex gap-2.5 text-sm text-muted-c leading-relaxed">
              <span class="text-base-c mt-1.5 shrink-0 opacity-50">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3"/></svg>
              </span>
              {{ c }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
