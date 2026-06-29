<script setup lang="ts">
import { useWindowsStore, APPS } from '~/stores/windows'

const open = defineModel<boolean>({ default: false })
const store = useWindowsStore()
const q = ref('')

const list = computed(() => {
  const s = q.value.trim().toLowerCase()
  return s ? APPS.filter((a) => a.title.toLowerCase().includes(s)) : APPS
})

watch(open, (v) => { if (v) q.value = '' })

const launch = (id: string) => {
  open.value = false
  store.openApp(id)
}
</script>

<template>
  <Transition name="lp">
    <div v-if="open" class="lp" @click.self="open = false">
      <input v-model="q" class="lp-search" type="text" placeholder="Search" spellcheck="false" />
      <div class="grid">
        <button v-for="a in list" :key="a.id" class="cell" @click="launch(a.id)">
          <MacIcon :id="a.id" :size="84" />
          <span>{{ a.title }}</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.lp {
  position: absolute;
  inset: 0;
  z-index: 4500;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8vh;
  background: rgba(10, 14, 22, 0.55);
  backdrop-filter: blur(40px) saturate(140%);
  -webkit-backdrop-filter: blur(40px) saturate(140%);
}
.lp-search {
  width: 260px; padding: 8px 16px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff; text-align: center; outline: none; font-size: 14px;
}
.lp-search::placeholder { color: rgba(255, 255, 255, 0.5); }
.grid {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(4, 140px);
  gap: 34px 48px;
}
.cell {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  color: #fff; font-size: 13px;
  transition: transform 0.18s ease;
}
.cell:hover { transform: scale(1.08); }
.cell span { text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6); }
.lp-enter-active, .lp-leave-active { transition: opacity 0.25s ease; }
.lp-enter-active .grid, .lp-leave-active .grid { transition: transform 0.25s ease; }
.lp-enter-from, .lp-leave-to { opacity: 0; }
.lp-enter-from .grid, .lp-leave-to .grid { transform: scale(1.08); }
@media (max-width: 720px) { .grid { grid-template-columns: repeat(3, 110px); gap: 26px; } }
</style>
