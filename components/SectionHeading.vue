<script setup lang="ts">
defineProps<{ index: string; eyebrow: string; title: string }>()
</script>

<template>
  <div class="mb-12 md:mb-16" v-reveal>
    <div class="flex items-center gap-3 mb-4">
      <span class="font-mono text-xs px-2 py-1 rounded-md grad-bg text-white font-semibold">{{ index }}</span>
      <span class="h-px w-12 grad-bg rounded-full" />
      <span class="font-mono text-xs uppercase tracking-[0.22em] text-faint-c">{{ eyebrow }}</span>
    </div>
    <h2 class="font-display text-3xl md:text-5xl font-bold tracking-tightest text-base-c">
      {{ title }}
    </h2>
  </div>
</template>
