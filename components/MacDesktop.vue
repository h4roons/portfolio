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

const registry: Record<string, any> = {
  about: MacAbout, experience: MacExperience, projects: MacProjects, skills: MacTerminal,
  volunteering: MacCommunity, education: MacEducation, contact: MacContact, resume: MacResume,
}
const componentFor = (id: string) => registry[id] ?? MacAbout

const ready = ref(false)
const isMobile = ref(false)
const spotlightOpen = ref(false)
const launchpadOpen = ref(false)
const wp = ref(0) // wallpaper preset index

// Context menu
const ctxShow = ref(false)
const ctxX = ref(0)
const ctxY = ref(0)
const ctxItems = [
  { id: 'launchpad', label: 'Open Launchpad' },
  { id: 'wallpaper', label: 'Change Wallpaper' },
  { id: 'about', label: 'About This Developer' },
  { id: 'sep', label: '', divider: true },
  { id: 'classic', label: 'Switch to Classic Site →' },
]
const onCtxSelect = (id: string) => {
  if (id === 'launchpad') launchpadOpen.value = true
  else if (id === 'wallpaper') wp.value = (wp.value + 1) % 3
  else if (id === 'about') store.openApp('about')
  else if (id === 'classic') window.location.href = '/'
}
const onContext = (e: MouseEvent) => {
  const t = e.target as HTMLElement
  if (t.closest('.mac-window') || t.closest('.dock') || t.closest('.menubar') || t.closest('.shortcut')) return
  e.preventDefault()
  ctxX.value = e.clientX
  ctxY.value = e.clientY
  ctxShow.value = true
}

const shortcuts = [
  { id: 'resume', label: 'Resume.pdf' },
  { id: 'projects', label: 'Projects' },
]

const onKey = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
    e.preventDefault()
    spotlightOpen.value = !spotlightOpen.value
  }
  if (e.key === 'Escape') {
    spotlightOpen.value = false
    launchpadOpen.value = false
    ctxShow.value = false
  }
}
const onResize = () => (isMobile.value = window.innerWidth < 760)

const onBooted = () => {
  ready.value = true
  if (!isMobile.value) window.setTimeout(() => store.openApp('about'), 400)
}

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="os">
    <MacBoot v-if="!ready" @done="onBooted" />

    <MacMobile v-else-if="isMobile" />

    <div v-else class="mac-root" @contextmenu="onContext">
      <!-- Wallpaper -->
      <div class="wallpaper" :class="`wp-${wp}`" aria-hidden="true">
        <span class="wp-blob b1" />
        <span class="wp-blob b2" />
        <span class="wp-blob b3" />
        <div class="wp-grid" />
      </div>

      <MacMenuBar @open-spotlight="spotlightOpen = true" @open-launchpad="launchpadOpen = true" />

      <!-- Desktop shortcuts -->
      <div class="shortcuts">
        <button
          v-for="s in shortcuts"
          :key="s.id"
          class="shortcut"
          @dblclick="store.openApp(s.id)"
          @click="store.openApp(s.id)"
        >
          <MacIcon :id="s.id" :size="52" />
          <span class="lbl">{{ s.label }}</span>
        </button>
      </div>

      <!-- Windows -->
      <MacWindow v-for="w in store.open" :key="w.id" :win="w">
        <component :is="componentFor(w.id)" />
      </MacWindow>

      <MacSpotlight v-model="spotlightOpen" />
      <MacLaunchpad v-model="launchpadOpen" />
      <MacContextMenu v-model="ctxShow" :x="ctxX" :y="ctxY" :items="ctxItems" @select="onCtxSelect" />
      <MacDock @open-spotlight="spotlightOpen = true" @open-launchpad="launchpadOpen = true" />
    </div>
  </div>
</template>

<style scoped>
.mac-root {
  position: fixed;
  inset: 0;
  overflow: hidden;
  font-family: -apple-system, 'SF Pro Display', 'Inter', system-ui, sans-serif;
  animation: os-in 0.7s ease;
}
@keyframes os-in { from { opacity: 0; } to { opacity: 1; } }

/* ---- Wallpaper ---- */
.wallpaper { position: absolute; inset: 0; z-index: 0; }
.wp-0 { background: radial-gradient(120% 100% at 50% 0%, #0b1220 0%, #0a0e16 45%, #06080d 100%); }
.wp-1 { background: radial-gradient(120% 100% at 50% 0%, #1a1024 0%, #120a1a 45%, #08060d 100%); }
.wp-2 { background: radial-gradient(120% 100% at 50% 0%, #0a1a16 0%, #08130f 45%, #050a08 100%); }
.wp-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.6; animation: wp-drift 26s ease-in-out infinite; }
.b1 { width: 50vw; height: 50vw; top: -10%; left: -8%; }
.b2 { width: 46vw; height: 46vw; top: 5%; right: -10%; animation-delay: -8s; }
.b3 { width: 44vw; height: 44vw; bottom: -16%; left: 32%; animation-delay: -15s; }
.wp-0 .b1 { background: rgba(14, 165, 233, 0.5); }
.wp-0 .b2 { background: rgba(34, 211, 238, 0.38); }
.wp-0 .b3 { background: rgba(99, 102, 241, 0.32); }
.wp-1 .b1 { background: rgba(168, 85, 247, 0.45); }
.wp-1 .b2 { background: rgba(236, 72, 153, 0.34); }
.wp-1 .b3 { background: rgba(99, 102, 241, 0.34); }
.wp-2 .b1 { background: rgba(16, 185, 129, 0.42); }
.wp-2 .b2 { background: rgba(45, 212, 191, 0.34); }
.wp-2 .b3 { background: rgba(132, 204, 22, 0.26); }
@keyframes wp-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(6%, 5%) scale(1.12); }
  66% { transform: translate(-5%, -4%) scale(0.92); }
}
.wp-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(120% 100% at 50% 30%, #000 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(120% 100% at 50% 30%, #000 40%, transparent 100%);
}
@media (prefers-reduced-motion: reduce) { .wp-blob { animation: none; } .mac-root { animation: none; } }

/* ---- Desktop shortcuts ---- */
.shortcuts {
  position: absolute; top: 44px; right: 18px; z-index: 1;
  display: flex; flex-direction: column; gap: 14px;
}
.shortcut {
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  width: 88px; padding: 8px 6px; border-radius: 10px; background: transparent;
  transition: background 0.2s ease;
}
.shortcut:hover { background: rgba(56, 189, 248, 0.18); }
.shortcut .lbl { font-size: 12px; color: #fff; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8); }
@media (max-width: 760px) { .shortcuts { display: none; } }
</style>
