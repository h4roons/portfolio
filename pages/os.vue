<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile } = usePortfolio()

// No classic nav/footer chrome on the desktop experience
definePageMeta({ layout: false })

useHead({
  title: 'Muhammad Haroon Sohail — macOS Portfolio',
  link: [{ rel: 'canonical', href: 'https://haroonsohail.me/os' }],
  meta: [
    { property: 'og:url', content: 'https://haroonsohail.me/os' },
    { property: 'og:title', content: 'Muhammad Haroon Sohail — macOS Portfolio' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.title,
        email: profile.email,
        address: { '@type': 'PostalAddress', addressLocality: profile.location },
        knowsAbout: profile.domains,
        url: 'https://haroonsohail.me',
        sameAs: ['https://www.linkedin.com/in/h4roons/', 'https://github.com/h4roons'],
      }),
    },
  ],
})
</script>

<template>
  <MacDesktop />
</template>
