<script setup lang="ts">
// Ambient ember particles drifting upward behind the content.
// Deterministic config so SSR and client markup match (no hydration mismatch).
const particles = [
  { left: 6, size: 3, delay: 0, dur: 9, x: 14 },
  { left: 14, size: 5, delay: 2.5, dur: 12, x: -10 },
  { left: 22, size: 2, delay: 5, dur: 8, x: 8 },
  { left: 31, size: 4, delay: 1.2, dur: 11, x: -16 },
  { left: 39, size: 6, delay: 3.8, dur: 14, x: 12 },
  { left: 47, size: 3, delay: 6.5, dur: 10, x: -8 },
  { left: 55, size: 4, delay: 0.8, dur: 13, x: 18 },
  { left: 63, size: 2, delay: 4.2, dur: 9, x: -12 },
  { left: 70, size: 5, delay: 2, dur: 12, x: 10 },
  { left: 78, size: 3, delay: 5.6, dur: 8, x: -14 },
  { left: 85, size: 4, delay: 1.6, dur: 11, x: 16 },
  { left: 92, size: 6, delay: 3.2, dur: 15, x: -10 },
  { left: 10, size: 2, delay: 7, dur: 10, x: 12 },
  { left: 50, size: 3, delay: 8.2, dur: 13, x: -18 },
  { left: 36, size: 5, delay: 6, dur: 12, x: 14 },
  { left: 67, size: 2, delay: 9, dur: 9, x: -8 },
]
</script>

<template>
  <div class="ember-layer" aria-hidden="true">
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="ember"
      :style="{
        left: p.left + '%',
        width: p.size + 'px',
        height: p.size + 'px',
        '--ex': p.x + 'px',
        animationDelay: p.delay + 's',
        animationDuration: p.dur + 's',
      }"
    />
  </div>
</template>

<style scoped>
.ember-layer {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}
.ember {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  background: rgb(var(--acc-1));
  box-shadow: 0 0 8px 1px rgb(var(--acc-1) / 0.8), 0 0 16px 3px rgb(var(--acc-2) / 0.5);
  animation-name: ember-rise;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}
@media (prefers-reduced-motion: reduce) {
  .ember-layer { display: none; }
}
</style>
