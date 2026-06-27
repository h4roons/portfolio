<script setup lang="ts">
// Animated count-up for the stats strip. Parses a string like "200+" into
// prefix / number / suffix and eases the number up when it scrolls into view.
const props = defineProps<{ value: string }>()

const m = props.value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
const prefix = m?.[1] ?? ''
const target = m ? parseFloat(m[2]) : 0
const suffix = m?.[3] ?? ''
const decimals = m && m[2].includes('.') ? m[2].split('.')[1].length : 0
const hasNumber = !!m

const display = ref(hasNumber ? '0' : props.value)
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!import.meta.client || !hasNumber) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    display.value = target.toFixed(decimals)
    return
  }

  const run = () => {
    const duration = 1400
    let startTs = 0
    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const p = Math.min((ts - startTs) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      display.value = (eased * target).toFixed(decimals)
      if (p < 1) requestAnimationFrame(step)
      else display.value = target.toFixed(decimals)
    }
    requestAnimationFrame(step)
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run()
          io.disconnect()
        }
      })
    },
    { threshold: 0.4 }
  )
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <span ref="el">{{ prefix }}{{ display }}{{ suffix }}</span>
</template>
