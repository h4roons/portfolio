<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { experience } = usePortfolio()
</script>

<template>
  <div class="app">
    <ol class="timeline">
      <li v-for="job in experience" :key="job.company">
        <span class="node" :class="{ live: job.current }" />
        <div class="card">
          <div class="head">
            <div>
              <h3>{{ job.role }}</h3>
              <p class="co">{{ job.company }} · <span class="muted">{{ job.location }}</span></p>
            </div>
            <span class="period" :class="{ now: job.current }">{{ job.period }}</span>
          </div>
          <ul class="bullets">
            <li v-for="c in job.contributions" :key="c">{{ c }}</li>
          </ul>
          <div class="stack">
            <span v-for="t in job.stack" :key="t">{{ t }}</span>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.app { padding: 24px 28px 30px; }
.timeline { position: relative; padding-left: 22px; }
.timeline::before { content: ''; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 1px; background: rgba(255, 255, 255, 0.12); }
.timeline li { position: relative; margin-bottom: 18px; }
.node {
  position: absolute; left: -22px; top: 6px;
  width: 11px; height: 11px; border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #22d3ee);
  box-shadow: 0 0 0 3px rgba(22, 26, 34, 0.9);
}
.node.live { animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100% { box-shadow: 0 0 0 3px rgba(22,26,34,0.9), 0 0 0 5px rgba(34,211,238,0.4); } 50% { box-shadow: 0 0 0 3px rgba(22,26,34,0.9), 0 0 10px 5px rgba(34,211,238,0.15); } }
.card { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 14px 16px; }
.head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
h3 { font-size: 15px; font-weight: 700; }
.co { font-size: 13px; color: #c4c9d2; margin-top: 2px; }
.muted { color: #8b909c; }
.period { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #9aa0ac; white-space: nowrap; }
.period.now { color: #22d3ee; }
.bullets { margin: 10px 0 0; padding-left: 16px; }
.bullets li { font-size: 13px; color: #b3b8c2; line-height: 1.55; list-style: disc; margin-bottom: 4px; }
.stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 11px; }
.stack span { font-size: 11px; font-family: 'JetBrains Mono', monospace; padding: 3px 8px; border-radius: 6px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.09); color: #aeb3bd; }
</style>
