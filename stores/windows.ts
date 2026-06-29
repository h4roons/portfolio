import { defineStore } from 'pinia'

export interface AppDef {
  id: string
  title: string
  icon: string // emoji used in the dock / menu
  component: string // auto-imported component name
  w: number
  h: number
}

export interface WinState {
  id: string
  z: number
  x: number
  y: number
  w: number
  h: number
  minimized: boolean
  maximized: boolean
  // saved geometry while maximized
  prev?: { x: number; y: number; w: number; h: number }
  // launch animation origin (dock icon center), for the genie-ish open
  fromX?: number
  fromY?: number
}

// The "applications" — each maps a portfolio section to a window.
export const APPS: AppDef[] = [
  { id: 'about', title: 'About Me', icon: '👤', component: 'MacAbout', w: 660, h: 470 },
  { id: 'experience', title: 'Experience', icon: '💼', component: 'MacExperience', w: 740, h: 540 },
  { id: 'projects', title: 'Projects', icon: '🗂️', component: 'MacProjects', w: 780, h: 560 },
  { id: 'skills', title: 'Terminal', icon: '🖥️', component: 'MacTerminal', w: 700, h: 460 },
  { id: 'volunteering', title: 'Community', icon: '🤝', component: 'MacCommunity', w: 720, h: 520 },
  { id: 'education', title: 'Education', icon: '🎓', component: 'MacEducation', w: 660, h: 460 },
  { id: 'contact', title: 'Mail', icon: '✉️', component: 'MacContact', w: 660, h: 560 },
  { id: 'resume', title: 'Resume.pdf', icon: '📄', component: 'MacResume', w: 720, h: 780 },
]

export const getApp = (id: string) => APPS.find((a) => a.id === id)

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

export const useWindowsStore = defineStore('windows', {
  state: () => ({
    open: [] as WinState[],
    topZ: 10,
  }),
  getters: {
    isOpen: (s) => (id: string) => s.open.some((w) => w.id === id),
    // active = highest-z non-minimized window
    activeId(s): string | null {
      const vis = s.open.filter((w) => !w.minimized)
      if (!vis.length) return null
      return vis.reduce((a, b) => (a.z > b.z ? a : b)).id
    },
  },
  actions: {
    openApp(id: string, origin?: { x: number; y: number }) {
      const existing = this.open.find((w) => w.id === id)
      if (existing) {
        existing.minimized = false
        this.focus(id)
        return
      }
      const def = getApp(id)
      if (!def) return

      const vw = import.meta.client ? window.innerWidth : 1280
      const vh = import.meta.client ? window.innerHeight : 800
      const w = Math.min(def.w, vw - 32)
      const h = Math.min(def.h, vh - 120)
      const idx = this.open.length % 6
      const x = clamp(Math.round((vw - w) / 2) + idx * 28, 12, Math.max(12, vw - w - 12))
      const y = clamp(Math.round((vh - h) / 2) - 24 + idx * 24, 36, Math.max(36, vh - h - 90))

      this.topZ++
      this.open.push({
        id,
        z: this.topZ,
        x,
        y,
        w,
        h,
        minimized: false,
        maximized: false,
        fromX: origin?.x,
        fromY: origin?.y,
      })
    },
    close(id: string) {
      this.open = this.open.filter((w) => w.id !== id)
    },
    minimize(id: string) {
      const w = this.open.find((x) => x.id === id)
      if (w) w.minimized = true
    },
    focus(id: string) {
      const w = this.open.find((x) => x.id === id)
      if (w) {
        this.topZ++
        w.z = this.topZ
        w.minimized = false
      }
    },
    move(id: string, x: number, y: number) {
      const w = this.open.find((x2) => x2.id === id)
      if (!w || w.maximized) return
      w.x = x
      w.y = y
    },
    resize(id: string, patch: Partial<Pick<WinState, 'x' | 'y' | 'w' | 'h'>>) {
      const w = this.open.find((x2) => x2.id === id)
      if (!w || w.maximized) return
      Object.assign(w, patch)
    },
    toggleMax(id: string) {
      const w = this.open.find((x) => x.id === id)
      if (!w) return
      const vw = import.meta.client ? window.innerWidth : 1280
      const vh = import.meta.client ? window.innerHeight : 800
      if (w.maximized) {
        if (w.prev) Object.assign(w, w.prev)
        w.maximized = false
        w.prev = undefined
      } else {
        w.prev = { x: w.x, y: w.y, w: w.w, h: w.h }
        w.x = 12
        w.y = 36
        w.w = vw - 24
        w.h = vh - 120
        w.maximized = true
      }
      this.focus(id)
    },
  },
})
