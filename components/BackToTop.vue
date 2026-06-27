<script setup lang="ts">
// Floating back-to-top button, appears after scrolling down.
const show = ref(false)

const onScroll = () => {
  show.value = window.scrollY > 700
}
const toTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="btt">
    <button
      v-if="show"
      @click="toTop"
      aria-label="Back to top"
      class="fixed bottom-6 right-6 z-[60] grid place-items-center w-11 h-11 rounded-xl glass-strong glass-hover text-base-c"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  </Transition>
</template>

<style scoped>
.btt-enter-active,
.btt-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.85);
}
</style>
