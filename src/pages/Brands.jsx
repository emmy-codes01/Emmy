import React, { useEffect } from 'react'
import ScrollReveal from 'scrollreveal';
// import ButtonGroup from '../components/ButtonGroup';
import { Eye, Instagram, Linkedin, MessageCircle, Mail, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import grid from '../assets/images/OASIS.png'
import CRESTORA from '../assets/images/CRESTORA.png'
import upwavelogo from '../assets/images/upwavelogo.png'
import RCR from '../assets/images/RCR.png'
import SMITHXM from '../assets/images/SMITHXM.png'
import KONNEX from '../assets/images/KONNEX.png'
import KRONIK from '../assets/images/KRONIK.png'

/* Same system as Home.jsx / Projectsgoal.jsx — same grotesque display type, same amber accent, same shell. */
const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }

const eyebrow = 'text-[10px] tracking-[0.16em] uppercase text-white/35 font-medium'
const body = 'text-sm text-white/50 font-light leading-relaxed'

const BRAND_CARDS = [
  {
    index: '01',
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
    index: '06',
    img: KONNEX,
    tag: 'Technology · Corporate',
    title: 'KONNEX',
    to: '/projects/logos&brand-designs/konnex',
  },
  {
    index: '07',
    img: KRONIK,
    tag: 'Building · Construction',
    title: 'KRONIK',
    to: '/projects/logos&brand-designs/kronik',
  },
]

// Same handles as Home.jsx / Projectsgoal.jsx — kept identical across pages on purpose.
const SOCIALS = [
  { href: 'https://instagram.com/eonvx_', label: 'Instagram', Icon: Instagram },
  { href: 'https://wa.me/+2349049173033', label: 'WhatsApp', Icon: MessageCircle },
  { href: 'https://linkedin.com/in/emmanuel-ayeni01', label: 'LinkedIn', Icon: Linkedin },
]

const Brands = () => {

  useEffect(() => {
    document.title = "Brands Designed by Moyinoluwa E. Ayeni";
    return () => {
      document.title = "Moyinoluwa E. Ayeni";
    };
  }, []);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    ScrollReveal().reveal('.reveal', {
      distance: '24px',
      duration: 900,
      delay: 100,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 0,
      reset: false,
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#f2f0ec] overflow-hidden">
      {/* same film-grain texture as Home / Projects */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* same drifting ambient blobs */}
      <div
        className="pointer-events-none fixed -top-32 left-[12%] w-[38rem] h-[38rem] z-0 opacity-[0.16] blur-[110px] animate-drift-a"
        style={{ background: 'radial-gradient(circle, #E8A853, transparent 65%)' }}
      />
      <div
        className="pointer-events-none fixed top-40 right-[8%] w-[32rem] h-[32rem] z-0 opacity-[0.13] blur-[110px] animate-drift-b"
        style={{ background: 'radial-gradient(circle, #7C6FF0, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">

        {/* ---- Breadcrumbs ---- */}
        <nav className="reveal flex items-center gap-1.5 text-[11px] text-white/40 mb-8" style={display}>
          <Link to="/" className="hover:text-[#E8A853] transition-colors duration-300">Home</Link>
          <ChevronRight size={12} className="text-white/20" />
          <Link to="/projects" className="hover:text-[#E8A853] transition-colors duration-300">Portfolio</Link>
          <ChevronRight size={12} className="text-white/20" />
          <span className="text-white/70">Brands</span>
        </nav>

        {/* ---- Heading ---- */}
        <section className="reveal pb-14 lg:pb-16">
          <p className={eyebrow}>Portfolio</p>
          <h1 className="text-[1.8rem] md:text-[2.4rem] leading-tight mt-4" style={display}>
            Logos &amp; Brand <span className="bg-gradient-to-r from-[#E8A853] to-[#f2d6a3] bg-clip-text text-transparent">Identities.</span>
          </h1>
          <p className={`${body} max-w-lg mt-4`}>
            A run of brands I've had the chance to build from the ground up — positioning, identity systems, and the visual language that carries them everywhere they show up.
          </p>
        </section>

        {/* ---- Cards ---- */}
        <section className="reveal grid gap-4 md:grid-cols-3">
          {BRAND_CARDS.map((card) => (
            <Link
              to={card.to}
              key={card.title}
              className="group flex flex-col justify-between gap-6 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-500 hover:border-[#E8A853]/30"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 blur-xs"
                  loading="eager"
                  onLoad={(e) => e.target.classList.remove('blur-xs')}
                />
                <span
                  className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white/60"
                  style={display}
                >
                  {card.index}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-white/35">{card.tag}</p>
                  <h3 className="mt-1 text-[1.05rem] leading-snug" style={display}>{card.title}</h3>
                </div>
                <span className="shrink-0 flex items-center gap-1 text-xs text-white/50 border border-white/[0.1] group-hover:text-[#E8A853] group-hover:border-[#E8A853]/40 px-3 py-2 rounded-full transition-colors duration-300">
                  View <Eye size={12} />
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ---- Get in touch ---- */}
        <section className="reveal border-t border-white/[0.08] mt-16 lg:mt-20 pt-14 lg:pt-16">
          <p className={eyebrow}>Get in touch</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-7 mt-5">
            <h2 className="text-[1.9rem] md:text-[2.4rem] leading-tight" style={display}>
              Let's work <span className="bg-gradient-to-r from-[#E8A853] to-[#7C6FF0] bg-clip-text text-transparent">together.</span>
            </h2>
            <div className="flex items-center gap-3">
              <a
                href="mailto:eonvx3@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/[0.1] hover:border-[#E8A853]/50 rounded-full px-4 py-2.5 transition-colors duration-300"
              >
                <Mail size={15} /> eonvx3@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
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

          <div className="flex items-center justify-between mt-14 pt-6 border-t border-white/[0.08]">
            <p className="text-sm text-white/70" style={display}>Moyinoluwa E. Ayeni</p>
            <p className="text-xs text-white/30">© {currentYear} All rights reserved</p>
          </div>
        </section>

      </div>

      {/* <ButtonGroup /> */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        @keyframes drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, 6%) scale(1.08); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-5%, -4%) scale(1.06); }
        }
        .animate-drift-a { animation: drift-a 18s ease-in-out infinite; }
        .animate-drift-b { animation: drift-b 22s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-drift-a, .animate-drift-b { animation: none; }
        }
      `}</style>
    </div>
  )
}

export default Brands