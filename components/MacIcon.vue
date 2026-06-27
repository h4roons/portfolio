<script setup lang="ts">
// macOS-style squircle app icons: gradient tile + white SF-ish glyph.
const props = withDefaults(defineProps<{ id: string; size?: number }>(), { size: 44 })

interface Ico {
  grad: [string, string]
  glyph: string
  color?: string
  fill?: boolean
}

const ICONS: Record<string, Ico> = {
  about: {
    grad: ['#34d0ff', '#0a84ff'],
    glyph: '<circle cx="12" cy="8.5" r="4" /><path d="M4.5 20c.7-4 3.8-6 7.5-6s6.8 2 7.5 6" />',
  },
  experience: {
    grad: ['#ffd479', '#c77f00'],
    glyph: '<rect x="3" y="8" width="18" height="12" rx="2.4" /><path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V8" /><path d="M3 13h18" />',
  },
  projects: {
    grad: ['#5ac8fa', '#0a84ff'],
    fill: true,
    glyph: '<path d="M3 7.5A2 2 0 0 1 5 5.5h3.2l1.8 2H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />',
  },
  skills: {
    grad: ['#3a3f47', '#15171c'],
    color: '#5eead4',
    glyph: '<polyline points="6 8.5 10.5 12 6 15.5" /><line x1="12.5" y1="16" x2="18" y2="16" />',
  },
  volunteering: {
    grad: ['#5be7a9', '#0aa06e'],
    glyph: '<circle cx="9" cy="9" r="3" /><path d="M3.5 19c.5-3 2.8-4.5 5.5-4.5s5 1.5 5.5 4.5" /><path d="M16 6.5a3 3 0 0 1 0 6" /><path d="M17 14.5c2.2.4 3.7 1.9 4 4.5" />',
  },
  education: {
    grad: ['#ff7a8a', '#e0314e'],
    glyph: '<path d="M22 9.5 12 5 2 9.5l10 4.5 10-4.5Z" /><path d="M6 11.5v4.2c0 1.3 2.7 2.8 6 2.8s6-1.5 6-2.8v-4.2" />',
  },
  contact: {
    grad: ['#5ac8fa', '#0a84ff'],
    glyph: '<rect x="3" y="5.5" width="18" height="13" rx="2.4" /><path d="m3.5 7.5 8.5 5.5 8.5-5.5" />',
  },
  resume: {
    grad: ['#fbfbfd', '#d3d7df'],
    color: '#5b6472',
    glyph: '<path d="M14 3.5H7A2 2 0 0 0 5 5.5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z" /><path d="M14 3.5v5h5" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="16.5" x2="13" y2="16.5" />',
  },
  spotlight: {
    grad: ['#aab2bd', '#6b7280'],
    glyph: '<circle cx="11" cy="11" r="6.5" /><path d="m20.5 20.5-4-4" />',
  },
  launchpad: {
    grad: ['#7c8794', '#3f4651'],
    fill: true,
    glyph: '<circle cx="6.5" cy="6.5" r="2.4"/><circle cx="12" cy="6.5" r="2.4"/><circle cx="17.5" cy="6.5" r="2.4"/><circle cx="6.5" cy="12" r="2.4"/><circle cx="12" cy="12" r="2.4"/><circle cx="17.5" cy="12" r="2.4"/><circle cx="6.5" cy="17.5" r="2.4"/><circle cx="12" cy="17.5" r="2.4"/><circle cx="17.5" cy="17.5" r="2.4"/>',
  },
  linkedin: {
    grad: ['#38a0e0', '#0a66c2'],
    fill: true,
    glyph: '<path d="M5 8.5h2.6V19H5zM6.3 4.4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.5 8.5h2.5v1.4c.5-.9 1.8-1.7 3.4-1.7 2.5 0 3.6 1.5 3.6 4.4V19h-2.6v-5.4c0-1.3-.5-2.1-1.7-2.1-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V19H9.5z" />',
  },
  github: {
    grad: ['#4b525c', '#1b1f24'],
    fill: true,
    glyph: '<path d="M12 4a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2 .4-2.5-.5-2.7-1-.1-.3-.6-1-1-1.2-.3-.2-.8-.6 0-.6.7 0 1.2.7 1.4 1 .8 1.3 2 1 2.6.7.1-.6.3-1 .6-1.2-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3.1-1.9 3.8-3.6 4 .3.3.6.8.6 1.6v2.3c0 .2.1.5.6.4A8 8 0 0 0 12 4Z" />',
  },
}

const ico = computed(() => ICONS[props.id] ?? ICONS.about)
const gid = computed(() => `mi-${props.id}`)
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 64 64" class="mac-icon" aria-hidden="true">
    <defs>
      <linearGradient :id="gid" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" :stop-color="ico.grad[0]" />
        <stop offset="1" :stop-color="ico.grad[1]" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="15" :fill="`url(#${gid})`" />
    <rect x="2" y="2" width="60" height="30" rx="15" fill="#ffffff" opacity="0.12" />
    <g
      transform="translate(20 20)"
      :stroke="ico.fill ? 'none' : ico.color || '#ffffff'"
      :fill="ico.fill ? ico.color || '#ffffff' : 'none'"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      v-html="ico.glyph"
    />
  </svg>
</template>

<style scoped>
.mac-icon {
  display: block;
  filter: drop-shadow(0 4px 7px rgba(0, 0, 0, 0.35));
}
</style>
