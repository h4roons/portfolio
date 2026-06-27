<script setup lang="ts">
import { useWindowsStore, APPS } from '~/stores/windows'

const open = defineModel<boolean>({ default: false })
const store = useWindowsStore()

const query = ref('')
const sel = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

// Apps + a couple of external quick actions
const actions = [
  ...APPS.map((a) => ({ id: a.id, title: a.title, icon: a.icon, type: 'app' as const })),
  { id: 'linkedin', title: 'Open LinkedIn', icon: '🔗', type: 'link' as const, href: 'https://www.linkedin.com/in/h4roons/' },
  { id: 'github', title: 'Open GitHub', icon: '🐙', type: 'link' as const, href: 'https://github.com/h4roons' },
]

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return actions
  return actions.filter((a) => a.title.toLowerCase().includes(q))
})

watch(open, (v) => {
  if (v) {
    query.value = ''
    sel.value = 0
    nextTick(() => inputEl.value?.focus())
  }
})
watch(results, () => (sel.value = 0))

const run = (a: (typeof actions)[number]) => {
  open.value = false
  if (a.type === 'link' && 'href' in a) window.open(a.href, '_blank', 'noopener')
  else store.openApp(a.id)
}

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); sel.value = (sel.value + 1) % results.value.length }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel.value = (sel.value - 1 + results.value.length) % results.value.length }
  else if (e.key === 'Enter') { const a = results.value[sel.value]; if (a) run(a) }
}
</script>

<template>
  <Transition name="spot">
    <div v-if="open" class="spot-overlay" @click.self="open = false">
      <div class="spot">
        <div class="spot-head">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            ref="inputEl"
            v-model="query"
            type="text"
            placeholder="Spotlight Search"
            spellcheck="false"
            @keydown="onKey"
          />
        </div>
        <ul v-if="results.length" class="spot-list">
          <li
            v-for="(a, i) in results"
            :key="a.id"
            :class="{ sel: i === sel }"
            @mouseenter="sel = i"
            @click="run(a)"
          >
            <span class="r-ico">{{ a.icon }}</span>
            <span class="r-title">{{ a.title }}</span>
            <span class="r-kind">{{ a.type === 'link' ? 'Link' : 'Application' }}</span>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.spot-overlay {
  position: absolute;
  inset: 0;
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 16vh;
  background: rgba(0, 0, 0, 0.25);
}
.spot {
  width: min(92vw, 620px);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(30, 34, 42, 0.78);
  backdrop-filter: blur(34px) saturate(170%);
  -webkit-backdrop-filter: blur(34px) saturate(170%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 40px 100px -10px rgba(0, 0, 0, 0.7);
  color: #e9ecf1;
}
.spot-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
}
.spot-head input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 22px;
  font-weight: 400;
}
.spot-head input::placeholder { color: rgba(255, 255, 255, 0.4); }
.spot-list {
  max-height: 50vh;
  overflow: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 6px;
}
.spot-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border-radius: 9px;
  cursor: pointer;
}
.spot-list li.sel { background: linear-gradient(115deg, rgba(14, 165, 233, 0.85), rgba(34, 211, 238, 0.7)); }
.r-ico { font-size: 22px; }
.r-title { flex: 1; font-size: 15px; font-weight: 500; }
.r-kind { font-size: 12px; opacity: 0.6; }

.spot-enter-active, .spot-leave-active { transition: opacity 0.2s ease; }
.spot-enter-active .spot, .spot-leave-active .spot { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1); }
.spot-enter-from, .spot-leave-to { opacity: 0; }
.spot-enter-from .spot, .spot-leave-to .spot { transform: scale(0.96) translateY(-8px); }
</style>
