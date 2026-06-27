<script setup lang="ts">
// ── Analytics (GoatCounter) ──────────────────────────────────
// Free + privacy-friendly (no cookies/banner). Sign up at
// https://www.goatcounter.com, then put your site code here
// (e.g. 'haroonsohail' for haroonsohail.goatcounter.com).
const GOATCOUNTER_CODE = 'h4roons'
// ─────────────────────────────────────────────────────────────

// Inline script runs before hydration to set the theme class,
// preventing a flash of the wrong colour scheme.
useHead({
  script: [
    {
      innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;}catch(e){}})();`,
      tagPosition: 'head',
    },
    // Analytics loads only once a site code is configured
    ...(GOATCOUNTER_CODE
      ? [
          {
            'data-goatcounter': `https://${GOATCOUNTER_CODE}.goatcounter.com/count`,
            async: true,
            src: '//gc.zgo.at/count.js',
            tagPosition: 'bodyClose' as const,
          },
        ]
      : []),
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
