import React, { useEffect } from 'react'
import ScrollReveal from 'scrollreveal';
import grid from '../assets/images/OASIS.png'
import works from '../assets/images/works.png'
import designs from '../assets/images/designs.png'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Instagram, Linkedin, MessageCircle, Mail, ChevronRight } from 'lucide-react'
// import ButtonGroup from '../components/ButtonGroup';
import { Helmet } from 'react-helmet';

/* Same system as Home.jsx — same grotesque display type, same amber accent, same shell. */
const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }

const eyebrow = 'text-[10px] tracking-[0.16em] uppercase text-white/35 font-medium'
const body = 'text-sm text-white/50 font-light leading-relaxed'

const PROJECT_CARDS = [
  {
    index: '01',
    img: grid,
    label: 'EXPLORE',
    title: 'BRAND DESIGNS',
    desc: 'Logo suites, identity systems, and visual language built for businesses that want to look as good as they are.',
    to: '/projects/logos&brand-designs',
  },
  {
    index: '02',
    img: works,
    label: 'EXPLORE',
    title: 'WEB APPLICATIONS',
    desc: 'Portfolios, business sites, and products that load fast, read clearly, and hold up under real use.',
    to: '/projects/websites',
  },
  // {
  //   index: '03',
  //   img: designs,
  //   label: 'EXPLORE',
  //   title: 'CUSTOM GRAPHICS',
  //   desc: 'Campaign assets, social visuals, and marketing materials that keep a brand looking sharp everywhere it shows up.',
  //   to: '/projects/graphic-designs',
  // },
]

// Same handles as Home.jsx — kept identical across pages on purpose.
const SOCIALS = [
  { href: 'https://instagram.com/eonvx_', label: 'Instagram', Icon: Instagram },
  { href: 'https://wa.me/+2349049173033', label: 'WhatsApp', Icon: MessageCircle },
  { href: 'https://linkedin.com/in/emmanuel-ayeni01', label: 'LinkedIn', Icon: Linkedin },
]

const Projectsgoal = () => {

  useEffect(() => {
    document.title = "Moyinoluwa E. Ayeni | Portfolio";
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
      <Helmet>
        <title>Moyinoluwa E. Ayeni | Portfolio</title>
      </Helmet>

      {/* same film-grain texture as Home */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* same drifting ambient blobs as Home — the visual signature carries across pages */}
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
          <span className="text-white/70">Portfolio</span>
        </nav>

        {/* ---- Heading ---- */}
        <section className="reveal pb-14 lg:pb-16">
          <p className={eyebrow}>Portfolio</p>
          <h1 className="text-[1.8rem] md:text-[2.4rem] leading-tight mt-4" style={display}>
            Selected <span className="bg-gradient-to-r from-[#E8A853] to-[#f2d6a3] bg-clip-text text-transparent">Work.</span>
          </h1>
          <p className={`${body} max-w-lg mt-4`}>
            A selection of brands, identities, websites, and digital products I've designed and built. Every project starts with a problem and ends with something built to move the business forward.
          </p>
        </section>

        {/* ---- Cards ---- */}
        <section className="reveal grid gap-4 md:grid-cols-3">
          {PROJECT_CARDS.map((card) => (
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

              <div>
                <p className="text-[10px] tracking-[0.16em] text-white/35">{card.label}</p>
                <div className="flex items-center justify-between mt-1.5 gap-2">
                  <h3 className="text-[1.05rem] leading-snug" style={display}>{card.title}</h3>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-white/30 group-hover:text-[#E8A853] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>
                <p className={`${body} mt-2`}>{card.desc}</p>
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
{/* 
      <ButtonGroup /> */}

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

export default Projectsgoal