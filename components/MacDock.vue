<script setup lang="ts">
import { useWindowsStore, APPS } from '~/stores/windows'

const emit = defineEmits<{ (e: 'open-spotlight'): void }>()
const store = useWindowsStore()

const items = APPS
const els = ref<(HTMLElement | null)[]>([])
const scales = ref<number[]>(items.map(() => 1))
const lifts = ref<number[]>(items.map(() => 0))

const RANGE = 110
const BOOST = 0.85

const onMove = (e: PointerEvent) => {
  els.value.forEach((el, i) => {
    if (!el) return
    const r = el.getBoundingClientRect()
    const center = r.left + r.width / 2
    const d = Math.abs(e.clientX - center)
    const f = Math.max(0, 1 - d / RANGE)
    scales.value[i] = 1 + BOOST * f
    lifts.value[i] = -16 * f
  })
}
const reset = () => {
  scales.value = items.map(() => 1)
  lifts.value = items.map(() => 0)
}

const bouncing = ref<number | null>(null)
const launch = (id: string, i: number) => {
  bouncing.value = i
  window.setTimeout(() => (bouncing.value = null), 600)
  store.openApp(id)
}
</script>

<template>
  <div class="dock-wrap">
    <div class="dock" @pointermove="onMove" @pointerleave="reset">
      <button
        v-for="(app, i) in items"
        :key="app.id"
        :ref="(el) => { els[i] = el as HTMLElement }"
        class="dock-item"
        :class="{ bounce: bouncing === i }"
        :style="{ transform: `translateY(${lifts[i]}px) scale(${scales[i]})` }"
        @click="launch(app.id, i)"
      >
        <span class="tip">{{ app.title }}</span>
        <span class="glyph">{{ app.icon }}</span>
        <span class="run" :class="{ on: store.isOpen(app.id) }" />
      </button>

      <span class="divider" />

      <button
        :ref="(el) => { els[items.length] = el as HTMLElement }"
        class="dock-item"
        :style="{ transform: `translateY(${lifts[items.length] || 0}px) scale(${scales[items.length] || 1})` }"
        @pointermove="onMove"
        @click="emit('open-spotlight')"
      >
        <span class="tip">Spotlight</span>
        <span class="glyph">🔍</span>
      </button>
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
  gap: 6px;
  padding: 8px 10px;
  border-radius: 20px;
  background: rgba(40, 44, 54, 0.45);
  backdrop-filter: blur(28px) saturate(160%);
  -webkit-backdrop-filter: blur(28px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 18px 50px -10px rgba(0, 0, 0, 0.6);
  max-width: 96vw;
  overflow-x: auto;
  scrollbar-width: none;
}
.dock::-webkit-scrollbar { display: none; }
.dock-item {
  position: relative;
  flex: 0 0 auto;
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  transform-origin: bottom center;
  transition: transform 0.12s ease-out;
}
.glyph {
  font-size: 38px;
  line-height: 1;
  filter: drop-shadow(0 5px 8px rgba(0, 0, 0, 0.45));
}
.run {
  position: absolute;
  bottom: -5px; left: 50%;
  width: 4px; height: 4px; border-radius: 50%;
  background: transparent;
  transform: translateX(-50%);
}
.run.on { background: rgba(255, 255, 255, 0.85); }
.divider {
  width: 1px;
  align-self: stretch;
  margin: 6px 4px;
  background: rgba(255, 255, 255, 0.18);
}
.tip {
  position: absolute;
  top: -34px;
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
.bounce { animation: dock-bounce 0.55s ease; }
@keyframes dock-bounce {
  0%, 100% { } /* base transform comes from inline style */
  30% { margin-bottom: 22px; }
  60% { margin-bottom: 6px; }
}
@media (prefers-reduced-motion: reduce) {
  .bounce { animation: none; }
}
</style>
