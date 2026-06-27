<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile } = usePortfolio()

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive<{ name?: string; email?: string; message?: string }>({})
const status = ref<'idle' | 'sent'>('idle')

const validate = () => {
  errors.name = form.name.trim() ? undefined : 'Please enter your name'
  errors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ? undefined : 'Enter a valid email address'
  errors.message = form.message.trim().length >= 10 ? undefined : 'Message should be at least 10 characters'
  return !errors.name && !errors.email && !errors.message
}

const submit = () => {
  if (!validate()) return
  const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
  const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  status.value = 'sent'
}

const iconPaths: Record<string, string> = {
  mail: 'M4 4h16v16H4zM4 6l8 6 8-6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  linkedin: 'M4 9h3v11H4zM5.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M10 9h3v1.5c.5-1 2-1.7 3.5-1.7 2.5 0 3.5 1.5 3.5 4.5V20h-3v-5.5c0-1.3-.5-2-1.7-2-1 0-1.8.7-1.8 2.2V20h-3z',
  github:
    'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 20 4.8a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.6 0C7.2.9 6.1 1.2 6.1 1.2A4.9 4.9 0 0 0 6 4.8a5.2 5.2 0 0 0-1.4 3.7c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22',
}
</script>

<template>
  <section id="contact" class="py-24 md:py-32">
    <div class="mx-auto max-w-content px-5 md:px-8">
      <SectionHeading index="07" eyebrow="Contact" title="Let's build something" />

      <div class="rounded-3xl glass-strong grad-border p-6 md:p-10">
        <div class="grid lg:grid-cols-12 gap-10">
          <div class="lg:col-span-5" v-reveal>
            <p class="text-xl text-base-c font-display font-medium leading-relaxed">
              Have a role or a project in mind? I'm open to software, AI, and
              product opportunities and interesting collaborations.
            </p>
            <p class="mt-4 text-muted-c leading-relaxed">
              The quickest way to reach me is email — drop a line, or use any of the channels here.
            </p>

            <ul class="mt-8 space-y-3">
              <li v-for="s in profile.socials" :key="s.label">
                <a
                  :href="s.href"
                  :target="s.icon === 'linkedin' || s.icon === 'github' ? '_blank' : undefined"
                  rel="noopener"
                  class="group flex items-center gap-4 rounded-2xl glass glass-hover p-4"
                >
                  <span class="grid place-items-center w-10 h-10 rounded-xl chip text-base-c shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="iconPaths[s.icon]"/></svg>
                  </span>
                  <span class="min-w-0">
                    <span class="block text-xs text-faint-c">{{ s.label }}</span>
                    <span class="block text-base-c font-medium truncate">{{ s.handle }}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-7" v-reveal="120">
            <div class="space-y-5">
              <div>
                <label for="c-name" class="block text-sm font-medium text-muted-c mb-1.5">Name</label>
                <input id="c-name" v-model="form.name" type="text" autocomplete="name"
                  class="w-full rounded-xl border-hair bg-[rgb(var(--glass-fill)/0.04)] px-4 py-3 text-base-c placeholder:text-faint-c focus:outline-none focus:border-[rgb(var(--accent)/0.5)] transition-colors"
                  placeholder="Your name" />
                <p v-if="errors.name" class="mt-1.5 text-sm text-faint-c">{{ errors.name }}</p>
              </div>

              <div>
                <label for="c-email" class="block text-sm font-medium text-muted-c mb-1.5">Email</label>
                <input id="c-email" v-model="form.email" type="email" autocomplete="email"
                  class="w-full rounded-xl border-hair bg-[rgb(var(--glass-fill)/0.04)] px-4 py-3 text-base-c placeholder:text-faint-c focus:outline-none focus:border-[rgb(var(--accent)/0.5)] transition-colors"
                  placeholder="you@company.com" />
                <p v-if="errors.email" class="mt-1.5 text-sm text-faint-c">{{ errors.email }}</p>
              </div>

              <div>
                <label for="c-msg" class="block text-sm font-medium text-muted-c mb-1.5">Message</label>
                <textarea id="c-msg" v-model="form.message" rows="4"
                  class="w-full rounded-xl border-hair bg-[rgb(var(--glass-fill)/0.04)] px-4 py-3 text-base-c placeholder:text-faint-c focus:outline-none focus:border-[rgb(var(--accent)/0.5)] transition-colors resize-none"
                  placeholder="Tell me about the role or project…" />
                <p v-if="errors.message" class="mt-1.5 text-sm text-faint-c">{{ errors.message }}</p>
              </div>

              <button type="button" @click="submit"
                class="group inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-accent font-semibold">
                Send message
                <svg class="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>

              <p v-if="status === 'sent'" class="text-sm text-base-c">
                Your mail client should now be open with the message ready to send.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
