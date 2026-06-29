<script setup lang="ts">
import { useWindowsStore, getApp } from '~/stores/windows'

const emit = defineEmits<{
  (e: 'open-spotlight'): void
  (e: 'open-launchpad'): void
}>()
const store = useWindowsStore()

// Where the classic scroll-site lives (see DEPLOY-macos.md).
const CLASSIC_URL = '/'
const appleOpen = ref(false)

const appName = computed(() => {
  const id = store.activeId
  return id ? getApp(id)?.title ?? 'Finder' : 'Finder'
})

const menus = ['File', 'Edit', 'View', 'Window', 'Help']

const now = ref(new Date(2026, 0, 1)) // SSR-stable placeholder; replaced on client
const clock = computed(() =>
  now.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
)
const day = computed(() =>
  now.value.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
)

let timer: number | undefined
onMounted(() => {
  now.value = new Date()
  timer = window.setInterval(() => (now.value = new Date()), 10000)
})
onBeforeUnmount(() => window.clearInterval(timer))

const pick = (action: string) => {
  appleOpen.value = false
  if (action === 'about') store.openApp('about')
  else if (action === 'launchpad') emit('open-launchpad')
  else if (action === 'classic') window.location.href = CLASSIC_URL
}
</script>

<template>
  <div class="menubar">
    <div class="left">
      <div class="apple-wrap">
        <button class="apple" aria-label="Apple menu" @click="appleOpen = !appleOpen">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.45-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.29-1.61 2.8-.41 6.94 1.16 9.21.77 1.11 1.68 2.36 2.88 2.31 1.16-.05 1.6-.75 3-.75s1.79.75 3.01.72c1.24-.02 2.03-1.13 2.79-2.25.88-1.29 1.24-2.54 1.26-2.6-.03-.01-2.42-.93-2.45-3.68zM14.13 5.86c.64-.78 1.07-1.85.95-2.93-.92.04-2.04.61-2.7 1.39-.59.69-1.11 1.8-.97 2.85 1.03.08 2.08-.52 2.72-1.31z"/></svg>
        </button>
        <div v-if="appleOpen" class="dropdown-overlay" @click="appleOpen = false">
          <ul class="dropdown" @click.stop>
            <li @click="pick('about')">About This Developer</li>
            <li @click="pick('launchpad')">Open Launchpad</li>
            <li class="sep" />
            <li @click="pick('classic')">Switch to Classic Site →</li>
          </ul>
        </div>
      </div>
      <span class="app-name">{{ appName }}</span>
      <span v-for="m in menus" :key="m" class="menu-item">{{ m }}</span>
    </div>

    <div class="right">
      <button class="status" aria-label="Spotlight" @click="emit('open-spotlight')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      </button>
      <!-- battery -->
      <svg class="glyph" width="24" height="15" viewBox="0 0 26 14" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="3" width="20" height="8" rx="2.2"/><rect x="2.5" y="4.5" width="13" height="5" rx="1" fill="currentColor" stroke="none"/><path d="M23 5.5v3" stroke-linecap="round"/></svg>
      <!-- wifi -->
      <svg class="glyph" width="16" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 12.5a9 9 0 0 1 13 0l-1.8 1.8a6.4 6.4 0 0 0-9.4 0zM2 9a14 14 0 0 1 20 0l-1.8 1.8a11.4 11.4 0 0 0-16.4 0z"/></svg>
      <span class="clock">{{ day }}&nbsp;&nbsp;{{ clock }}</span>
    </div>
  </div>
</template>

<style scoped>
.menubar {
  position: absolute;
  top: 0;
  inset-inline: 0;
  z-index: 4000;
  height: 28px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 13px;
  background: rgba(20, 24, 32, 0.45);
  backdrop-filter: blur(22px) saturate(160%);
  -webkit-backdrop-filter: blur(22px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.left, .right { display: flex; align-items: center; gap: 16px; }
.left { gap: 18px; }
.apple-wrap { position: relative; display: flex; }
.apple { display: grid; place-items: center; opacity: 0.95; }
.apple:hover { opacity: 1; }
.dropdown-overlay { position: fixed; inset: 0; z-index: 5000; }
.dropdown {
  position: absolute; top: 26px; left: 6px; min-width: 230px;
  padding: 6px; border-radius: 10px;
  background: rgba(40, 44, 54, 0.9);
  backdrop-filter: blur(30px) saturate(170%); -webkit-backdrop-filter: blur(30px) saturate(170%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.6);
  font-size: 13px; text-shadow: none;
}
.dropdown li { padding: 6px 12px; border-radius: 6px; }
.dropdown li:hover:not(.sep) { background: linear-gradient(115deg, #0a84ff, #34c0ff); }
.dropdown .sep { height: 1px; margin: 5px 8px; padding: 0; background: rgba(255, 255, 255, 0.12); }
.app-name { font-weight: 700; }
.menu-item { opacity: 0.85; font-weight: 500; }
.menu-item:hover { opacity: 1; }
.status { display: grid; place-items: center; }
.glyph { opacity: 0.95; }
.clock { font-variant-numeric: tabular-nums; font-weight: 500; }
@media (max-width: 720px) {
  .menu-item { display: none; }
}
@media (max-width: 480px) {
  .glyph { display: none; }
}
</style>
