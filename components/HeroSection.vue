<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile, stats } = usePortfolio()

const go = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Typewriter role rotator
const roles = [
  'Software Engineer',
  'Nuxt & Vue Developer',
  'AI & Agent Builder',
  'Game Developer',
  'Community Leader',
]
const typed = ref(roles[0])
let alive = true
onBeforeUnmount(() => {
  alive = false
})

onMounted(() => {
  if (!import.meta.client) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let ri = 0
  let ci = roles[0].length
  let deleting = false

  const tick = () => {
    if (!alive) return
    const word = roles[ri]
    if (!deleting) {
      ci++
      typed.value = word.slice(0, ci)
      if (ci >= word.length) {
        deleting = true
        return window.setTimeout(tick, 1500)
      }
    } else {
      ci--
      typed.value = word.slice(0, ci)
      if (ci <= 0) {
        deleting = false
        ri = (ri + 1) % roles.length
        return window.setTimeout(tick, 280)
      }
    }
    window.setTimeout(tick, deleting ? 45 : 90)
  }

  window.setTimeout(tick, 1700)
})
</script>

<template>
  <section id="home" class="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
    <!-- Faint grid texture under everything -->
    <div class="absolute inset-0 grid-texture pointer-events-none" aria-hidden="true" />

    <!-- Floating glass shards + colored glow blobs (depth, signature) -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div class="absolute top-[12%] right-[6%] w-72 h-72 rounded-full glow-blob animate-glow-pulse" />
      <div class="absolute bottom-[10%] left-[2%] w-64 h-64 rounded-full glow-blob animate-glow-pulse" style="animation-delay:-2.5s" />
      <div class="absolute top-[14%] right-[8%] w-44 h-44 rounded-3xl glass animate-float-slow" style="animation-delay:-2s" />
      <div class="absolute bottom-[18%] left-[6%] w-32 h-32 rounded-2xl glass animate-float-slow" style="animation-delay:-6s" />
      <div class="absolute top-[40%] left-[42%] w-24 h-24 rounded-full glass animate-float-slow" style="animation-delay:-9s" />
    </div>

    <div class="relative mx-auto max-w-content px-5 md:px-8 w-full">
      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <!-- Left: copy -->
        <div class="lg:col-span-7">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full chip mb-7" v-reveal>
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full rounded-full animate-ping" style="background:rgb(var(--acc-2))" />
              <span class="relative inline-flex rounded-full h-2 w-2" style="background:rgb(var(--acc-1))" />
            </span>
            <span class="font-mono text-xs shimmer-line">Open to software, AI &amp; product roles</span>
          </div>

          <h1 class="font-display font-extrabold tracking-tightest leading-[1.03] text-4xl sm:text-5xl md:text-6xl lg:text-[4.4rem]" v-reveal="80">
            <span class="text-base-c">Muhammad</span><br />
            <span class="text-gradient">Haroon Sohail</span>
          </h1>

          <p class="mt-5 text-xl md:text-2xl font-display font-semibold" v-reveal="140">
            <span class="text-muted-c">I build as a </span>
            <span class="text-gradient">{{ typed }}</span><span class="type-caret" aria-hidden="true">|</span>
          </p>

          <p class="mt-3 text-base md:text-lg text-muted-c max-w-xl leading-relaxed" v-reveal="200">
            {{ profile.summaryShort }}
          </p>

          <div class="mt-7 flex flex-wrap gap-2" v-reveal="220">
            <span v-for="d in profile.domains" :key="d" class="font-mono text-xs px-3 py-1.5 rounded-lg chip text-faint-c">
              {{ d }}
            </span>
          </div>

          <div class="mt-9 flex flex-wrap items-center gap-3" v-reveal="300">
            <button
              @click="go('projects')"
              class="group inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-accent font-semibold"
            >
              View my work
              <svg class="transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
            <button
              @click="go('contact')"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glass-hover text-base-c font-semibold"
            >
              Get in touch
            </button>
            <NuxtLink
              to="/os"
              class="group inline-flex items-center gap-2 px-5 py-3 rounded-xl glass glass-hover text-base-c font-medium"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.45-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.29-1.61 2.8-.41 6.94 1.16 9.21.77 1.11 1.68 2.36 2.88 2.31 1.16-.05 1.6-.75 3-.75s1.79.75 3.01.72c1.24-.02 2.03-1.13 2.79-2.25.88-1.29 1.24-2.54 1.26-2.6-.03-.01-2.42-.93-2.45-3.68zM14.13 5.86c.64-.78 1.07-1.85.95-2.93-.92.04-2.04.61-2.7 1.39-.59.69-1.11 1.8-.97 2.85 1.03.08 2.08-.52 2.72-1.31z"/></svg>
              Try the macOS version
              <svg class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Right: frosted profile panel (signature) -->
        <div class="lg:col-span-5" v-reveal="200">
          <div class="relative rounded-3xl glass-strong grad-border p-7 md:p-8" v-spotlight>
            <!-- stacked glass behind, for depth -->
            <div class="absolute -inset-3 -z-10 rounded-3xl glass opacity-60 rotate-2" aria-hidden="true" />

            <div class="flex items-center gap-4">
              <div class="grid place-items-center w-16 h-16 rounded-2xl grad-bg text-white font-display font-bold text-xl shadow-lg">
                HS
              </div>
              <div>
                <p class="font-display font-bold text-lg text-base-c leading-tight">{{ profile.shortName }}</p>
                <p class="text-sm text-faint-c">{{ profile.location }}</p>
              </div>
            </div>

            <div class="mt-6 space-y-px rounded-2xl overflow-hidden border-hair">
              <div class="flex items-center justify-between px-4 py-3 bg-[rgb(var(--glass-fill)/0.03)]">
                <span class="text-sm text-muted-c">Core stack</span>
                <span class="font-mono text-sm text-base-c">Nuxt · Vue · Python</span>
              </div>
              <div class="flex items-center justify-between px-4 py-3 bg-[rgb(var(--glass-fill)/0.03)]">
                <span class="text-sm text-muted-c">Experience</span>
                <span class="font-mono text-sm text-base-c">{{ profile.yearsExperience }} years</span>
              </div>
              <div class="flex items-center justify-between px-4 py-3 bg-[rgb(var(--glass-fill)/0.03)]">
                <span class="text-sm text-muted-c">Status</span>
                <span class="font-mono text-sm text-base-c">Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats strip -->
      <div class="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3" v-reveal="360">
        <div v-for="s in stats" :key="s.label" class="rounded-2xl glass px-6 py-7 text-center glass-hover" v-spotlight>
          <div class="font-display text-3xl md:text-4xl font-bold text-gradient">
            <StatNumber :value="s.value" />
          </div>
          <div class="mt-1 text-sm text-faint-c">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- Bobbing scroll cue -->
    <button
      @click="go('about')"
      class="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-faint-c hover:text-base-c transition-colors"
      aria-label="Scroll to about"
    >
      <span class="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <span class="grid place-items-center w-6 h-10 rounded-full border border-[rgb(var(--hairline)/0.3)]">
        <span class="w-1 h-2 rounded-full bg-accent-c animate-bob" />
      </span>
    </button>
  </section>
</template>

<style scoped>
.type-caret {
  display: inline-block;
  margin-left: 1px;
  color: rgb(var(--acc-2));
  font-weight: 400;
  animation: caret-blink 1s steps(1) infinite;
}
@keyframes caret-blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .type-caret { animation: none; }
}
</style>
