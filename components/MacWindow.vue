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
        <span class="t-ico">{{ def?.icon }}</span>
        <span class="t-text">{{ def?.title }}</span>
      </div>
      <div class="spacer" />
    </header>

    <div class="content">
      <slot />
    </div>
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
</style>
