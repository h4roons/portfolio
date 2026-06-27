<script setup lang="ts">
// Thin gradient bar at the very top showing read progress.
const progress = ref(0)

const onScroll = () => {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  progress.value = max > 0 ? (h.scrollTop / max) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="fixed top-0 inset-x-0 z-[60] h-[3px] pointer-events-none">
    <div
      class="h-full grad-bg origin-left rounded-r-full"
      :style="{ width: progress + '%' }"
    />
  </div>
</template>
