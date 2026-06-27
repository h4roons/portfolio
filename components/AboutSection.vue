<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile, languages } = usePortfolio()
</script>

<template>
  <section id="about" class="py-24 md:py-32">
    <div class="mx-auto max-w-content px-5 md:px-8">
      <SectionHeading index="01" eyebrow="About" title="The person behind the code" />

      <div class="grid lg:grid-cols-12 gap-6">
        <div class="lg:col-span-7 rounded-3xl glass p-8 md:p-10" v-reveal>
          <p class="text-xl md:text-2xl text-base-c leading-relaxed font-display font-medium tracking-tight">
            {{ profile.summary }}
          </p>
          <p class="mt-6 text-base text-muted-c leading-relaxed">
            I work across the whole product: scalable Nuxt and Vue frontends, AI and
            agentic services in Python, and the requirements, metrics, and delivery
            that decide what's worth building. I care about reusable systems,
            predictable data flow, and shipping things that measurably move the numbers.
          </p>
        </div>

        <div class="lg:col-span-5 space-y-6">
          <div class="rounded-3xl glass p-7 glass-hover" v-reveal="120" v-spotlight>
            <h3 class="font-mono text-xs uppercase tracking-[0.2em] text-faint-c mb-4">At a glance</h3>
            <dl class="space-y-3.5">
              <div class="flex justify-between gap-4">
                <dt class="text-muted-c">Location</dt>
                <dd class="text-base-c font-medium text-right">{{ profile.location }}</dd>
              </div>
              <div class="flex justify-between gap-4">
                <dt class="text-muted-c">Experience</dt>
                <dd class="text-base-c font-medium text-right">{{ profile.yearsExperience }} years</dd>
              </div>
              <div class="flex justify-between gap-4">
                <dt class="text-muted-c">Focus</dt>
                <dd class="text-base-c font-medium text-right">Nuxt · AI · Product</dd>
              </div>
            </dl>
          </div>

          <div class="rounded-3xl glass p-7 glass-hover" v-reveal="200" v-spotlight>
            <h3 class="font-mono text-xs uppercase tracking-[0.2em] text-faint-c mb-4">Languages</h3>
            <ul class="space-y-3">
              <li v-for="lang in languages" :key="lang.name" class="flex justify-between gap-4">
                <span class="text-base-c font-medium">{{ lang.name }}</span>
                <span class="text-muted-c text-sm text-right">{{ lang.level }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
