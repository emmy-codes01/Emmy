import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from './Menu';
import ScrollReveal from 'scrollreveal';
import me from '../assets/images/image.png'
import signature from '../assets/images/sign.png'
import works from '../assets/images/works.png'
import grid from '../assets/images/upwave.png'
import {
  ArrowRight, ArrowUpRight, ChevronDown, Mail, BadgeCheck, Users,
  Instagram, Linkedin,  MessageCircle,
} from 'lucide-react'

/* ---------------------------------------------------------
   Type system: Space Grotesk — a genuine grotesque, all
   business in the terminals, a little wide in the counters —
   for headlines and accent words, Inter/system sans for
   everything utilitarian: labels, body, nav.
   Requires the Space Grotesk webfont; @import below is a
   self-contained fallback, but for best performance add
   this to your document <head> instead:
   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
   --------------------------------------------------------- */
const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }

// warm accent pulled from the "brand designer" side of the work — used sparingly
const ACCENT = '#E8A853'

const eyebrow = 'text-[10px] tracking-[0.16em] uppercase text-white/35 font-medium'
const body = 'text-sm text-white/50 font-light leading-relaxed'
const navLink = 'text-sm text-white/45 hover:text-white/90 transition-colors duration-300'
const rowLink = 'inline-flex items-center gap-1 text-xs font-medium text-white/60 hover:text-[#E8A853] transition-colors duration-300'
const underline = 'relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[#E8A853] hover:after:w-full after:transition-all after:duration-300'

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

const SOCIALS = [
  { href: 'https://instagram.com/eonvx_', label: 'Instagram', Icon: Instagram },
  { href: 'https://wa.me/+2349049173033', label: 'WhatsApp', Icon: MessageCircle },
  { href: 'https://linkedin.com/in/emmanuel-ayeni01', label: 'LinkedIn', Icon: Linkedin },

]

const SERVICES = [
  {
    title: 'Branding',
    desc: 'From positioning and visual identity to complete brand systems built for consistency, recognition, and growth.',
    cta: 'https://wa.me/2349132489550?text=Hi%20Emmy,%20I%20need%20your%20Branding%20Service.',
  },
  {
    title: 'Website Development',
    desc: 'High-quality websites and digital experiences designed around your brand, your audience, and what the business actually needs.',
    cta: 'https://wa.me/+2349049173033',
  },
  {
    title: 'Graphic & Visual Design',
    tag: '',
    desc: "Perfectly handles Campaigns, social assets, presentations, marketing materials, and other visual work that keeps your brand looking sharp everywhere it shows up.",
    cta: 'https://wa.me/+2349049173033',
  },
]

const WORK = [
  {
    label: 'EXPLORE',
    title: 'SELECTED WORK',
    desc: 'A selection of brands, identities, websites, and digital products I’ve designed and built. Every project starts with a problem and ends with something built to move the business forward.',
    img: grid,
  },
  {
    label: 'EXPLORE',
    title: 'WEBSITES',
    desc: 'Websites and applications that combine strong visual design with clean development, intuitive experiences, and performance that holds up beyond the first impression.',
    img: works,
  },
]

const Home = () => {
  const [openService, setOpenService] = useState(null);

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

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#f2f0ec] overflow-hidden" id="home">
      {/* subtle film-grain texture — the one bit of tactility on an otherwise flat page */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* two slow-drifting color blobs — the page's ambient signature, replacing the flat white glow */}
      <div
        className="pointer-events-none fixed -top-32 left-[12%] w-[38rem] h-[38rem] z-0 opacity-[0.16] blur-[110px] animate-drift-a"
        style={{ background: 'radial-gradient(circle, #E8A853, transparent 65%)' }}
      />
      <div
        className="pointer-events-none fixed top-40 right-[8%] w-[32rem] h-[32rem] z-0 opacity-[0.13] blur-[110px] animate-drift-b"
        style={{ background: 'radial-gradient(circle, #7C6FF0, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-14">

          {/* ============= SIDEBAR ============= */}
          <aside className="lg:col-span-4 lg:sticky lg:top-16 lg:h-fit reveal flex flex-col gap-9 pb-10 lg:pb-0 border-b border-white/[0.08] lg:border-b-0 mb-10 lg:mb-0">
            <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5">
              <div className="relative shrink-0">
                <img
                  src={me}
                  alt="Emmanuel Ayeni"
                  className="rounded-full size-16 lg:size-20 ring-1 ring-white/[0.12] ring-offset-4 ring-offset-[#0a0a0b] hover:ring-[#E8A853]/50 transition-all duration-500 blur-xs"
                  loading="eager"
                  onLoad={(e) => e.target.classList.remove('blur-xs')}
                />
                <span className="absolute bottom-0.5 right-0.5 lg:bottom-1 lg:right-1 size-3 rounded-full bg-[#7CE87C] ring-2 ring-[#0a0a0b] animate-pulse-soft" />
              </div>
              <div>
                <p className="text-lg" style={display}>Moyinoluwa E. Ayeni</p>
                <p className="text-xs text-white/40 mt-0.5 tracking-wide flex items-center gap-1.5">
                  Designer &amp; Strategist
                  <span className="text-[#7CE87C]/80">· Open for work</span>
                </p>
              </div>
            </div>

            <p className={`${body} max-w-xs`}>
              Founder of <span className="text-[#E8A853]">Monolith Studios®</span>. I build brands people remember and digital products people actually use.
            </p>

            <Link
              to="/blogs"
              className="group inline-flex items-center gap-2 self-start text-sm text-white/70 hover:text-[#E8A853] transition-colors duration-300"
            >
              Insights &amp; Articles
              <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#E8A853] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </Link>

            <nav className="hidden lg:flex flex-col gap-3.5">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className={`${navLink} ${underline} self-start`}>{n.label}</a>
              ))}
            </nav>

            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group flex items-center justify-center size-9 rounded-full border border-white/[0.1] text-white/40 hover:text-[#E8A853] hover:border-[#E8A853]/50 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <s.Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </aside>

          {/* ============= MAIN COLUMN ============= */}
          <main className="lg:col-span-8 flex flex-col">

            {/* ---- Intro + stats ---- */}
            <section className="reveal pb-14 lg:pb-16">
              <p className={eyebrow}>I'm Emmanuel</p>
              <h1 className="text-[1.65rem] md:text-[2.6rem] leading-[1.2] md:leading-[1.18] mt-4 max-w-2xl" style={display}>
                Your {' '}
                <span className="bg-gradient-to-r from-[#E8A853] to-[#7C6FF0] bg-clip-text text-transparent">Creative Partner</span>
                <span className="text-white/40 text-[0.65em] block mt-3 font-sans font-light leading-relaxed">
                  I turn ideas, businesses, and products into clear visual systems and functional digital experiences built to last.
                </span>
              </h1>

              <div className="flex mt-11 divide-x divide-white/[0.1]">
                {[
                  { n: '04+', l: 'Years building' },
                  { n: '60+', l: 'Clients Worldwide' },
                  { n: '100+', l: 'Projects Completed' },
                ].map((s) => (
                  <div key={s.l} className="group px-6 first:pl-0 cursor-default">
                    <p className="text-xl md:text-2xl group-hover:text-[#E8A853] transition-colors duration-300" style={display}>{s.n}</p>
                    <p className="text-[11px] text-white/40 font-light mt-1.5 tracking-wide">{s.l}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ---- About ---- */}
            <section id="about" className="reveal border-t border-white/[0.08] py-14 lg:py-16">
              <p className={eyebrow}>01 — About</p>
              <div className="grid md:grid-cols-2 gap-10 mt-6">
                <div>
                  <h3 className="mb-2.5 text-[1.05rem]" style={display}>More Than A Designer</h3>
                  <p className={body}>
                   I work where brand, design, and technology meet. From Brand Identity systems and visual direction to websites and web applications, I handle the work from concept to execution.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2.5 text-[1.05rem]" style={display}>How I Work</h3>
                  <p className={body}>
                    No decoration for the sake of decoration. No design without a reason.

I start with the problem, understand the business, then build the visual and digital system around it. The result should look right, work properly, and make sense long after the launch.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-9">
                {['Brand Identity', 'Art Direction', 'Web Development', 'Creative Direction', 'Brand Strategy',
                  'Visual Systems'].map((skill) => (
                  <span key={skill} className="text-[11px] text-white/40 border border-white/[0.1] rounded-full px-3 py-1 hover:text-[#E8A853] hover:border-[#E8A853]/40 transition-colors duration-300 cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* ---- Work ---- */}
            <section id="work" className="reveal border-t border-white/[0.08] py-14 lg:py-16">
              <div className="flex items-center justify-between mb-7">
                <p className={eyebrow}>02 — Selected Work</p>
                <Link to="/projects" className={`${rowLink} ${underline}`}>
                  Full portfolio <ArrowRight size={13} />
                </Link>
              </div>

              <div className="flex flex-col divide-y divide-white/[0.08] border-t border-white/[0.08]">
                {WORK.map((w) => (
                  <Link
                    to="/projects"
                    key={w.title}
                    className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 py-8 -mx-3 px-3 rounded-xl transition-colors duration-300 hover:bg-white/[0.02]"
                  >
                    <div className="w-full sm:w-36 h-32 sm:h-24 rounded-lg overflow-hidden shrink-0 ring-1 ring-white/[0.06] group-hover:ring-[#E8A853]/40 transition-all duration-500">
                      <img
                        src={w.img}
                        alt={w.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 blur-xs"
                        loading="eager"
                        onLoad={(e) => e.target.classList.remove('blur-xs')}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] text-white/35 uppercase tracking-wide">{w.label}</p>
                      <h3 className="mt-1 text-lg" style={display}>{w.title}</h3>
                      <p className={`${body} mt-1.5 max-w-md`}>{w.desc}</p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-white/30 group-hover:text-[#E8A853] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                    />
                  </Link>
                ))}
              </div>
            </section>

            {/* ---- Services ---- */}
            <section id="services" className="reveal border-t border-white/[0.08] py-14 lg:py-16">
              <p className={eyebrow}>03 — Services</p>

              <div className="flex flex-col divide-y divide-white/[0.08] border-t border-white/[0.08] mt-6">
                {SERVICES.map((s, i) => {
                  const isOpen = openService === i;
                  return (
                    <div key={s.title} className={`transition-colors duration-300 ${isOpen ? 'bg-white/[0.015]' : ''}`}>
                      <button
                        onClick={() => setOpenService(isOpen ? null : i)}
                        className="w-full flex items-center justify-between py-5 px-2 -mx-2 text-left group"
                      >
                        <span className="text-[1.05rem] flex items-center gap-2.5" style={display}>
                          <span className={`transition-colors duration-300 ${isOpen ? 'text-[#E8A853]' : ''}`}>{s.title}</span>
                          {s.tag && (
                            <span className="text-[10px] text-white/40 border border-white/[0.1] rounded-full px-2 py-0.5 flex items-center gap-1 font-sans font-normal">
                              {s.tag} <BadgeCheck size={11} />
                            </span>
                          )}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`transition-all duration-300 ${isOpen ? 'rotate-180 text-[#E8A853]' : 'text-white/35 group-hover:text-white/70'}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="reveal pb-7 px-2 max-w-lg">
                          <p className={`${body} mb-4`}>{s.desc}</p>
                          <a href={s.cta} className="inline-block text-[11px] font-medium px-4 py-2 rounded-full bg-[#E8A853] text-black hover:bg-[#f2d6a3] transition-colors duration-300">
                            I need this
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ---- Contact ---- */}
            <section id="contact" className="reveal border-t border-white/[0.08] pt-14 lg:pt-16">
              <p className={eyebrow}>04 — Contact</p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mt-5">
                <h2 className="text-[1.9rem] md:text-[2.4rem] leading-tight" style={display}>
                  Let's work <span className="bg-gradient-to-r from-[#E8A853] to-[#7C6FF0] bg-clip-text text-transparent">together.</span>
                </h2>
                <p className={`${body} max-w-xs`}> Have a brand to build, a website to launch, or an idea that needs to become real?</p>

              
                <div className="flex items-center gap-3 mt-2">
                  <a
                    href="mailto:eonvx3@gmail.com"
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/[0.1] hover:border-[#E8A853]/50 rounded-full px-4 py-2.5 transition-colors duration-300"
                  >
                    <Mail size={15} /> eonvx3@gmail.com
                  </a>
                  <Link
                    to="/reviews"
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/[0.1] hover:border-[#E8A853]/50 rounded-full px-4 py-2.5 transition-colors duration-300"
                  >
                    <Users size={15} /> Feedbacks
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between mt-14 pt-6 border-t border-white/[0.08]">
                <a href="https://linkedin.com/in/emmanuel-ayeni01" className="opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <img src={signature} alt="Signature" className="h-12" />
                </a>
                <p className="text-xs text-white/30">
                  © {currentYear} Emmanuel Ayeni
                </p>
              </div>
            </section>

          </main>
        </div>
      </div>

      <BottomMenu />

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
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .animate-drift-a { animation: drift-a 18s ease-in-out infinite; }
        .animate-drift-b { animation: drift-b 22s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 2.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-drift-a, .animate-drift-b, .animate-pulse-soft { animation: none; }
        }
      `}</style>
    </div>
  )
}

export default Home