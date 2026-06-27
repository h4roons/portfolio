<script setup lang="ts">
import { APPS, getApp } from '~/stores/windows'
import MacAbout from '~/components/MacAbout.vue'
import MacExperience from '~/components/MacExperience.vue'
import MacProjects from '~/components/MacProjects.vue'
import MacTerminal from '~/components/MacTerminal.vue'
import MacCommunity from '~/components/MacCommunity.vue'
import MacEducation from '~/components/MacEducation.vue'
import MacContact from '~/components/MacContact.vue'
import MacResume from '~/components/MacResume.vue'

const registry: Record<string, any> = {
  about: MacAbout, experience: MacExperience, projects: MacProjects, skills: MacTerminal,
  volunteering: MacCommunity, education: MacEducation, contact: MacContact, resume: MacResume,
}

const active = ref<string | null>(null)
const time = ref('')
let t: number | undefined
onMounted(() => {
  const upd = () => (time.value = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }))
  upd()
  t = window.setInterval(upd, 10000)
})
onBeforeUnmount(() => window.clearInterval(t))

const dock = ['about', 'projects', 'contact', 'resume']
const grid = APPS.map((a) => a.id)
</script>

<template>
  <div class="ios">
    <div class="wallpaper" aria-hidden="true"><span class="b1" /><span class="b2" /></div>

    <div class="statusbar">
      <span>{{ time }}</span>
      <span class="right">📶 &nbsp;🔋</span>
    </div>

    <div class="springboard">
      <button v-for="id in grid" :key="id" class="app" @click="active = id">
        <MacIcon :id="id" :size="62" />
        <span>{{ getApp(id)?.title }}</span>
      </button>
    </div>

    <div class="home-dock">
      <button v-for="id in dock" :key="id" class="app" @click="active = id">
        <MacIcon :id="id" :size="58" />
      </button>
    </div>

    <!-- App sheet -->
    <Transition name="sheet">
      <div v-if="active" class="sheet">
        <div class="sheet-bar">
          <MacIcon :id="active" :size="22" />
          <span class="title">{{ getApp(active)?.title }}</span>
          <button class="done" @click="active = null">Done</button>
        </div>
        <div class="sheet-body">
          <component :is="registry[active]" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.ios {
  position: fixed; inset: 0; overflow: hidden; color: #fff;
  font-family: -apple-system, 'SF Pro Display', 'Inter', system-ui, sans-serif;
  background: radial-gradient(120% 90% at 50% 0%, #0b1220, #06080d);
}
.wallpaper { position: absolute; inset: 0; z-index: 0; }
.wallpaper span { position: absolute; border-radius: 50%; filter: blur(70px); }
.b1 { width: 80vw; height: 80vw; top: -20%; left: -20%; background: rgba(14, 165, 233, 0.45); }
.b2 { width: 70vw; height: 70vw; bottom: -10%; right: -20%; background: rgba(34, 211, 238, 0.3); }
.statusbar {
  position: relative; z-index: 1;
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 24px 4px; font-size: 14px; font-weight: 600;
}
.springboard {
  position: relative; z-index: 1; box-sizing: border-box; width: 100%;
  display: flex; flex-wrap: wrap; justify-content: center; align-content: flex-start;
  row-gap: 24px; padding: 28px 8px;
}
.app {
  flex: 0 0 25%; max-width: 25%; box-sizing: border-box;
  display: flex; flex-direction: column; align-items: center; gap: 7px; color: #fff;
}
.app span {
  font-size: 11px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.home-dock {
  position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); z-index: 1;
  max-width: calc(100vw - 28px); box-sizing: border-box;
  display: flex; justify-content: center; gap: 22px; align-items: center;
  padding: 12px 18px; border-radius: 28px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.14);
}
.sheet {
  position: absolute; inset: 0; z-index: 10;
  display: flex; flex-direction: column;
  background: rgba(20, 24, 32, 0.96);
  backdrop-filter: blur(20px);
}
.sheet-bar {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.sheet-bar .title { font-weight: 600; font-size: 15px; }
.done { margin-left: auto; color: #0a84ff; font-weight: 600; font-size: 15px; }
.sheet-body { flex: 1; overflow: auto; }
.sheet-enter-active, .sheet-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease; }
.sheet-enter-from, .sheet-leave-to { transform: translateY(100%); opacity: 0.6; }
</style>
