<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile } = usePortfolio()

// Per-page SEO + JSON-LD structured data
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
  <div>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <VolunteeringSection />
    <EducationSection />
    <ContactSection />
  </div>
</template>
