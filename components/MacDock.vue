<script setup lang="ts">
import { useWindowsStore, APPS } from '~/stores/windows'

const emit = defineEmits<{ (e: 'open-spotlight'): void; (e: 'open-launchpad'): void }>()
const store = useWindowsStore()

// Dock entries = Launchpad + apps + a trailing Spotlight launcher
const entries = [
  { id: '__launchpad', title: 'Launchpad', icon: '🚀', kind: 'launchpad' as const },
  ...APPS.map((a) => ({ id: a.id, title: a.title, icon: a.icon, kind: 'app' as const })),
  { id: '__spotlight', title: 'Spotlight', icon: '🔍', kind: 'spotlight' as const },
]

const BASE = 48 // resting icon box width (px)
const MAX = 96 // magnified width
const RANGE = 130 // px of cursor influence on each side
const EXTRA = MAX - BASE

const els: (HTMLElement | null)[] = []
const centers: number[] = [] // resting center-x of each icon (viewport coords)
const widths = ref<number[]>(entries.map(() => BASE))

const setEl = (el: Element | null, i: number) => {
  els[i] = el as HTMLElement | null
}

const measure = () => {
  // Measure at rest so magnification never feeds back on itself
  els.forEach((el, i) => {
    if (!el) return
    const r = el.getBoundingClientRect()
    centers[i] = r.left + r.width / 2
  })
}

const onMove = (e: PointerEvent) => {
  widths.value = centers.map((cx) => {
    const d = Math.abs(e.clientX - cx)
    if (d >= RANGE) return BASE
    // smooth cosine falloff: 1 at the cursor, 0 at RANGE
    const f = (Math.cos((d / RANGE) * Math.PI) + 1) / 2
    return BASE + EXTRA * f
  })
}
const reset = () => {
  widths.value = entries.map(() => BASE)
}

const bouncing = ref<number | null>(null)
const activate = (entry: (typeof entries)[number], i: number) => {
  if (entry.kind === 'spotlight') return emit('open-spotlight')
  if (entry.kind === 'launchpad') return emit('open-launchpad')
  bouncing.value = i
  window.setTimeout(() => (bouncing.value = null), 600)
  store.openApp(entry.id)
}
const iconId = (entry: (typeof entries)[number]) =>
  entry.kind === 'app' ? entry.id : entry.kind

onMounted(() => {
  requestAnimationFrame(measure)
  window.addEventListener('resize', () => {
    reset()
    requestAnimationFrame(measure)
  })
})
</script>

<template>
  <div class="dock-wrap">
    <div class="dock" @pointermove="onMove" @pointerleave="reset">
      <template v-for="(entry, i) in entries" :key="entry.id">
        <span v-if="entry.kind === 'spotlight'" class="divider" />
        <button
          :ref="(el) => setEl(el, i)"
          class="dock-item"
          :class="{ bounce: bouncing === i }"
          :style="{ width: widths[i] + 'px' }"
          @click="activate(entry, i)"
        >
          <span class="tip">{{ entry.title }}</span>
          <span
            class="glyph"
            :style="{
              transform: `translateY(${-(widths[i] - BASE) * 0.18}px) scale(${widths[i] / BASE})`,
            }"
          >
            <MacIcon :id="iconId(entry)" :size="40" />
          </span>
          <span
            v-if="entry.kind === 'app'"
            class="run"
            :class="{ on: store.isOpen(entry.id) }"
          />
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.dock-wrap {
  position: absolute;
  bottom: 8px;
  inset-inline: 0;
  z-index: 3500;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.dock {
  pointer-events: auto;
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 20px;
  background: rgba(40, 44, 54, 0.45);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 18px 50px -10px rgba(0, 0, 0, 0.6);
  max-width: 98vw;
  /* overflow MUST stay visible so magnified icons can rise above the dock */
  overflow: visible;
}
.dock-item {
  position: relative;
  flex: 0 0 auto;
  height: 48px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  /* width is animated inline; transition keeps it buttery */
  transition: width 0.16s cubic-bezier(0.22, 1, 0.36, 1);
}
.glyph {
  display: block;
  transform-origin: bottom center;
  transition: transform 0.16s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.run {
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: transparent;
  transform: translateX(-50%);
}
.run.on { background: rgba(255, 255, 255, 0.85); }
.divider {
  width: 1px;
  align-self: stretch;
  margin: 6px 5px;
  background: rgba(255, 255, 255, 0.18);
}
.tip {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  white-space: nowrap;
  font-size: 12px;
  color: #fff;
  background: rgba(30, 34, 42, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 4px 9px;
  border-radius: 7px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dock-item:hover .tip { opacity: 1; transform: translateX(-50%) translateY(0); }
.bounce { animation: dock-bounce 0.6s ease; }
@keyframes dock-bounce {
  0%, 100% { margin-bottom: 0; }
  35% { margin-bottom: 26px; }
  65% { margin-bottom: 8px; }
}
@media (prefers-reduced-motion: reduce) {
  .bounce { animation: none; }
  .dock-item, .glyph { transition: none; }
}
</style>
