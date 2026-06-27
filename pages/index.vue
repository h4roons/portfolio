<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile } = usePortfolio()

// No scroll-site chrome (nav/footer) on the desktop build
definePageMeta({ layout: false })

useHead({
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
        sameAs: [
          'https://www.linkedin.com/in/h4roons/',
          'https://github.com/h4roons',
        ],
      }),
    },
  ],
})
</script>

<template>
  <MacDesktop />
</template>
