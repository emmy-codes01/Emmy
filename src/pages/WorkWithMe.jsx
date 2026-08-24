import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Send } from 'lucide-react'

/* ---------------------------------------------------------
   Same system as Home / Crestora / Oasis / RCR / Upwave /
   Blog: Space Grotesk for display, amber/violet accent,
   flat dark ground.
   --------------------------------------------------------- */
const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }
const ACCENT = '#E8A853'
const TO_EMAIL = 'eonvx3@gmail.com'

const eyebrow = 'text-[10px] tracking-[0.16em] uppercase text-white/35 font-medium'
const body = 'text-sm text-white/50 font-light leading-relaxed'
const label = 'text-[11px] tracking-[0.08em] uppercase text-white/45 font-medium'
const fieldBase =
  'w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-300 focus:border-[#E8A853]/60 focus:bg-white/[0.05]'

const TIMELINES = ['ASAP', '2–4 weeks', '1–2 months', '3+ months', 'Not sure yet']
const BUDGETS = ['Under $500', '$500 – $1,000', '$1,000 – $3,000', '$3,000 – $10,000', '$10,000+', "I'd rather discuss"]

const initialState = {
  name: '',
  company: '',
  website: '',
  building: '',
  need: '',
  timeline: '',
  budget: '',
}

const WorkWithMe = () => {
  const [form, setForm] = useState(initialState)
  const [touched, setTouched] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const isValid = form.name.trim() && form.building.trim() && form.need.trim()

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return

    const subject = `Project inquiry — ${form.name}${form.company ? ` (${form.company})` : ''}`

    const lines = [
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      form.website && `Website: ${form.website}`,
      '',
      'What are you building?',
      form.building,
      '',
      'What do you need?',
      form.need,
      '',
      `Timeline: ${form.timeline || 'Not specified'}`,
      `Budget range: ${form.budget || 'Not specified'}`,
    ].filter((line) => line !== false && line !== undefined)

    const body = lines.join('\n')

    window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#f2f0ec]">
      <div className="max-w-[720px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* ============= HEADER ============= */}
        <header className="pt-14 lg:pt-20 pb-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-[#E8A853] transition-colors duration-300 mb-9">
            <ArrowLeft size={13} /> Back to home
          </Link>

          <p className={eyebrow}>Let's build something</p>
          <h1 className="text-[2.2rem] md:text-[3.2rem] leading-[1.1] mt-4" style={display}>
            Work <span style={{ color: ACCENT }}>with me.</span>
          </h1>

          <p className={`${body} max-w-lg mt-6`}>
            Tell me a bit about what you're building. Submitting this opens your email app with
            everything filled in and addressed to me. Nothing sends automatically, you're
            always in control before it goes out.
          </p>
        </header>

        {/* ============= FORM ============= */}
        <form onSubmit={handleSubmit} noValidate className="pb-20 flex flex-col gap-6">

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className={label} htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={update('name')}
                placeholder="Your full name"
                className={`${fieldBase} ${touched && !form.name.trim() ? 'border-red-400/50' : ''}`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={label} htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                value={form.company}
                onChange={update('company')}
                placeholder="Optional"
                className={fieldBase}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={label} htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              value={form.website}
              onChange={update('website')}
              placeholder="yourcompany.com (optional)"
              className={fieldBase}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={label} htmlFor="building">What are you building? *</label>
            <textarea
              id="building"
              rows={4}
              value={form.building}
              onChange={update('building')}
              placeholder="A brand, a website, a product, tell me about it"
              className={`${fieldBase} resize-none ${touched && !form.building.trim() ? 'border-red-400/50' : ''}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={label} htmlFor="need">What do you need? *</label>
            <textarea
              id="need"
              rows={4}
              value={form.need}
              onChange={update('need')}
              placeholder="Branding, a full website, ongoing design support. Be specific if you can"
              className={`${fieldBase} resize-none ${touched && !form.need.trim() ? 'border-red-400/50' : ''}`}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className={label} htmlFor="timeline">Timeline</label>
              <select
                id="timeline"
                value={form.timeline}
                onChange={update('timeline')}
                className={`${fieldBase} appearance-none cursor-pointer`}
                style={{ colorScheme: 'dark' }}
              >
                <option value="" className="bg-[#0a0a0b]">Select a timeline</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t} className="bg-[#0a0a0b]">{t}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className={label} htmlFor="budget">Budget range</label>
              <select
                id="budget"
                value={form.budget}
                onChange={update('budget')}
                className={`${fieldBase} appearance-none cursor-pointer`}
                style={{ colorScheme: 'dark' }}
              >
                <option value="" className="bg-[#0a0a0b]">Select a budget range</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b} className="bg-[#0a0a0b]">{b}</option>
                ))}
              </select>
            </div>
          </div>

          {touched && !isValid && (
            <p className="text-xs text-red-400/80 -mt-2">
              Please fill in your name and the two required fields above.
            </p>
          )}

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3.5 rounded-full bg-[#E8A853] text-black hover:bg-[#f2d6a3] transition-colors duration-300 mt-2 self-start"
          >
            <Send size={15} /> Open in email app
          </button>
        </form>

        {/* ============= FOOTER ============= */}
        <footer className="w-full border-t border-white/[0.08] pt-6 pb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              <span className="text-white/60">Elias</span> — prefer to write directly?
            </p>
            <a
              href={`mailto:${TO_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/[0.1] hover:border-[#E8A853]/50 rounded-full px-4 py-2.5 transition-colors duration-300"
            >
              <Mail size={15} /> {TO_EMAIL}
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default WorkWithMe