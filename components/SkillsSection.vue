<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { skillCategories } = usePortfolio()
const allSkills = skillCategories.flatMap((c) => c.skills)
const marquee = [...allSkills, ...allSkills]
</script>

<template>
  <section id="skills" class="py-24 md:py-32">
    <div class="mx-auto max-w-content px-5 md:px-8">
      <SectionHeading index="02" eyebrow="Skills" title="Tools of the trade" />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(cat, i) in skillCategories"
          :key="cat.name"
          class="rounded-3xl glass glass-hover p-6"
          v-reveal="i * 70"
          v-spotlight
        >
          <div class="flex items-baseline justify-between mb-1">
            <h3 class="font-display text-lg font-semibold text-base-c">{{ cat.name }}</h3>
            <span class="font-mono text-xs text-gradient font-semibold">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <p class="text-sm text-faint-c mb-5">{{ cat.description }}</p>
          <ul class="flex flex-wrap gap-2">
            <li v-for="skill in cat.skills" :key="skill" class="text-sm px-3 py-1.5 rounded-lg chip text-muted-c transition-colors duration-300 hover:text-base-c hover:border-[rgb(var(--acc-1)/0.5)]">
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-16 marquee-mask overflow-hidden" v-reveal>
      <div class="flex w-max animate-marquee gap-3">
        <span v-for="(skill, i) in marquee" :key="i" class="font-mono text-sm whitespace-nowrap px-4 py-2 rounded-full chip text-faint-c">
          {{ skill }}
        </span>
      </div>
    </div>
  </section>
</template>
