<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile, skillCategories } = usePortfolio()

const PROMPT = 'haroon@portfolio ~ %'

const skillLines = skillCategories.map(
  (c) => `  ${c.name.padEnd(22)} ${c.skills.join(', ')}`
)

const script: { cmd: string; out: string[] }[] = [
  { cmd: 'whoami', out: [`${profile.name} — ${profile.title}`] },
  { cmd: 'cat stack.txt', out: skillLines },
  { cmd: 'echo $CONTACT', out: [profile.email, 'linkedin.com/in/h4roons', 'github.com/h4roons'] },
]

const lines = ref<{ kind: 'cmd' | 'out'; text: string }[]>([])
const done = ref(false)
let alive = true
onBeforeUnmount(() => (alive = false))

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Render everything at once
    for (const e of script) {
      lines.value.push({ kind: 'cmd', text: e.cmd })
      e.out.forEach((o) => lines.value.push({ kind: 'out', text: o }))
    }
    done.value = true
    return
  }

  await sleep(400)
  for (const e of script) {
    if (!alive) return
    const idx = lines.value.push({ kind: 'cmd', text: '' }) - 1
    for (const ch of e.cmd) {
      if (!alive) return
      lines.value[idx].text += ch
      await sleep(42)
    }
    await sleep(220)
    for (const o of e.out) {
      if (!alive) return
      lines.value.push({ kind: 'out', text: o })
      await sleep(70)
    }
    await sleep(360)
  }
  done.value = true
})
</script>

<template>
  <div class="term">
    <div v-for="(l, i) in lines" :key="i" class="line" :class="l.kind">
      <template v-if="l.kind === 'cmd'">
        <span class="prompt">{{ PROMPT }}</span> <span class="cmd">{{ l.text }}</span>
      </template>
      <template v-else>{{ l.text }}</template>
    </div>
    <div class="line cmd">
      <span class="prompt">{{ PROMPT }}</span> <span class="caret">▋</span>
    </div>
  </div>
</template>

<style scoped>
.term {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  line-height: 1.7;
  padding: 18px 20px;
  color: #d6dae1;
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 100%;
  background:
    radial-gradient(120% 80% at 0% 0%, rgba(14, 165, 233, 0.06), transparent 60%);
}
.prompt { color: #22d3ee; }
.cmd { color: #fff; }
.out { color: #9aa0ac; }
.caret { animation: blink 1s steps(1) infinite; color: #22d3ee; }
@keyframes blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .caret { animation: none; } }
</style>
