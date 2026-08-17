import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from 'scrollreveal';
// import ButtonGroup from '../components/ButtonGroup';
import { ArrowLeft, Layout } from 'lucide-react'

/* ---------------------------------------------------------
   Same system as Home / NotFound / Crestora / Oasis / RCR /
   Upwave: Space Grotesk for display, amber/violet accent,
   flat dark ground.
   --------------------------------------------------------- */
const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }
const ACCENT = '#E8A853'

const eyebrow = 'text-[10px] tracking-[0.16em] uppercase text-white/35 font-medium'
const body = 'text-sm text-white/50 font-light leading-relaxed'

/* ---------------------------------------------------------
   Drop finished projects in here as they're ready — same
   shape as WORK in Home.jsx. Empty for now, so the page
   below renders a clean placeholder instead of blank cards.
   e.g.
   { title: 'Crestora', tag: 'E-commerce', href: 'https://...', img: someImage }
   --------------------------------------------------------- */
const PROJECTS = []

const Websites = () => {
  useEffect(() => {
    document.title = "Websites by Emmy";
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
    ScrollReveal().reveal('.reveal1', { origin: 'left', distance: '60px', duration: 900, delay: 100, reset: true });
    ScrollReveal().reveal('.reveal2', { origin: 'right', distance: '60px', duration: 900, delay: 100, reset: true });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#f2f0ec]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* ============= HEADER ============= */}
        <header className="reveal pt-14 lg:pt-20 pb-10">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-[#E8A853] transition-colors duration-300 mb-9">
            <ArrowLeft size={13} /> Back to portfolio
          </Link>

          <p className={eyebrow}>Selected Work</p>
          <h1 className="text-[2.4rem] md:text-[4rem] leading-[1.05] mt-4" style={display}>
            Websites <span style={{ color: ACCENT }}></span> 
          </h1>

          <p className={`${body} max-w-xl mt-7`}>
            Sites and pages designed and built for speed, clarity, and conversion — from
            simple portfolios to full business sites.
          </p>

          <div className="pb-11 mt-11 border-b border-white/[0.08]" />
        </header>

        {/* ============= PROJECTS ============= */}
        <main className="py-4 lg:py-6">
          {PROJECTS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.map((p, i) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${i % 2 === 0 ? 'reveal1' : 'reveal2'} group block rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition-colors duration-300`}
                >
                  <img src={p.img} alt="" className="w-full h-auto blur-xs group-hover:opacity-95 transition-opacity duration-300" loading="eager" onLoad={(e) => e.target.classList.remove('blur-xs')} />
                  <div className="flex items-center justify-between p-5">
                    <p className="text-base" style={display}>{p.title}</p>
                    {p.tag && <p className="text-[11px] text-white/40 tracking-wide uppercase">{p.tag}</p>}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="reveal flex flex-col items-center text-center gap-4 py-24 border border-dashed border-white/[0.1] rounded-2xl">
              <div className="flex items-center justify-center size-11 rounded-full border border-white/[0.1] text-[#E8A853]/70">
                <Layout size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-base" style={display}>New builds landing here soon</p>
                <p className={`${body} max-w-xs mx-auto mt-1.5`}>
                  This section is being put together — check back shortly, or reach out if you'd like a preview.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/[0.1] hover:border-[#E8A853]/50 rounded-full px-4 py-2.5 transition-colors duration-300 mt-2"
              >
                Back to home
              </Link>
            </div>
          )}
        </main>

        {/* ============= FOOTER ============= */}
        <footer className="w-full border-t border-white/[0.08] pt-6 pb-24 mt-10">
          <p className="text-xs text-white/30 text-center md:text-left">
            <span className="text-white/60">Emmanuel Ayeni</span> © {currentYear} All rights reserved
          </p>
        </footer>
      </div>
{/* 
      <ButtonGroup /> */}
    </div>
  )
}

export default Websites