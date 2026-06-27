<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { projects } = usePortfolio()
</script>

<template>
  <section id="projects" class="py-24 md:py-32">
    <div class="mx-auto max-w-content px-5 md:px-8">
      <SectionHeading index="04" eyebrow="Projects" title="Selected work" />

      <div class="grid md:grid-cols-2 gap-5">
        <article
          v-for="(p, i) in projects"
          :key="p.name"
          class="group rounded-3xl glass glass-hover p-7"
          :class="i === 0 ? 'md:col-span-2 grad-border' : ''"
          v-reveal="i * 70"
          v-spotlight
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="font-mono text-xs uppercase tracking-[0.15em] text-faint-c">{{ p.category }}</span>
              <h3 class="mt-2 font-display text-2xl font-bold text-base-c">{{ p.name }}</h3>
              <p class="text-sm text-faint-c mt-0.5">{{ p.role }}</p>
            </div>
            <span class="shrink-0 grid place-items-center w-11 h-11 rounded-xl chip text-muted-c transition-all duration-300 group-hover:grad-bg group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>
            </span>
          </div>

          <p class="mt-4 text-muted-c leading-relaxed max-w-2xl">{{ p.description }}</p>

          <ul class="mt-5 space-y-1.5">
            <li v-for="h in p.highlights" :key="h" class="flex gap-2 text-sm text-muted-c">
              <span class="text-base-c opacity-50">→</span>{{ h }}
            </li>
          </ul>

          <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap gap-1.5">
              <span v-for="t in p.tags" :key="t" class="font-mono text-xs px-2.5 py-1 rounded-md chip text-faint-c">{{ t }}</span>
            </div>
            <div v-if="p.demo || p.repo" class="flex gap-3">
              <a v-if="p.demo" :href="p.demo" target="_blank" rel="noopener" class="text-sm font-medium text-base-c hover:underline">Live demo</a>
              <a v-if="p.repo" :href="p.repo" target="_blank" rel="noopener" class="text-sm font-medium text-base-c hover:underline">Code</a>
            </div>
          </div>
        </article>
      </div>

      <p class="mt-8 text-sm text-faint-c font-mono text-center" v-reveal>
        // More projects on
        <a
          href="https://github.com/h4roons"
          target="_blank"
          rel="noopener"
          class="text-base-c hover:underline"
          >github.com/h4roons</a
        >
      </p>
    </div>
  </section>
</template>
