<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile } = usePortfolio()
</script>

<template>
  <div class="preview">
    <div class="bar">
      <span>{{ profile.resumeFile.replace('/', '') }}</span>
      <a :href="profile.resumeFile" download class="dl">⤓ Download</a>
    </div>
    <iframe :src="profile.resumeFile + '#toolbar=0'" title="Resume" />
  </div>
</template>

<style scoped>
.preview { display: flex; flex-direction: column; height: 100%; background: #4a4f57; }
.bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 14px; font-size: 12px; color: #d6dae1;
  background: rgba(0, 0, 0, 0.25); border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.dl { color: #22d3ee; text-decoration: none; font-weight: 600; }
.dl:hover { text-decoration: underline; }
iframe { flex: 1; width: 100%; border: 0; background: #fff; }
</style>
