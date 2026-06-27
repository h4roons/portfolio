<script setup lang="ts">
import { useWindowsStore } from '~/stores/windows'
import MacAbout from '~/components/MacAbout.vue'
import MacExperience from '~/components/MacExperience.vue'
import MacProjects from '~/components/MacProjects.vue'
import MacTerminal from '~/components/MacTerminal.vue'
import MacCommunity from '~/components/MacCommunity.vue'
import MacEducation from '~/components/MacEducation.vue'
import MacContact from '~/components/MacContact.vue'
import MacResume from '~/components/MacResume.vue'

const store = useWindowsStore()
const spotlightOpen = ref(false)

// Map app id -> component (explicit imports so dynamic :is always resolves)
const registry: Record<string, any> = {
  about: MacAbout,
  experience: MacExperience,
  projects: MacProjects,
  skills: MacTerminal,
  volunteering: MacCommunity,
  education: MacEducation,
  contact: MacContact,
  resume: MacResume,
}
const componentFor = (id: string) => registry[id] ?? MacAbout

// Desktop shortcuts (top-right) — a couple of "files" on the desktop
const shortcuts = [
  { id: 'resume', label: 'Resume.pdf', icon: '📄' },
  { id: 'projects', label: 'Projects', icon: '🗂️' },
]

const booted = ref(false)

const onKey = (e: KeyboardEvent) => {
  // ⌘Space / Ctrl+Space toggles Spotlight
  if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
    e.preventDefault()
    spotlightOpen.value = !spotlightOpen.value
  }
  if (e.key === 'Escape') spotlightOpen.value = false
}

onMounted(() => {
  // Boot reveal + open the About window as a welcome
  requestAnimationFrame(() => (booted.value = true))
  window.setTimeout(() => store.openApp('about'), 650)
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="mac-root" :class="{ booted }">
    <!-- Wallpaper -->
    <div class="wallpaper" aria-hidden="true">
      <span class="wp-blob b1" />
      <span class="wp-blob b2" />
      <span class="wp-blob b3" />
      <div class="wp-grid" />
    </div>

    <MacMenuBar @open-spotlight="spotlightOpen = true" />

    <!-- Desktop shortcuts -->
    <div class="shortcuts">
      <button
        v-for="s in shortcuts"
        :key="s.id"
        class="shortcut"
        @dblclick="store.openApp(s.id)"
        @click="store.openApp(s.id)"
      >
        <span class="ico">{{ s.icon }}</span>
        <span class="lbl">{{ s.label }}</span>
      </button>
    </div>

    <!-- Windows -->
    <MacWindow
      v-for="w in store.open"
      :key="w.id"
      :win="w"
    >
      <component :is="componentFor(w.id)" />
    </MacWindow>

    <MacSpotlight v-model="spotlightOpen" />
    <MacDock @open-spotlight="spotlightOpen = true" />
  </div>
</template>

<style scoped>
.mac-root {
  position: fixed;
  inset: 0;
  overflow: hidden;
  font-family: -apple-system, 'SF Pro Display', 'Inter', system-ui, sans-serif;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.mac-root.booted { opacity: 1; }

/* ---- Wallpaper ---- */
.wallpaper {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(120% 100% at 50% 0%, #0b1220 0%, #0a0e16 45%, #06080d 100%);
}
.wp-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: wp-drift 26s ease-in-out infinite;
}
.b1 { width: 50vw; height: 50vw; top: -10%; left: -8%; background: rgba(14, 165, 233, 0.5); }
.b2 { width: 46vw; height: 46vw; top: 5%; right: -10%; background: rgba(34, 211, 238, 0.38); animation-delay: -8s; }
.b3 { width: 44vw; height: 44vw; bottom: -16%; left: 32%; background: rgba(99, 102, 241, 0.32); animation-delay: -15s; }
@keyframes wp-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(6%, 5%) scale(1.12); }
  66% { transform: translate(-5%, -4%) scale(0.92); }
}
.wp-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(120% 100% at 50% 30%, #000 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(120% 100% at 50% 30%, #000 40%, transparent 100%);
}
@media (prefers-reduced-motion: reduce) {
  .wp-blob { animation: none; }
  .mac-root { transition: none; }
}

/* ---- Desktop shortcuts ---- */
.shortcuts {
  position: absolute;
  top: 44px;
  right: 18px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.shortcut {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 84px;
  padding: 8px 6px;
  border-radius: 10px;
  background: transparent;
  transition: background 0.2s ease;
}
.shortcut:hover { background: rgba(56, 189, 248, 0.18); }
.shortcut .ico { font-size: 36px; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5)); }
.shortcut .lbl {
  font-size: 12px;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  padding: 1px 6px;
  border-radius: 5px;
}
@media (max-width: 640px) {
  .shortcuts { display: none; }
}
</style>
