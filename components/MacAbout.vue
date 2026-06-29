<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile, languages, stats } = usePortfolio()
</script>

<template>
  <div class="app about">
    <div class="hero">
      <div class="avatar">HS</div>
      <div>
        <h1>{{ profile.name }}</h1>
        <p class="role">{{ profile.title }}</p>
        <p class="loc">📍 {{ profile.location }}</p>
      </div>
    </div>

    <p class="summary">{{ profile.summary }}</p>

    <div class="chips">
      <span v-for="d in profile.domains" :key="d" class="chip">{{ d }}</span>
    </div>

    <div class="stat-row">
      <div v-for="s in stats" :key="s.label" class="stat">
        <span class="v">{{ s.value }}</span>
        <span class="l">{{ s.label }}</span>
      </div>
    </div>

    <div class="langs">
      <h3>Languages</h3>
      <div v-for="l in languages" :key="l.name" class="lang">
        <span>{{ l.name }}</span><span class="lvl">{{ l.level }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app { padding: 26px 30px 34px; }
.hero { display: flex; gap: 18px; align-items: center; margin-bottom: 20px; }
.avatar {
  width: 76px; height: 76px; border-radius: 20px;
  display: grid; place-items: center; font-weight: 800; font-size: 30px; color: #fff;
  background: linear-gradient(135deg, #0ea5e9, #22d3ee 55%, #94a3b8);
  box-shadow: 0 12px 30px -8px rgba(14, 165, 233, 0.6);
}
h1 { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
.role {
  font-size: 16px; font-weight: 600; margin-top: 2px;
  background: linear-gradient(105deg, #38bdf8, #22d3ee); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.loc { font-size: 13px; color: #9aa0ac; margin-top: 3px; }
.summary { font-size: 15px; line-height: 1.65; color: #c4c9d2; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.chip {
  font-size: 12px; padding: 5px 12px; border-radius: 8px;
  background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); color: #cfd4dd;
}
.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 22px; }
.stat {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 14px 8px; border-radius: 12px;
  background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08);
}
.stat .v {
  font-size: 24px; font-weight: 800;
  background: linear-gradient(105deg, #38bdf8, #22d3ee); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.stat .l { font-size: 11px; color: #8b909c; margin-top: 3px; }
.langs { margin-top: 24px; }
.langs h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: #8b909c; margin-bottom: 10px; }
.lang { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; }
.lvl { color: #9aa0ac; font-size: 13px; }
@media (max-width: 560px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
</style>
