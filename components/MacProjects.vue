<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { projects } = usePortfolio()
</script>

<template>
  <div class="app">
    <div class="grid">
      <article v-for="p in projects" :key="p.name" class="card">
        <div class="top">
          <span class="cat">{{ p.category }}</span>
          <a v-if="p.repo" :href="p.repo" target="_blank" rel="noopener" class="repo" aria-label="Open repository">↗</a>
        </div>
        <h3>{{ p.name }}</h3>
        <p class="role">{{ p.role }}</p>
        <p class="desc">{{ p.description }}</p>
        <ul class="hl">
          <li v-for="h in p.highlights" :key="h">{{ h }}</li>
        </ul>
        <div class="tags">
          <span v-for="t in p.tags" :key="t">{{ t }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.app { padding: 22px 24px 28px; }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px 17px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  border-color: rgba(34, 211, 238, 0.4);
  box-shadow: 0 14px 40px -12px rgba(14, 165, 233, 0.5);
}
.top { display: flex; justify-content: space-between; align-items: center; }
.cat { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #8b909c; }
.repo { font-size: 18px; color: #22d3ee; text-decoration: none; }
h3 { font-size: 18px; font-weight: 800; margin-top: 6px; }
.role { font-size: 12px; color: #8b909c; margin-top: 1px; }
.desc { font-size: 13px; color: #b3b8c2; line-height: 1.55; margin-top: 9px; }
.hl { margin: 10px 0 0; padding: 0; list-style: none; }
.hl li { font-size: 12px; color: #9aa0ac; padding-left: 14px; position: relative; margin-bottom: 4px; }
.hl li::before { content: '→'; position: absolute; left: 0; color: #22d3ee; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 11px; }
.tags span { font-size: 11px; font-family: 'JetBrains Mono', monospace; padding: 3px 8px; border-radius: 6px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.09); color: #aeb3bd; }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
</style>
