<script setup lang="ts">
import { useWindowsStore, getApp, type WinState } from '~/stores/windows'

const props = defineProps<{ win: WinState }>()
const store = useWindowsStore()

const def = computed(() => getApp(props.win.id))
const isActive = computed(() => store.activeId === props.win.id)

const style = computed(() => ({
  left: props.win.x + 'px',
  top: props.win.y + 'px',
  width: props.win.w + 'px',
  height: props.win.h + 'px',
  zIndex: props.win.z,
  display: props.win.minimized ? 'none' : 'flex',
}))

// ---- Dragging from the title bar ----
const startDrag = (e: PointerEvent) => {
  if (props.win.maximized) return
  store.focus(props.win.id)
  const sx = e.clientX
  const sy = e.clientY
  const ox = props.win.x
  const oy = props.win.y
  const onMove = (ev: PointerEvent) => {
    const nx = ox + ev.clientX - sx
    const ny = Math.max(30, oy + ev.clientY - sy) // keep title under the menu bar
    store.move(props.win.id, nx, ny)
  }
  const onUp = () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
  }
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
}

// ---- Resizing from edges/corners ----
const MINW = 360
const MINH = 240
const startResize = (e: PointerEvent, dir: string) => {
  if (props.win.maximized) return
  e.stopPropagation()
  store.focus(props.win.id)
  const sx = e.clientX
  const sy = e.clientY
  const ox = props.win.x
  const oy = props.win.y
  const ow = props.win.w
  const oh = props.win.h
  const onMove = (ev: PointerEvent) => {
    let x = ox
    let y = oy
    let w = ow
    let h = oh
    const dx = ev.clientX - sx
    const dy = ev.clientY - sy
    if (dir.includes('e')) w = Math.max(MINW, ow + dx)
    if (dir.includes('s')) h = Math.max(MINH, oh + dy)
    if (dir.includes('w')) { const nw = Math.max(MINW, ow - dx); x = ox + (ow - nw); w = nw }
    if (dir.includes('n')) { const nh = Math.max(MINH, oh - dy); y = Math.max(30, oy + (oh - nh)); h = nh }
    store.resize(props.win.id, { x, y, w, h })
  }
  const onUp = () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
  }
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
}
</script>

<template>
  <section
    class="mac-window"
    :class="{ active: isActive, max: win.maximized }"
    :style="style"
    @pointerdown="store.focus(win.id)"
  >
    <header class="titlebar" @pointerdown="startDrag" @dblclick="store.toggleMax(win.id)">
      <div class="lights" @pointerdown.stop>
        <button class="light close" aria-label="Close" @click="store.close(win.id)"><span>✕</span></button>
        <button class="light min" aria-label="Minimize" @click="store.minimize(win.id)"><span>−</span></button>
        <button class="light max" aria-label="Zoom" @click="store.toggleMax(win.id)"><span>+</span></button>
      </div>
      <div class="title">
        <MacIcon :id="win.id" :size="16" />
        <span class="t-text">{{ def?.title }}</span>
      </div>
      <div class="spacer" />
    </header>

    <div class="content">
      <slot />
    </div>

    <template v-if="!win.maximized">
      <span class="rz n" @pointerdown="startResize($event, 'n')" />
      <span class="rz s" @pointerdown="startResize($event, 's')" />
      <span class="rz e" @pointerdown="startResize($event, 'e')" />
      <span class="rz w" @pointerdown="startResize($event, 'w')" />
      <span class="rz ne" @pointerdown="startResize($event, 'ne')" />
      <span class="rz nw" @pointerdown="startResize($event, 'nw')" />
      <span class="rz se" @pointerdown="startResize($event, 'se')" />
      <span class="rz sw" @pointerdown="startResize($event, 'sw')" />
    </template>
  </section>
</template>

<style scoped>
.mac-window {
  position: absolute;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(22, 26, 34, 0.72);
  backdrop-filter: blur(30px) saturate(150%);
  -webkit-backdrop-filter: blur(30px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 30px 80px -12px rgba(0, 0, 0, 0.65),
    0 0 0 0.5px rgba(0, 0, 0, 0.4);
  color: #e9ecf1;
  animation: win-open 0.32s cubic-bezier(0.16, 1, 0.3, 1);
  transition: box-shadow 0.3s ease;
  max-width: 96vw;
}
.mac-window.active {
  box-shadow:
    0 40px 100px -10px rgba(0, 0, 0, 0.75),
    0 0 0 1px rgba(56, 189, 248, 0.25);
}
@keyframes win-open {
  from { opacity: 0; transform: scale(0.94) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.titlebar {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  cursor: default;
  user-select: none;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  flex-shrink: 0;
}
.lights { display: flex; gap: 8px; align-items: center; }
.light {
  width: 13px; height: 13px; border-radius: 50%;
  display: grid; place-items: center;
  font-size: 9px; line-height: 1; color: rgba(0, 0, 0, 0.55);
  border: 0.5px solid rgba(0, 0, 0, 0.2);
}
.light span { opacity: 0; transition: opacity 0.15s ease; font-weight: 700; }
.lights:hover .light span { opacity: 1; }
.light.close { background: #ff5f57; }
.light.min { background: #febc2e; }
.light.max { background: #28c840; }

.title {
  position: absolute;
  left: 0; right: 0;
  display: flex; align-items: center; justify-content: center;
  gap: 7px; pointer-events: none;
  font-size: 13px; font-weight: 600; color: #cfd4dd;
}
.t-ico { font-size: 13px; }
.spacer { flex: 1; }

.content {
  flex: 1;
  overflow: auto;
  position: relative;
}
.content::-webkit-scrollbar { width: 9px; }
.content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.16);
  border-radius: 99px;
  border: 2px solid transparent;
  background-clip: content-box;
}

/* Resize handles */
.rz { position: absolute; z-index: 5; }
.rz.n { top: -3px; left: 8px; right: 8px; height: 7px; cursor: ns-resize; }
.rz.s { bottom: -3px; left: 8px; right: 8px; height: 7px; cursor: ns-resize; }
.rz.e { right: -3px; top: 8px; bottom: 8px; width: 7px; cursor: ew-resize; }
.rz.w { left: -3px; top: 8px; bottom: 8px; width: 7px; cursor: ew-resize; }
.rz.ne { top: -4px; right: -4px; width: 14px; height: 14px; cursor: nesw-resize; }
.rz.nw { top: -4px; left: -4px; width: 14px; height: 14px; cursor: nwse-resize; }
.rz.se { bottom: -4px; right: -4px; width: 14px; height: 14px; cursor: nwse-resize; }
.rz.sw { bottom: -4px; left: -4px; width: 14px; height: 14px; cursor: nesw-resize; }
</style>
