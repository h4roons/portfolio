<script setup lang="ts">
import { usePortfolio } from '~/composables/usePortfolio'
const { profile } = usePortfolio()

// Same Web3Forms key as the main site (public client-side key by design)
const WEB3FORMS_ACCESS_KEY = '0c2577f6-2057-4a41-bdeb-4fed469b26a8'

const form = reactive({ name: '', email: '', message: '' })
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const valid = computed(
  () =>
    form.name.trim() &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) &&
    form.message.trim().length >= 10
)

const send = async () => {
  if (!valid.value) return
  if (!WEB3FORMS_ACCESS_KEY) {
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + form.name)}&body=${encodeURIComponent(form.message + '\n\n— ' + form.name + ' (' + form.email + ')')}`
    status.value = 'sent'
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Portfolio enquiry from ${form.name}`,
        from_name: 'haroonsohail.me (macOS)',
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    })
    const data = await res.json()
    if (data.success) {
      status.value = 'sent'
      form.name = ''
      form.email = ''
      form.message = ''
    } else status.value = 'error'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="mail">
    <div class="toolbar">
      <button class="send" :disabled="!valid || status === 'sending'" @click="send">
        <span class="ico">➤</span>
        {{ status === 'sending' ? 'Sending…' : 'Send' }}
      </button>
      <span class="hint">New Message</span>
    </div>

    <div class="fields">
      <label class="row"><span class="k">To:</span><span class="v fixed">{{ profile.email }}</span></label>
      <label class="row"><span class="k">From:</span><input v-model="form.email" type="email" placeholder="you@company.com" /></label>
      <label class="row"><span class="k">Name:</span><input v-model="form.name" type="text" placeholder="Your name" /></label>
      <label class="row sub"><span class="k">Subject:</span><span class="v fixed">Portfolio enquiry</span></label>
    </div>

    <textarea v-model="form.message" class="body" placeholder="Write your message…" />

    <p v-if="status === 'sent'" class="note ok">✓ Sent — thanks, I'll reply soon.</p>
    <p v-else-if="status === 'error'" class="note err">
      Couldn't send. Email me directly at {{ profile.email }}.
    </p>
  </div>
</template>

<style scoped>
.mail { display: flex; flex-direction: column; height: 100%; }
.toolbar {
  display: flex; align-items: center; gap: 14px;
  padding: 10px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.send {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #fff;
  background: linear-gradient(115deg, #0ea5e9, #22d3ee);
  box-shadow: 0 6px 18px -6px rgba(14, 165, 233, 0.7);
}
.send:disabled { opacity: 0.45; }
.send .ico { transform: rotate(0deg); }
.hint { font-size: 12px; color: #8b909c; }
.fields { padding: 4px 16px; }
.row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
.k { width: 64px; font-size: 13px; color: #8b909c; }
.v.fixed { font-size: 13px; color: #c4c9d2; }
.row input { flex: 1; background: transparent; border: none; outline: none; color: #fff; font-size: 13px; }
.row input::placeholder { color: #6b7280; }
.body {
  flex: 1; margin: 12px 16px 16px; min-height: 160px; resize: none;
  background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px; padding: 12px 14px; color: #e9ecf1; font-size: 14px; line-height: 1.6; outline: none;
}
.body::placeholder { color: #6b7280; }
.note { font-size: 13px; padding: 0 16px 14px; }
.note.ok { color: #22d3ee; }
.note.err { color: #f59e9e; }
</style>
