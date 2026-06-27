<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { education, certifications } = usePortfolio()
</script>

<template>
  <div class="app">
    <div v-for="edu in education" :key="edu.institution" class="card edu">
      <span class="cap">🎓</span>
      <div>
        <h3>{{ edu.degree }}</h3>
        <p class="inst">{{ edu.institution }} · <span class="muted">{{ edu.period }}</span></p>
        <p class="detail">{{ edu.detail }}</p>
      </div>
    </div>

    <h4>Certifications &amp; Training</h4>
    <div class="certs">
      <div v-for="c in certifications" :key="c.name" class="cert">
        <span class="badge">✦</span>
        <div>
          <span class="name">{{ c.name }}</span>
          <span class="issuer">{{ c.issuer }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app { padding: 24px 28px 30px; }
.card { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px 18px; }
.edu { display: flex; gap: 16px; align-items: flex-start; }
.cap { font-size: 34px; }
h3 { font-size: 17px; font-weight: 800; }
.inst { font-size: 13px; color: #c4c9d2; margin-top: 3px; }
.muted { color: #8b909c; }
.detail { font-size: 13px; color: #9aa0ac; margin-top: 8px; line-height: 1.5; }
h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: #8b909c; margin: 22px 0 12px; }
.certs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.cert { display: flex; gap: 12px; align-items: flex-start; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 11px; padding: 12px 14px; }
.badge { color: #22d3ee; font-size: 16px; }
.name { display: block; font-size: 14px; font-weight: 600; }
.issuer { display: block; font-size: 12px; color: #8b909c; margin-top: 2px; }
@media (max-width: 560px) { .certs { grid-template-columns: 1fr; } }
</style>
