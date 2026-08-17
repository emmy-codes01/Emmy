import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from 'scrollreveal';
// import ButtonGroup from '../components/ButtonGroup';
import { ArrowLeft, Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react'
import upwave from '../assets/images/upwave.png'
import onwhite from '../assets/images/upwave/onwhite.png'
import onblack from '../assets/images/upwave/onblack.png'
import onblue from '../assets/images/upwave/onblue.png'
import onblue2 from '../assets/images/upwave/onblue2.png'
import onblue3 from '../assets/images/upwave/onblue3.png'
import banner from '../assets/images/upwave/banner.png'

/* ---------------------------------------------------------
   Same system as Home / NotFound / Crestora / Oasis / RCR:
   Space Grotesk for display, amber/violet accent, flat dark
   ground. No per-image tags or captions.
   --------------------------------------------------------- */
const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }
const ACCENT = '#E8A853'

const eyebrow = 'text-[10px] tracking-[0.16em] uppercase text-white/35 font-medium'
const body = 'text-sm text-white/50 font-light leading-relaxed'

const SOCIALS = [
  { href: 'https://instagram.com/emmanuelayeni_', label: 'Instagram', Icon: Instagram },
  { href: 'https://wa.me/+2349132489550', label: 'WhatsApp', Icon: MessageCircle },
  { href: 'https://linkedin.com/in/emmanuel-ayeni01', label: 'LinkedIn', Icon: Linkedin },
]

const META = [
  { l: 'Client', v: 'Upwave University' },
  { l: 'Industry', v: 'Corporate Education' },
  { l: 'Scope', v: 'Identity, Signage, Environment' },
]

const onLoadClear = (e) => e.target.classList.remove('blur-xs')

const Upwave = () => {
  useEffect(() => {
    document.title = "Upwave University";
    return () => {
      document.title = "Emmanuel Ayeni";
    };
  }, []);

  useEffect(() => {
    ScrollReveal().reveal('.reveal', {
      distance: '40px',
      duration: 900,
      delay: 100,
      easing: 'ease-out',
      opacity: 0,
      reset: false,
    });
    ScrollReveal().reveal('.reveal1', { origin: 'left', distance: '60px', duration: 900, delay: 100, reset: false });
    ScrollReveal().reveal('.reveal2', { origin: 'right', distance: '60px', duration: 900, delay: 100, reset: false });
  }, []);

  const currentYear = new Date().getFullYear();
  const img = 'rounded-2xl w-full h-auto blur-xs transition-opacity duration-300 hover:opacity-95'

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#f2f0ec]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* ============= HEADER ============= */}
        <header className="reveal pt-14 lg:pt-20 pb-10">
          <Link to="/projects/logos&brand-designs" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-[#E8A853] transition-colors duration-300 mb-9">
            <ArrowLeft size={13} /> Back to portfolio
          </Link>

          <p className={eyebrow}>Brand Identity — Case Study</p>
          <h1 className="text-[2.1rem] md:text-[3.4rem] leading-[1.1] mt-4" style={display}>
            Upwave <span style={{ color: ACCENT }}>University</span>
          </h1>
          <p className="text-white/40 text-xs mt-3 tracking-[0.14em] uppercase">Corporate Education</p>

          <p className={`${body} max-w-xl mt-7`}>
            A brand identity for Upwave University, a corporate education platform built to train
            and upskill teams. The logo system, signage, and environmental applications were
            designed to read as credible and professional across every touchpoint — from a
            business card to the front of a building.
          </p>

          <div className="flex flex-wrap gap-8 md:gap-14 mt-11 pb-11 border-b border-white/[0.08] divide-x divide-white/[0.1]">
            {META.map((m) => (
              <div key={m.l} className="pl-8 first:pl-0">
                <p className="text-sm md:text-base" style={display}>{m.v}</p>
                <p className="text-[11px] text-white/40 font-light mt-1 tracking-wide">{m.l}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ============= GALLERY — no tags, no captions, original proportions ============= */}
        <main className="flex flex-col gap-4 py-4 lg:py-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <img src={onwhite} alt="" className={`reveal1 ${img}`} loading="eager" onLoad={onLoadClear} />
            <img src={onblack} alt="" className={`reveal ${img}`} loading="eager" onLoad={onLoadClear} />
            <img src={onblue} alt="" className={`reveal2 ${img}`} loading="eager" onLoad={onLoadClear} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <img src={onblue2} alt="" className={`reveal1 ${img}`} loading="eager" onLoad={onLoadClear} />
            <img src={onblue3} alt="" className={`reveal2 ${img}`} loading="eager" onLoad={onLoadClear} />
          </div>

          <img src={banner} alt="" className={`reveal ${img}`} loading="eager" onLoad={onLoadClear} />

          <img src={upwave} alt="" className={`reveal ${img}`} loading="eager" onLoad={onLoadClear} />
        </main>

        {/* ============= CONTACT ============= */}
        <section className="reveal border-t border-white/[0.08] mt-10 pt-14 lg:pt-16 pb-16">
          <p className={eyebrow}>Get in touch</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
            <h2 className="text-2xl md:text-4xl leading-tight" style={display}>
              Want something like <span style={{ color: ACCENT }}>this?</span>
            </h2>
            <div className="flex items-center gap-3">
              <a
                href="mailto:eonvx3@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/[0.1] hover:border-[#E8A853]/50 rounded-full px-4 py-2.5 transition-colors duration-300"
              >
                <Mail size={15} /> eonvx3@gmail.com
              </a>
              <div className="flex gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex items-center justify-center size-10 rounded-full border border-white/[0.1] text-white/40 hover:text-[#E8A853] hover:border-[#E8A853]/50 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <s.Icon size={16} strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============= FOOTER ============= */}
        <footer className="w-full border-t border-white/[0.08] pt-6 pb-24">
          <p className="text-xs text-white/30 text-center md:text-left">
            <span className="text-white/60">Emmanuel Ayeni</span> © {currentYear} All rights reserved
          </p>
        </footer>
      </div>

      {/* <ButtonGroup /> */}
    </div>
  )
}

export default Upwave