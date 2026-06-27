<template>
  <div class="min-h-screen flex flex-col">
    <!-- Drifting colored aurora behind everything -->
    <div class="aurora-field" aria-hidden="true">
      <span /><span /><span />
    </div>
    <!-- Ambient ember particles rising -->
    <EmberParticles />
    <SiteNav />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
