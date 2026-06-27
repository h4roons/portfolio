<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { experience } = usePortfolio()
</script>

<template>
  <section id="experience" class="py-24 md:py-32">
    <div class="mx-auto max-w-content px-5 md:px-8">
      <SectionHeading index="03" eyebrow="Experience" title="Where I've shipped" />

      <div class="relative">
        <div class="absolute left-0 md:left-1/2 top-2 bottom-2 w-px bg-[rgb(var(--hairline)/0.15)] md:-translate-x-1/2" aria-hidden="true" />

        <ol class="space-y-10">
          <li
            v-for="(job, i) in experience"
            :key="job.company"
            class="relative md:grid md:grid-cols-2 md:gap-12"
            v-reveal="i * 80"
          >
            <span class="absolute left-0 md:left-1/2 top-3 -translate-x-1/2 grid place-items-center">
              <span class="absolute w-5 h-5 rounded-full grad-bg opacity-50 blur-[3px]" :class="job.current ? 'animate-glow-pulse' : ''" />
              <span class="relative w-3.5 h-3.5 rounded-full grad-bg ring-4" style="--tw-ring-color: rgb(var(--bg))" />
            </span>

            <div :class="['pl-8 md:pl-0', i % 2 === 0 ? 'md:order-1 md:text-right md:pr-12' : 'md:order-2 md:pl-12']">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full chip mb-3">
                <span v-if="job.current" class="w-1.5 h-1.5 rounded-full bg-accent-c animate-pulse-dot" />
                <span class="font-mono text-xs text-muted-c">{{ job.period }}</span>
              </div>
              <span class="block font-mono text-xs uppercase tracking-[0.15em] text-faint-c">{{ job.domain }}</span>
            </div>

            <div :class="['pl-8 md:pl-0 mt-3 md:mt-0', i % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12']">
              <div class="rounded-3xl glass glass-hover p-6" v-spotlight>
                <h3 class="font-display text-lg font-semibold text-base-c leading-snug">{{ job.role }}</h3>
                <p class="text-base-c font-medium mt-0.5 opacity-80">{{ job.company }}</p>
                <p class="text-sm text-faint-c">{{ job.location }}</p>

                <ul class="mt-4 space-y-2.5">
                  <li v-for="c in job.contributions" :key="c" class="flex gap-2.5 text-sm text-muted-c leading-relaxed">
                    <span class="text-base-c mt-1.5 shrink-0 opacity-50">
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3"/></svg>
                    </span>
                    {{ c }}
                  </li>
                </ul>

                <div class="mt-5 flex flex-wrap gap-1.5">
                  <span v-for="t in job.stack" :key="t" class="font-mono text-xs px-2.5 py-1 rounded-md chip text-faint-c">{{ t }}</span>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
