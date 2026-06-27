<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { volunteering } = usePortfolio()
</script>

<template>
  <div class="app">
    <article v-for="v in volunteering" :key="v.organization" class="card">
      <div class="head">
        <div>
          <h3>{{ v.role }}</h3>
          <p class="org">{{ v.organization }} · <span class="muted">{{ v.location }}</span></p>
        </div>
        <span class="period">{{ v.period }}</span>
      </div>
      <ul>
        <li v-for="c in v.contributions" :key="c">{{ c }}</li>
      </ul>
    </article>
  </div>
</template>

<style scoped>
.app { padding: 24px 28px 30px; display: flex; flex-direction: column; gap: 14px; }
.card { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 15px 17px; }
.head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
h3 { font-size: 15px; font-weight: 700; }
.org { font-size: 13px; color: #c4c9d2; margin-top: 2px; }
.muted { color: #8b909c; }
.period { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #9aa0ac; white-space: nowrap; }
ul { margin: 10px 0 0; padding-left: 16px; }
li { font-size: 13px; color: #b3b8c2; line-height: 1.55; list-style: disc; margin-bottom: 4px; }
</style>
