import React, { useEffect, useRef } from 'react'
import { Eye, Instagram, Linkedin, MessageCircle, Mail, ChevronRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import grid from '../assets/images/oasis/oasislogo.png'
import CRESTORA from '../assets/images/crestora/logo.png'
import upwavelogo from '../assets/images/upwavelogo.png'
import RCR from '../assets/images/RCR/rcr.jpg'
import SMITHXM from '../assets/images/SMITHXM.png'
import KONNEX from '../assets/images/KONNEX.png'
import KRONIK from '../assets/images/KRONIK.png'
import CASHZEN from '../assets/images/cashzen.jpg'

/* Same system as the new Home.jsx — same palette, same type, same spacious
   rhythm and staggered scroll reveals. No background motion on this page —
   it's a listing page, the work itself should carry it. */

const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }
const serif = { fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic' }

const eyebrow = 'text-[10px] tracking-[0.24em] uppercase text-white/35 font-medium'
const body = 'text-[15px] text-white/50 font-light leading-[1.8]'

const BRAND_CARDS = [
  {
    index: '01',
    img: CASHZEN,
    tag: 'Fintech · Digital Banking',
    title: 'CASHZEN',
    to: '/projects/logos&brand-designs/cashzen',
  },
  {
    index: '02',
    img: grid,
    tag: 'Urban Streetwear Clothing',
    title: 'OASIS NG',
    to: '/projects/logos&brand-designs/oasis',
  },
  {
    index: '02',
    img: CRESTORA,
    tag: 'Cosmetic & Skincare',
    title: 'CRESTORA',
    to: '/projects/logos&brand-designs/crestora',
  },
  {
    index: '03',
    img: upwavelogo,
    tag: 'Education · Corporate',
    title: 'UPWAVE UNIVERSITY',
    to: '/projects/logos&brand-designs/upwave-university',
  },
  {
    index: '04',
    img: RCR,
    tag: 'Sport · Racing · Rebranding',
    title: 'RCR RACING',
    to: '/projects/logos&brand-designs/RCR-RACING',
  },
  // {
  //   index: '05',
  //   img: SMITHXM,
  //   tag: 'Cryptocurrency · Trading',
  //   title: 'SMITH XM GLOBAL',
  //   to: '/projects/logos&brand-designs/smith-xm-global',
  // },
  {
    index: '05',
    img: KONNEX,
    tag: 'Technology · Corporate',
    title: 'KONNEX',
    to: '/projects/logos&brand-designs/konnex',
  },
  // {
  //   index: '06',
  //   img: KRONIK,
  //   tag: 'Building · Construction',
  //   title: 'KRONIK',
  //   to: '/projects/logos&brand-designs/kronik',
  // },
]

// Same handles as Home.jsx — kept identical across pages on purpose.
const SOCIALS = [
  { href: 'https://instagram.com/eonvx_', label: 'Instagram', Icon: Instagram },
  { href: 'https://wa.me/+2349049173033', label: 'WhatsApp', Icon: MessageCircle },
  { href: 'https://linkedin.com/in/emmanuel-ayeni01', label: 'LinkedIn', Icon: Linkedin },
]

/* ---------- reveal-on-scroll, dependency-free — identical hook to Home.jsx,
   so both pages animate the same way without pulling in the scrollreveal lib ---------- */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

const Brands = () => {
  useEffect(() => {
    document.title = 'Selected Work - ELIAS E.'
    return () => {
      document.title = 'ELIAS E.'
    }
  }, [])

  const currentYear = new Date().getFullYear()

  const headingRef = useReveal()
  const cardsRef = useReveal()
  const contactRef = useReveal()

  return (
    <div className="relative min-h-screen bg-[#08090A] text-[#F4F1EA] overflow-hidden">
      {/* same film-grain texture as Home — no drifting blobs, no video here */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 py-14 lg:py-20">

        {/* ---- Breadcrumbs ---- */}
        <nav className="flex items-center gap-1.5 text-[11px] text-white/40 mb-12 lg:mb-16" style={display}>
          <Link to="/" className="hover:text-[#E8A853] transition-colors duration-300">Home</Link>
          <ChevronRight size={12} className="text-white/20" />
          <Link to="/projects" className="hover:text-[#E8A853] transition-colors duration-300">Portfolio</Link>
          <ChevronRight size={12} className="text-white/20" />
          <span className="text-white/70">Work</span>
        </nav>

        {/* ---- Heading ---- */}
        <section ref={headingRef} className="reveal pb-16 lg:pb-24">
          <p className={eyebrow}>Portfolio</p>
          <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[4rem] leading-[1.02] mt-5" style={display}>
            Selected <span style={serif} className="text-[#E8A853] font-normal">Work.</span>
          </h1>
          <p className={`${body} max-w-lg mt-6`}>
            A run of brands I've had the chance to build from the ground up, positioning, identity systems, and the visual language that carries them everywhere they show up.
          </p>
        </section>

        {/* ---- Cards ---- */}
        <section ref={cardsRef} className="reveal grid gap-6 lg:gap-8 md:grid-cols-3">
          {BRAND_CARDS.map((card, i) => (
            <Link
              to={card.to}
              key={card.title}
              data-cursor="VIEW"
              className="stagger-item group flex flex-col justify-between gap-7 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-500 hover:border-[#E8A853]/30 hover:bg-white/[0.045]"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out blur-xs"
                  loading="eager"
                  onLoad={(e) => e.target.classList.remove('blur-xs')}
                />
                <span
                  className="absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/60"
                  style={display}
                >
                  {card.index}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] tracking-[0.16em] uppercase text-white/35">{card.tag}</p>
                  <h3 className="mt-1.5 text-[1.1rem] leading-snug" style={display}>{card.title}</h3>
                </div>
                <span className="shrink-0 flex items-center gap-1 text-xs text-white/50 border border-white/[0.1] group-hover:text-[#E8A853] group-hover:border-[#E8A853]/40 px-3.5 py-2 rounded-full transition-colors duration-300">
                  View <Eye size={12} />
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ---- Get in touch ---- */}
        <section ref={contactRef} className="reveal border-t border-white/[0.08] mt-20 lg:mt-28 pt-16 lg:pt-20">
          <p className={`${eyebrow} stagger-item`}>Get in touch</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-6">
            <h2 className="stagger-item text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] leading-[1.05]" style={{ ...display, transitionDelay: '80ms' }}>
              Let's work <span style={serif} className="text-[#E8A853] font-normal">together.</span>
            </h2>
            <a
              href="mailto:eonvx3@gmail.com"
              data-cursor="WRITE"
              className="stagger-item inline-flex items-center gap-2 text-sm text-black bg-[#F4F1EA] hover:bg-white rounded-full px-6 py-3.5 transition-colors duration-300 shrink-0"
              style={{ transitionDelay: '160ms' }}
            >
              <Mail size={15} /> eonvx3@gmail.com
            </a>
          </div>

          <div className="flex gap-3 mt-11 stagger-item" style={{ transitionDelay: '220ms' }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex items-center justify-center size-11 rounded-full border border-white/[0.1] text-white/50 hover:text-[#E8A853] hover:border-[#E8A853]/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <s.Icon size={18} strokeWidth={1.7} />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between mt-20 pt-8 border-t border-white/[0.08]">
            <p className="text-sm text-white/70" style={display}>Moyinoluwa E. Ayeni</p>
            <p className="text-xs text-white/30">© {currentYear} All rights reserved</p>
          </div>
        </section>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@1&display=swap');

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1); }
        .reveal.is-in { opacity: 1; transform: translateY(0); }

        .stagger-item { opacity: 0; transform: translateY(16px); transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
        .reveal.is-in .stagger-item { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .stagger-item { transition: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}

export default Brands