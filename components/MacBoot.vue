<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile } = usePortfolio()

const emit = defineEmits<{ (e: 'done'): void }>()

const phase = ref<'boot' | 'login'>('boot')
const progress = ref(0)
const pwd = ref('')

let raf = 0
const finishBoot = () => {
  phase.value = 'login'
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  // ?nologin jumps straight to the desktop; ?login jumps to the lock screen
  if (params.has('nologin')) {
    sessionStorage.setItem('mac-booted', '1')
    emit('done')
    return
  }
  if (params.has('login')) {
    phase.value = 'login'
    return
  }
  // Skip the whole intro if we've already booted this session
  if (sessionStorage.getItem('mac-booted')) {
    emit('done')
    return
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    phase.value = 'login'
    return
  }
  const start = performance.now()
  const DUR = 1700
  const tick = (t: number) => {
    const p = Math.min((t - start) / DUR, 1)
    progress.value = p * 100
    if (p < 1) raf = requestAnimationFrame(tick)
    else window.setTimeout(finishBoot, 200)
  }
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))

const login = () => {
  sessionStorage.setItem('mac-booted', '1')
  emit('done')
}
</script>

<template>
  <div class="boot-root">
    <!-- BOOT -->
    <div v-if="phase === 'boot'" class="boot">
      <svg width="78" height="78" viewBox="0 0 24 24" fill="#fff"><path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.45-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.29-1.61 2.8-.41 6.94 1.16 9.21.77 1.11 1.68 2.36 2.88 2.31 1.16-.05 1.6-.75 3-.75s1.79.75 3.01.72c1.24-.02 2.03-1.13 2.79-2.25.88-1.29 1.24-2.54 1.26-2.6-.03-.01-2.42-.93-2.45-3.68zM14.13 5.86c.64-.78 1.07-1.85.95-2.93-.92.04-2.04.61-2.7 1.39-.59.69-1.11 1.8-.97 2.85 1.03.08 2.08-.52 2.72-1.31z"/></svg>
      <div class="bar"><span :style="{ width: progress + '%' }" /></div>
    </div>

    <!-- LOGIN -->
    <div v-else class="login">
      <div class="clock-big">{{ new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) }}</div>
      <div class="avatar">HS</div>
      <h2>{{ profile.shortName }}</h2>
      <form class="pw" @submit.prevent="login">
        <input
          v-model="pwd"
          type="password"
          placeholder="Enter Password"
          autofocus
        />
        <button type="submit" aria-label="Log in">→</button>
      </form>
      <p class="hint">Press Enter to log in</p>
    </div>
  </div>
</template>

<style scoped>
.boot-root {
  position: fixed;
  inset: 0;
  z-index: 9000;
  display: grid;
  place-items: center;
  background:
    radial-gradient(120% 100% at 50% 0%, #0b1220 0%, #06080d 100%);
  color: #fff;
}
.boot { display: flex; flex-direction: column; align-items: center; gap: 44px; }
.bar { width: 200px; height: 5px; border-radius: 99px; background: rgba(255, 255, 255, 0.18); overflow: hidden; }
.bar span { display: block; height: 100%; background: #fff; border-radius: 99px; transition: width 0.1s linear; }

.login {
  display: flex; flex-direction: column; align-items: center;
  animation: fade 0.5s ease;
}
.clock-big { position: absolute; top: 8vh; font-size: 64px; font-weight: 600; letter-spacing: -0.02em; opacity: 0.95; }
.avatar {
  width: 110px; height: 110px; border-radius: 50%;
  display: grid; place-items: center; font-size: 40px; font-weight: 800; color: #fff;
  background: linear-gradient(135deg, #0ea5e9, #22d3ee 55%, #94a3b8);
  box-shadow: 0 16px 40px -10px rgba(14, 165, 233, 0.6);
}
h2 { margin-top: 18px; font-size: 24px; font-weight: 600; }
.pw { display: flex; align-items: center; gap: 8px; margin-top: 18px; }
.pw input {
  width: 220px; padding: 9px 14px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff; font-size: 14px; outline: none; text-align: center;
  backdrop-filter: blur(10px);
}
.pw input::placeholder { color: rgba(255, 255, 255, 0.5); }
.pw button {
  width: 34px; height: 34px; border-radius: 50%;
  background: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff; font-size: 17px;
}
.pw button:hover { background: rgba(255, 255, 255, 0.3); }
.hint { margin-top: 16px; font-size: 13px; color: rgba(255, 255, 255, 0.55); }
@keyframes fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
</style>
