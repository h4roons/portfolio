<script setup lang="ts">
interface Item { id: string; label: string; divider?: boolean }
const props = defineProps<{ x: number; y: number; items: Item[] }>()
const show = defineModel<boolean>({ default: false })
const emit = defineEmits<{ (e: 'select', id: string): void }>()

const pick = (it: Item) => {
  show.value = false
  emit('select', it.id)
}
</script>

<template>
  <Transition name="cm">
    <div v-if="show" class="cm-overlay" @pointerdown.self="show = false" @contextmenu.prevent="show = false">
      <ul class="cm" :style="{ left: x + 'px', top: y + 'px' }">
        <template v-for="it in items" :key="it.id">
          <li v-if="it.divider" class="sep" />
          <li v-else @click="pick(it)">{{ it.label }}</li>
        </template>
      </ul>
    </div>
  </Transition>
</template>

<style scoped>
.cm-overlay { position: absolute; inset: 0; z-index: 6000; }
.cm {
  position: absolute;
  min-width: 210px;
  padding: 6px;
  border-radius: 10px;
  background: rgba(40, 44, 54, 0.85);
  backdrop-filter: blur(30px) saturate(170%);
  -webkit-backdrop-filter: blur(30px) saturate(170%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.6);
  color: #eef1f5;
  font-size: 13px;
}
.cm li {
  padding: 6px 12px;
  border-radius: 6px;
  cursor: default;
}
.cm li:hover:not(.sep) {
  background: linear-gradient(115deg, #0a84ff, #34c0ff);
  color: #fff;
}
.cm .sep { height: 1px; margin: 5px 8px; background: rgba(255, 255, 255, 0.12); padding: 0; }
.cm-enter-active, .cm-leave-active { transition: opacity 0.12s ease; }
.cm-enter-active .cm, .cm-leave-active .cm { transition: transform 0.12s ease; transform-origin: top left; }
.cm-enter-from, .cm-leave-to { opacity: 0; }
.cm-enter-from .cm, .cm-leave-to .cm { transform: scale(0.95); }
</style>
