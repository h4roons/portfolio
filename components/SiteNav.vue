<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
import { useActiveSection } from '~/composables/useActiveSection'
const { profile } = usePortfolio()

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const { active } = useActiveSection(['home', ...links.map((l) => l.id)])

const scrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 24 }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const go = (id: string) => {
  menuOpen.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 px-4 md:px-6 pt-3">
    <nav
      class="mx-auto max-w-content rounded-2xl transition-all duration-300"
      :class="scrolled ? 'glass-strong' : 'glass'"
    >
      <div class="px-4 md:px-5 h-14 flex items-center justify-between">
        <!-- Brand -->
        <button @click="go('home')" class="flex items-center gap-2.5 group" aria-label="Back to top">
          <span class="grid place-items-center w-8 h-8 rounded-lg grad-bg text-white font-display font-bold text-xs shadow-md transition-transform group-hover:scale-110 group-hover:rotate-3">
            HS
          </span>
          <span class="font-display font-semibold text-base-c hidden sm:block text-sm">
            {{ profile.shortName }}
          </span>
        </button>

        <!-- Desktop links -->
        <ul class="hidden md:flex items-center gap-0.5">
          <li v-for="link in links" :key="link.id">
            <button
              @click="go(link.id)"
              class="relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="active === link.id ? 'text-accent-c' : 'text-muted-c hover:text-base-c'"
            >
              {{ link.label }}
              <span v-if="active === link.id" class="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-1 w-5 rounded-full grad-bg" />
            </button>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <a
            :href="profile.resumeFile"
            download
            class="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg btn-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>
            Resume
          </a>
          <ThemeToggle />
          <button
            @click="menuOpen = !menuOpen"
            class="md:hidden grid place-items-center w-9 h-9 rounded-lg chip"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          >
            <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="sheet">
        <div v-if="menuOpen" class="md:hidden border-t hairline px-3 py-3">
          <ul class="space-y-1">
            <li v-for="link in links" :key="link.id">
              <button
                @click="go(link.id)"
                class="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors"
                :class="active === link.id ? 'text-accent-c chip' : 'text-muted-c'"
              >
                {{ link.label }}
              </button>
            </li>
            <li class="pt-1">
              <a
                :href="profile.resumeFile"
                download
                class="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg btn-accent font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<style scoped>
.sheet-enter-active,
.sheet-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.sheet-enter-from,
.sheet-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
