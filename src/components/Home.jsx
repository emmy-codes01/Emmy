import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from './Menu';
import me from '../assets/images/image.png'
import signature from '../assets/images/sign.png'
import works from '../assets/images/website.png'
import grid from '../assets/images/upwave.png'
import oasisImg from '../assets/images/oasis/oasislogo.png'
import crestoraImg from '../assets/images/crestora/logo.png'
import upwaveUniImg from '../assets/images/upwavelogo.png'
import rcrImg from '../assets/images//RCR/rcr.jpg'
import konnexImg from '../assets/images/KONNEX.png'
import kronikImg from '../assets/images/KRONIK.png'
import desktopBg from '../assets/images/backgrounds/desktop background.mp4'
import mobileBg from '../assets/images/backgrounds/mobile.mp4'
import cashzenImg from '../assets/images/cashzen.jpg'
import lumereImg from '../assets/images/lumere.png'
import velmontImg from '../assets/images/sticker.png'
import {
  ArrowRight, ArrowUpRight, Mail, Users,
  Instagram, Linkedin, MessageCircle,
} from 'lucide-react'

/* =========================================================================
   DESIGN SYSTEM

   Palette
     --ink        #F4F1EA  paper white, body/heading text
     --void       #08090A  near-black stage the work sits on
     --gold       #E8A853  brand mark
     --violet     #8F7CFF  cool counterweight to gold
     --coral      #FF6E4E  warm accent
     --teal       #47D6C6  cold accent
     --mist       rgba(244,241,234,.45)  secondary text

   Type
     Display  — Space Grotesk, tight tracking, used loud and rarely
     Editorial— Instrument Serif Italic, one accent word per section
     Utility  — Inter/system, labels, nav, captions

   Hero
     The old generated "liquid pigment" blob has been retired in favour
     of the custom looped background video — a dedicated desktop cut and
     a dedicated mobile cut, swapped purely with CSS (no JS device
     detection, so there's no flash of the wrong file). A soft dark
     gradient sits on top for text legibility, and the whole layer gets
     a slow, subtle parallax drift as the page scrolls.

   Rhythm
     Section padding, gaps and type scale were opened up throughout for
     a slower, more confident read — and every section now reveals with
     a staggered cascade rather than one flat fade, so scrolling itself
     feels considered rather than incidental.

   Brand showcase
     The old flat looping logo-strip has been replaced with a 3D
     "coverflow ring" carousel — projects sit on a dark perspective
     stage with a receding grid floor, arranged along a shallow arc so
     the deck visibly curves away from the active card. Drag (or the
     arrows / arrow keys) rotates the ring; clicking a side card brings
     it to the front, clicking the front card opens the project. Moving
     the mouse anywhere over the stage also drives a continuous 3D
     parallax — the whole ring tilts toward the cursor via a lerped
     rAF loop, the perspective-origin drifts with it, and whichever
     card is under the pointer tilts and lifts toward it independently.

   Selected Work — Websites card
     The "WEBSITES" card in the Selected Work drag rail now shows a
     looped, muted, autoplaying video of the live site's homepage as its
     cover instead of a static screenshot. Because the destination is an
     external, already-deployed site (not an internal route), the card
     renders as a plain anchor tag pointing at that URL (opened in a new
     tab) rather than a React Router <Link>, while every other card in
     the rail keeps using <Link> for internal navigation.
   ========================================================================= */

const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }
const serif = { fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic' }

const eyebrow = 'text-[10px] lg:text-[12px] tracking-[0.24em] uppercase text-white/35 font-medium'
const body = 'text-[15px] lg:text-[17px] text-white/50 font-light leading-[1.8]'
const navLink = 'text-sm lg:text-base text-white/45 hover:text-white/90 transition-colors duration-300'
const underline = 'relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[#E8A853] hover:after:w-full after:transition-all after:duration-300'

/* ---------------------------------------------------------------------
   👉 DESKTOP MARGIN CONTROL — edit these two lines to taste.

   CONTAINER_X   horizontal padding on every content wrapper (header,
                 hero copy, and the three "max-w-[1280px]" sections).
                 This — not max-w-[1280px] — was what made the desktop
                 margins feel huge, because it used to jump to
                 lg:px-14 (56px) and xl:px-16 (64px) per side, i.e. up
                 to 128px of dead space on large screens before the
                 1280px cap even kicks in.

                 Scale reference (Tailwind spacing): px-5=20px, px-6=24px,
                 px-8=32px, px-10=40px, px-12=48px, px-14=56px, px-16=64px.

                 Want it even tighter on desktop? Lower `lg:px-10` /
                 `xl:px-12` further (e.g. lg:px-6 xl:px-8).
                 Want more breathing room again? Raise them back up.

   CONTAINER_EDGE  same idea, used only for the "Scroll ↓" cue which is
                   absolutely positioned from the right edge instead of
                   padded — kept in sync with CONTAINER_X so it still
                   lines up with the rest of the content.
   --------------------------------------------------------------------- */
const CONTAINER_X = 'px-5 sm:px-8 lg:px-6 xl:px-8'
const CONTAINER_EDGE = 'right-5 sm:right-8 lg:right-6 xl:right-8'

/* CONTAINER_MAX_W  the old flat "max-w-[1280px]" cap is what actually
   pushed the header/name in from the edges on wide monitors — on a
   1920px screen, a centered 1280px column leaves ~320px of dead space
   on EACH side no matter how small CONTAINER_X is. Bumping the cap up
   (or dropping it entirely past a breakpoint) is what lets content
   reach toward the real edges of the viewport on large views.
   Lower these numbers for a narrower page, raise/remove for wider. */
const CONTAINER_MAX_W = 'max-w-[1280px] lg:max-w-[1680px] xl:max-w-none'

const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#brands', label: 'Brands' },
  { href: '/workwithme', label: 'Contact' },
]

const SOCIALS = [
  { href: 'https://instagram.com/eonvx_', label: 'Instagram', Icon: Instagram },
  { href: 'https://wa.me/+2349049173033', label: 'WhatsApp', Icon: MessageCircle },
  { href: 'https://linkedin.com/in/emmanuel-ayeni01', label: 'LinkedIn', Icon: Linkedin },
]

const BRANDS = [
  { n: '01', img: cashzenImg, tag: 'Fintech · Mobile Banking', title: 'KRONIK', to: '/projects/logos&brand-designs/cashzen' },
  { n: '02', img: lumereImg, tag: 'Beauty · Biotech Skincare', title: 'LUMÈRE', to: '/projects/logos&brand-designs/lumere' },
  { n: '03', img: oasisImg, tag: 'Urban Streetwear Clothing', title: 'OASIS NG', to: '/projects/logos&brand-designs/oasis' },
  { n: '04', img: crestoraImg, tag: 'Cosmetic & Skincare', title: 'CRESTORA', to: '/projects/logos&brand-designs/crestora' },
  { n: '05', img: upwaveUniImg, tag: 'Education · Corporate', title: 'UPWAVE UNIVERSITY', to: '/projects/logos&brand-designs/upwave-university' },
  { n: '06', img: rcrImg, tag: 'Sport · Racing · Rebranding', title: 'RCR RACING', to: '/projects/logos&brand-designs/RCR-RACING' },
  { n: '07', img: velmontImg, tag: 'Sports · POLO CLUB', title: 'VELMONT POLO CLUB', to: '/projects/logos&brand-designs/velmont' },
  { n: '08', img: konnexImg, tag: 'Technology · Corporate', title: 'KONNEX', to: '/projects/logos&brand-designs/konnex' },
  // { n: '08', img: kronikImg, tag: 'Building · Construction', title: 'KRONIK', to: '/projects/logos&brand-designs/kronik' },

]

const WORK = [
  {
    idx: '01',
    label: 'Brand & Identity',
    title: 'SELECTED WORK',
    desc: 'Brands, identities, and digital products designed and built end to end, every project starts with a problem and ends with something built to move the business forward.',
    img: cashzenImg,
    to: '/projects/logos&brand-designs',
  },
  {
    idx: '02',
    label: 'Product & Web',
    title: 'WEBSITES',
    desc: 'Applications that pair strong visual design with clean development, intuitive, fast, and built to last past launch day.',
    video: 'https://res.cloudinary.com/doaidwudz/video/upload/v1787876576/vidd_imgum4.mkv',
    to: 'https://eonvx.vercel.app',
    external: true,
  },
]

/* ---------- reveal-on-scroll, dependency-free ---------- */
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

/* ---------- magnetic pull for CTAs ---------- */
function useMagnetic(strength = 18) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * strength
      const y = ((e.clientY - r.top) / r.height - 0.5) * strength
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    const onLeave = () => { el.style.transform = 'translate(0,0)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])
  return ref
}

/* ---------- gentle parallax drift for a layer as the page scrolls ---------- */
function useParallax(speed = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = null
    const update = () => {
      el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`
      raf = null
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])
  return ref
}

/* ---------- fades + lifts an element out as the page scrolls past it (hero copy) ---------- */
function useScrollFade(range = 460) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = null
    const update = () => {
      const t = Math.min(1, window.scrollY / range)
      el.style.opacity = String(1 - t)
      el.style.transform = `translateY(${t * 26}px)`
      raf = null
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [range])
  return ref
}

/* ---------- thin progress bar tracking scroll position ---------- */
function ScrollProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let raf = null
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      bar.style.width = `${max > 0 ? (doc.scrollTop / max) * 100 : 0}%`
      raf = null
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  )
}

/* ---------- hero background — the custom looped video, desktop + mobile cut ---------- */
function HeroBackground() {
  const parallaxRef = useParallax(0.1)
  return (
    <div className="hero-bg-stage" aria-hidden="true">
      <div ref={parallaxRef} className="hero-bg-layer">
        <video className="hero-bg-video hero-bg-video--desktop" autoPlay muted loop playsInline preload="auto">
          <source src={desktopBg} type="video/mp4" />
        </video>
        <video className="hero-bg-video hero-bg-video--mobile" autoPlay muted loop playsInline preload="auto">
          <source src={mobileBg} type="video/mp4" />
        </video>
      </div>
      <div className="hero-bg-overlay" />
    </div>
  )
}

/* ---------- custom cursor, fine-pointer only ---------- */
function CustomCursor() {
  const dotRef = useRef(null)
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    let x = window.innerWidth / 2, y = window.innerHeight / 2
    let cx = x, cy = y
    const onMove = (e) => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', onMove)

    let raf
    const tick = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      if (dot) dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%,-50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const overables = document.querySelectorAll('[data-cursor]')
    const enter = (e) => setLabel(e.currentTarget.getAttribute('data-cursor') || '')
    const leave = () => setLabel('')
    overables.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      overables.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={dotRef} className={`custom-cursor ${label ? 'is-labeled' : ''}`}>
      {label && <span>{label}</span>}
    </div>
  )
}

/* ---------- horizontal drag gallery ---------- */
function DragRail({ children }) {
  const railRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })

  const onDown = (e) => {
    const rail = railRef.current
    drag.current = { active: true, startX: e.clientX ?? e.touches[0].clientX, startScroll: rail.scrollLeft }
    rail.classList.add('is-dragging')
  }
  const onMove = (e) => {
    if (!drag.current.active) return
    const rail = railRef.current
    const x = e.clientX ?? e.touches?.[0]?.clientX
    rail.scrollLeft = drag.current.startScroll - (x - drag.current.startX)
  }
  const onUp = () => {
    drag.current.active = false
    railRef.current?.classList.remove('is-dragging')
  }

  return (
    <div
      ref={railRef}
      className="drag-rail"
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
    >
      {children}
    </div>
  )
}

/* ---------- scroll-scrubbed paragraph — dims to 20%, lights to 100% as it passes the reading band ---------- */
function ScrollText({ text, className = '' }) {
  const containerRef = useRef(null)
  const wordRefs = useRef([])
  const words = text.split(' ')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      wordRefs.current.forEach((w) => { if (w) w.style.opacity = 1 })
      return
    }
    let raf = null
    let active = false

    const update = () => {
      const vh = window.innerHeight
      const band = vh * 0.62
      wordRefs.current.forEach((w) => {
        if (!w) return
        const r = w.getBoundingClientRect()
        const center = r.top + r.height / 2
        const dist = Math.abs(center - band)
        const t = Math.max(0, 1 - dist / (vh * 0.32))
        w.style.opacity = (0.2 + t * 0.8).toFixed(2)
      })
      raf = null
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      if (active) {
        window.addEventListener('scroll', onScroll, { passive: true })
        update()
      } else {
        window.removeEventListener('scroll', onScroll)
      }
    }, { threshold: 0 })
    if (containerRef.current) io.observe(containerRef.current)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <p ref={containerRef} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          ref={(el) => (wordRefs.current[i] = el)}
          className="scroll-word"
        >
          {w}{' '}
        </span>
      ))}
    </p>
  )
}

/* ---------- 3D coverflow-ring project carousel (the "video" reveal) ----------
   Cards sit on a shallow arc in 3D space rather than a flat line, so the
   whole deck visibly curves away from the active card — dark stage, faint
   receding grid floor, big front card, smaller rotated cards falling away
   either side. Drag (or the arrows / ← →) rotates the ring with a bouncy
   spring settle; click a side card to bring it forward, click the front
   card to open the project. Loops infinitely, gently auto-rotates when
   idle, and pauses the instant you touch it.

   On top of that, two independent mouse-driven 3D layers run purely via
   direct DOM writes (no React state, so they stay at 60fps):
     - Stage parallax: a rAF loop lerps toward the cursor position and
       drives a wrapper's rotateX/rotateY plus the stage's perspective-
       origin, so the entire ring gently turns to "look toward" the mouse
       anywhere over the carousel.
     - Card tilt: whichever card the pointer is actually over tilts and
       lifts toward it independently, on a nested layer so it never
       fights the ring-position transform or the floating idle animation.

   Gesture handling for the drag-to-rotate interaction uses Pointer Events
   rather than touch events — React marks touchstart/touchmove listeners
   passive by default, so calling preventDefault() inside a touchmove
   handler silently fails and the page just scrolls instead of turning
   the carousel. Pointer events aren't passive-locked, so preventDefault
   works once we've decided the gesture is horizontal, while a vertical
   gesture is left alone so the page can still scroll normally on mobile. */
function ProjectCarousel({ items }) {
  const [active, setActive] = useState(0)
  const [radius, setRadius] = useState(640)
  const [fineHover, setFineHover] = useState(false)
  const count = items.length
  const stageRef = useRef(null)
  const tiltWrapRef = useRef(null)
  const trackRef = useRef(null)
  const drag = useRef({ id: null, base: 0, lastX: 0, lastT: 0, vx: 0, axis: null, moved: false })
  const autoplayId = useRef(null)
  const idleTimer = useRef(null)
  const mouseTilt = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const mouseTiltRaf = useRef(null)

  const go = (i) => setActive(((i % count) + count) % count)

  useEffect(() => {
    const calc = () => setRadius(window.innerWidth < 640 ? 260 : window.innerWidth < 1024 ? 440 : 640)
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    setFineHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  /* ---- stage-wide 3D parallax: whole ring turns toward the cursor ---- */
  useEffect(() => {
    if (!fineHover) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const stage = stageRef.current
    const wrap = tiltWrapRef.current
    if (!stage || !wrap) return

    const onMove = (e) => {
      const r = stage.getBoundingClientRect()
      mouseTilt.current.tx = ((e.clientX - r.left) / r.width) * 2 - 1
      mouseTilt.current.ty = ((e.clientY - r.top) / r.height) * 2 - 1
    }
    const onLeave = () => {
      mouseTilt.current.tx = 0
      mouseTilt.current.ty = 0
    }

    const loop = () => {
      const t = mouseTilt.current
      t.x += (t.tx - t.x) * 0.07
      t.y += (t.ty - t.y) * 0.07
      wrap.style.transform = `rotateX(${(-t.y * 20).toFixed(2)}deg) rotateY(${(t.x * 13).toFixed(2)}deg)`
      stage.style.perspectiveOrigin = `${(50 + t.x * 90).toFixed(1)}% ${(50 + t.y * 16).toFixed(1)}%`
      mouseTiltRaf.current = requestAnimationFrame(loop)
    }
    mouseTiltRaf.current = requestAnimationFrame(loop)

    stage.addEventListener('mousemove', onMove)
    stage.addEventListener('mouseleave', onLeave)
    return () => {
      stage.removeEventListener('mousemove', onMove)
      stage.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(mouseTiltRaf.current)
      if (wrap) wrap.style.transform = ''
      if (stage) stage.style.perspectiveOrigin = ''
    }
  }, [fineHover])

  /* ---- per-card tilt: the card under the pointer leans toward it ---- */
  const onCardTiltMove = (e) => {
    if (!fineHover) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transition = 'transform 0.08s linear'
    el.style.transform = `rotateX(${(-py * 15).toFixed(2)}deg) rotateY(${(px * 17).toFixed(2)}deg) translateZ(220px)`
  }
  const onCardTiltLeave = (e) => {
    const el = e.currentTarget
    el.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)'
    el.style.transform = ''
  }

  const stopAutoplay = () => { if (autoplayId.current) clearInterval(autoplayId.current) }
  const startAutoplay = () => {
    stopAutoplay()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    autoplayId.current = setInterval(() => setActive((a) => (a + 1) % count), 5200)
  }
  const bumpIdle = () => {
    stopAutoplay()
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(startAutoplay, 4200)
  }

  useEffect(() => {
    startAutoplay()
    return () => { stopAutoplay(); clearTimeout(idleTimer.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  const setTrackTilt = (deg, withSpring) => {
    const el = trackRef.current
    if (!el) return
    el.style.transition = withSpring ? 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)' : 'none'
    el.style.transform = `rotateX(3deg) rotateZ(${deg}deg)`
  }

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    stopAutoplay()
    clearTimeout(idleTimer.current)
    drag.current = { id: e.pointerId, base: e.clientX, startY: e.clientY, lastX: e.clientX, lastT: performance.now(), vx: 0, axis: null, moved: false }
    e.currentTarget.setPointerCapture?.(e.pointerId)
    setTrackTilt(0, false)
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (d.id !== e.pointerId) return
    const dx = e.clientX - d.base
    const dy = e.clientY - d.startY

    if (!d.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      d.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (d.axis === 'y') return // vertical intent — let the page scroll
    }
    if (d.axis !== 'x') return

    e.preventDefault()
    d.moved = true
    const now = performance.now()
    const dt = Math.max(now - d.lastT, 1)
    d.vx = (e.clientX - d.lastX) / dt
    d.lastX = e.clientX
    d.lastT = now

    setTrackTilt(Math.max(-9, Math.min(9, dx / 14)), false)

    if (Math.abs(dx) > 78) {
      go(active + (dx < 0 ? 1 : -1))
      d.base = e.clientX
    }
  }

  const endDrag = (e) => {
    const d = drag.current
    if (d.id !== (e.pointerId ?? d.id)) return
    if (d.axis === 'x' && Math.abs(d.vx) > 0.6) {
      go(active + (d.vx < 0 ? 1 : -1))
    }
    d.id = null
    setTrackTilt(0, true)
    bumpIdle()
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { bumpIdle(); go(active + 1) }
      if (e.key === 'ArrowLeft') { bumpIdle(); go(active - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const STEP = 24 // degrees between neighbouring cards on the ring

  return (
    <div className="pc-stage" ref={stageRef} data-cursor="DRAG" onMouseEnter={stopAutoplay} onMouseLeave={bumpIdle}>
      <div className="pc-floor" aria-hidden="true" />
      <div className="pc-glow" aria-hidden="true" />

      <div className="pc-top">
        <span style={display}>SELECTED WORK°</span>
        <span className="pc-count">{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
      </div>

      <div ref={tiltWrapRef} className="pc-tiltwrap">
        <div
          ref={trackRef}
          className="pc-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {items.map((it, i) => {
            let delta = i - active
            if (delta > count / 2) delta -= count
            if (delta < -count / 2) delta += count
            const abs = Math.abs(delta)
            if (abs > 3) return null

            const angle = delta * STEP
            const rad = (angle * Math.PI) / 180
            const x = Math.sin(rad) * radius
            const z = (Math.cos(rad) - 1) * radius
            const scale = Math.max(0.56, 1 - abs * 0.17)
            const opacity = Math.max(0.2, 1 - abs * 0.3)
            const brightness = Math.max(0.4, 1 - abs * 0.24)

            return (
              <Link
                to={it.to}
                key={it.title}
                data-cursor={abs === 0 ? 'OPEN' : 'VIEW'}
                className={`pc-card ${abs === 0 ? 'is-active' : ''}`}
                style={{
                  transform: `translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg) scale(${scale})`,
                  opacity,
                  zIndex: 20 - abs,
                  filter: `brightness(${brightness})`,
                  transitionDelay: `${abs * 18}ms`,
                }}
                onClick={(e) => {
                  if (drag.current.moved) { e.preventDefault(); drag.current.moved = false; return }
                  if (abs !== 0) { e.preventDefault(); bumpIdle(); go(i) }
                }}
              >
                <div
                  className="pc-card-tilt"
                  onMouseMove={onCardTiltMove}
                  onMouseLeave={onCardTiltLeave}
                >
                  <div className="pc-card-inner" style={{ animationDelay: `${(i % 4) * 0.7}s` }}>
                    <img src={it.img} alt={it.title} loading="lazy" draggable={false} />
                    <div className="pc-card-shade" />
                    <div className="pc-card-shine" />
                    <div className="pc-card-info">
                      <span className="pc-num" style={display}>{it.n}</span>
                      <div>
                        <p className="pc-title" style={display}>{it.title}</p>
                        <p className="pc-tag">{it.tag}</p>
                      </div>
                    </div>
                    {abs === 0 && <span className="pc-go"><ArrowUpRight size={17} /></span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="pc-bottom">
        <button className="pc-arrow" onClick={() => { bumpIdle(); go(active - 1) }} aria-label="Previous project">
          <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <span className="pc-hint">Move, drag, or use ← →</span>
        <button className="pc-arrow" onClick={() => { bumpIdle(); go(active + 1) }} aria-label="Next project">
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

function Home() {
  const currentYear = new Date().getFullYear()

  const heroRef = useReveal()
  const aboutRef = useReveal()
  const workRef = useReveal()
  const brandsRef = useReveal()
  const marqueeRef = useReveal()
  const brandIndexRef = useReveal()
  const contactRef = useReveal()
  const magneticMail = useMagnetic(14)
  const heroCopyRef = useScrollFade(460)

  return (
    <div className="relative min-h-screen bg-[#08090A] text-[#F4F1EA] overflow-hidden" id="home">
      <ScrollProgress />
      <CustomCursor />

      {/* grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ================= HERO — one screen: header, name, custom looped video. Nothing else. ================= */}
      <section ref={heroRef} className="reveal relative z-10 h-[100svh] min-h-[560px] flex flex-col overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <HeroBackground />
        </div>

        <header className={`relative z-20 ${CONTAINER_MAX_W} w-full mx-auto ${CONTAINER_X} pt-8 flex items-center justify-between`}>
          <span className="text-sm lg:text-base tracking-[0.1em]" style={display}>ELIAS E.<sup className="text-[9px] align-super">°</sup></span>
          <div className="hidden lg:flex items-center gap-2 text-[10px] lg:text-[12px] tracking-[0.2em] uppercase text-white/40">
            <span className="size-1.5 rounded-full bg-[#7CE87C] animate-pulse-soft" /> Open for work
          </div>
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={`${navLink} ${underline}`}>{n.label}</a>
            ))}
          </nav>
          <a href="#contact" className={`lg:hidden ${navLink}`}>Menu</a>
        </header>

        <div ref={heroCopyRef} className={`relative z-20 ${CONTAINER_MAX_W} w-full mx-auto ${CONTAINER_X} mt-auto pb-12 lg:pb-16`}>
          <h1 className="leading-[0.9] font-bold" style={display}>
            <span className="block text-[16vw] sm:text-[8rem] lg:text-[8.6rem] tracking-[-0.02em]">ELIAS<sup className="text-[0.35em] align-super text-[#E8A853]">°</sup></span>
            {/* <span className="block text-[16vw] sm:text-[8rem] lg:text-[8.6rem] tracking-[-0.02em] text-white/25">
              E.
            </span> */}
          </h1>
        </div>

        <a href="#about" data-cursor="SCROLL" className={`scroll-cue absolute bottom-9 ${CONTAINER_EDGE} z-20 flex items-center gap-2 text-[10px] lg:text-[12px] tracking-[0.2em] uppercase text-white/40 hover:text-[#E8A853] transition-colors duration-300`}>
          Scroll <span className="scroll-cue-arrow">↓</span>
        </a>
      </section>

      <div className={`relative z-10 ${CONTAINER_MAX_W} mx-auto ${CONTAINER_X}`}>

        {/* ================= ABOUT ================= */}
        <section id="about" ref={aboutRef} className="reveal border-t border-white/[0.08] py-20 sm:py-28 lg:py-40">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] lg:text-[13px] tracking-[0.2em] uppercase text-white/35 mb-10">
            <span>Monolith Studios°, Founder</span>
            <span className="text-white/15">/</span>
            <span>Est. 2026</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <p className={`${body} max-w-md text-base`}>
              I'm Elias, I design brand systems and build the products that carry them.
              Mark to motion, page to launch, under one roof: <span className="text-[#E8A853]">Monolith Studios®</span>.
            </p>
            <a
              href="#work"
              data-cursor="VIEW"
              className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#E8A853] transition-colors duration-300 shrink-0"
            >
              View the work
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          <div className="flex mt-16 divide-x divide-white/[0.1]">
            {[
              { n: '04+', l: 'Years building' },
              { n: '60+', l: 'Clients worldwide' },
              { n: '50+', l: 'Projects completed' },
            ].map((s, i) => (
              <div
                key={s.l}
                className="stagger-item group px-7 first:pl-0 cursor-default"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <p className="text-xl md:text-2xl group-hover:text-[#E8A853] transition-colors duration-300" style={display}>{s.n}</p>
                <p className="text-[11px] lg:text-[13px] text-white/40 font-light mt-2 tracking-wide">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-8 lg:gap-12 mt-24 lg:mt-28">
            <img
              src={me}
              alt="Elias - designer"
              className="hidden sm:block rounded-2xl size-24 lg:size-28 object-cover grayscale hover:grayscale-0 transition-all duration-500 shrink-0 ring-1 ring-white/[0.1]"
              loading="lazy"
            />
            <div className="flex-1">
              <p className={eyebrow}>About</p>
              <p className="mt-5 text-2xl sm:text-3xl lg:text-4xl leading-[1.3] max-w-3xl" style={display}>
                No decoration for the sake of decoration.{' '}
                <span style={serif} className="text-[#E8A853] font-normal">No design without a reason.</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mt-16 lg:mt-20">
            <div className="stagger-item">
              <h3 className="mb-3 text-[1.05rem] lg:text-[1.3rem]" style={display}>More Than A Designer</h3>
              <ScrollText
                className={body}
                text="I work where brand, design, and technology meetm from identity systems and visual direction to websites and web applications, handling everything from concept to execution."
              />
            </div>
            <div className="stagger-item" style={{ transitionDelay: '120ms' }}>
              <h3 className="mb-3 text-[1.05rem] lg:text-[1.3rem]" style={display}>How I Work</h3>
              <ScrollText
                className={body}
                text="I start with the problem, understand the business, then build the visual and digital system around it. The result should look right, work properly, and still make sense long after launch."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-14">
            {['Brand Identity', 'Art Direction', 'Web Development', 'Creative Direction', 'Brand Strategy', 'Visual Systems'].map((skill, i) => (
              <span
                key={skill}
                className="stagger-item text-[11px] lg:text-[13px] text-white/40 border border-white/[0.1] rounded-full px-3.5 py-1.5 hover:text-[#E8A853] hover:border-[#E8A853]/40 transition-colors duration-300 cursor-default"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* ================= WORK ================= */}
        <section id="work" ref={workRef} className="reveal border-t border-white/[0.08] py-20 sm:py-28 lg:py-40">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className={eyebrow}>Selected Work</p>
              <p className="mt-2.5 text-xs text-white/30">Drag to explore →</p>
            </div>
            <Link to="/projects/logos&brand-designs" data-cursor="OPEN" className="hidden sm:inline-flex items-center gap-1 text-xs lg:text-sm font-medium text-white/60 hover:text-[#E8A853] transition-colors duration-300">
              Full portfolio <ArrowRight size={13} />
            </Link>
          </div>

          <DragRail>
            {WORK.map((w, i) => {
              /* Cards that point at a full URL (external sites already
                 live on the web) render as a plain <a> opened in a new
                 tab; everything else keeps using React Router's <Link>
                 for in-app navigation. */
              const isExternal = w.external || /^https?:\/\//.test(w.to)
              const CardTag = isExternal ? 'a' : Link
              const cardProps = isExternal
                ? { href: w.to, target: '_blank', rel: 'noopener noreferrer' }
                : { to: w.to }

              return (
                <CardTag
                  {...cardProps}
                  key={w.title}
                  data-cursor="VIEW"
                  className="work-card stagger-item group"
                  style={{ transitionDelay: `${i * 110}ms` }}
                >
                  <div className="work-card-img">
                    {w.video ? (
                      <video
                        className="work-card-video"
                        src={w.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      />
                    ) : (
                      <img src={w.img} alt={w.title} loading="lazy" />
                    )}
                    <span className="work-card-idx" style={display}>{w.idx}</span>
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] lg:text-[13px] uppercase tracking-[0.16em] text-white/35">{w.label}</p>
                      <h3 className="mt-2 text-2xl lg:text-3xl" style={display}>{w.title}</h3>
                      <p className={`${body} mt-2.5 max-w-sm text-[13px] lg:text-[15px]`}>{w.desc}</p>
                    </div>
                    <ArrowUpRight size={20} className="shrink-0 text-white/30 group-hover:text-[#E8A853] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </CardTag>
              )
            })}
          </DragRail>
        </section>

        {/* ================= BRANDS ================= */}
        <section id="brands" ref={brandsRef} className="reveal border-t border-white/[0.08] py-20 sm:py-28 lg:py-40">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className={eyebrow}>Brands I've Built</p>
              <p className="mt-2.5 text-xs text-white/30">Drag through the reel →</p>
            </div>
            <Link to="/projects/logos&brand-designs" data-cursor="ALL" className="hidden sm:inline-flex items-center gap-1 text-xs lg:text-sm font-medium text-white/60 hover:text-[#E8A853] transition-colors duration-300">
              All brands <ArrowRight size={13} />
            </Link>
          </div>
        </section>

        {/* the carousel breaks out of the container edge-to-edge, so it lives outside the max-width wrapper — see below */}
      </div>

      {/* full-bleed 3D perspective project carousel — the "reveal" reel */}
      <div ref={marqueeRef} className="reveal">
        <ProjectCarousel items={BRANDS} />
      </div>

      <div className={`relative z-10 ${CONTAINER_MAX_W} mx-auto ${CONTAINER_X}`}>
        {/* index of the same brands — read the names, jump straight to the case study */}
        <section ref={brandIndexRef} className="reveal pt-16 pb-20 lg:pb-32">
          <div className="flex flex-col divide-y divide-white/[0.08] border-t border-y-0 border-white/[0.08]">
            {BRANDS.map((b, i) => (
              <Link
                to={b.to}
                key={b.title}
                data-cursor="OPEN"
                className="brand-row group"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="text-xs text-white/25 w-8 shrink-0" style={display}>{b.n}</span>
                <span className="flex-1 text-2xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-white/85 group-hover:text-[#E8A853] group-hover:translate-x-1.5 transition-all duration-300" style={display}>
                  {b.title}
                </span>
                <span className="hidden sm:block text-[11px] lg:text-[13px] uppercase tracking-[0.16em] text-white/30 shrink-0">{b.tag}</span>
                <ArrowUpRight size={20} className="shrink-0 text-white/25 group-hover:text-[#E8A853] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" ref={contactRef} className="reveal border-t border-white/[0.08] pt-20 lg:pt-32 pb-20">
          <p className={`${eyebrow} stagger-item`}>Contact</p>
          <h2 className="stagger-item mt-6 text-[2.2rem] sm:text-[3.2rem] lg:text-[4.2rem] leading-[1.05]" style={{ ...display, transitionDelay: '80ms' }}>
            Got a brand<br className="hidden sm:block" /> worth building{' '}
            <span style={serif} className="text-[#E8A853] font-normal">right?</span>
          </h2>
          <p className={`${body} stagger-item max-w-sm mt-8`} style={{ transitionDelay: '160ms' }}>
            A brand to build, a website to launch, or an idea that needs to become realm tell me about it.
            I respond Immediately
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-11 stagger-item" style={{ transitionDelay: '220ms' }}>
            {/* <a
              ref={magneticMail}
              href="mailto:eonvx3@gmail.com"
              data-cursor="WRITE"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/[0.1] hover:border-[#E8A853]/50 rounded-full px-6 py-3.5 transition-colors duration-300"
            >
              <Mail size={15} /> eonvx3@gmail.com
            </a> */}
            <Link
              to="/workwithme"
              className="inline-flex items-center gap-2 text-sm lg:text-base text-white/60 hover:text-white border border-white/[0.1] hover:border-[#E8A853]/50 rounded-full px-6 py-3.5 transition-colors duration-300"
            >
              <MessageCircle size={15} /> Write to Me
            </Link>
          </div>

          <div className="flex gap-3 mt-14 stagger-item" style={{ transitionDelay: '280ms' }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="group flex items-center justify-center size-10 rounded-full border border-white/[0.1] text-white/40 hover:text-[#E8A853] hover:border-[#E8A853]/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <s.Icon size={16} strokeWidth={1.75} />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between mt-24 pt-8 border-t border-white/[0.08]">
            <a href="https://linkedin.com/in/emmanuel-ayeni01" className="opacity-60 hover:opacity-100 transition-opacity duration-300">
              <img src={signature} alt="Signature" className="h-16" />
            </a>
            <p className="text-xs lg:text-sm text-white/30">© {currentYear} Elias E.</p>
          </div>
        </section>
      </div>

      <BottomMenu />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@1&display=swap');

        html { scroll-behavior: smooth; }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1); }
        .reveal.is-in { opacity: 1; transform: translateY(0); }

        /* generic staggered child — pairs with an ancestor .reveal; give each child its own transitionDelay */
        .stagger-item { opacity: 0; transform: translateY(16px); transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
        .reveal.is-in .stagger-item { opacity: 1; transform: translateY(0); }

        @keyframes pulse-soft { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .animate-pulse-soft { animation: pulse-soft 2.4s ease-in-out infinite; }

        /* scroll progress bar */
        .scroll-progress { position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 70; background: rgba(255,255,255,0.05); }
        .scroll-progress-bar { height: 100%; width: 0%; background: linear-gradient(90deg, #E8A853, #FF6E4E, #8F7CFF, #47D6C6); }

        /* hero background video — desktop and mobile cuts, swapped purely by media query */
        .hero-bg-stage { position: absolute; inset: 0; overflow: hidden; }
        .hero-bg-layer { position: absolute; inset: -4% -2%; }
        .hero-bg-video {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          opacity: 0; transform: scale(1.05);
          animation: hero-bg-in 1.6s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .hero-bg-video--desktop { display: none; }
        .hero-bg-video--mobile { display: block; }
        @media (min-width: 1024px) {
          .hero-bg-video--desktop { display: block; }
          .hero-bg-video--mobile { display: none; }
        }
        @keyframes hero-bg-in { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
        .hero-bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(8,9,10,0.5) 0%, rgba(8,9,10,0.1) 32%, rgba(8,9,10,0.3) 62%, rgba(8,9,10,0.88) 100%);
        }

        /* scroll cue */
        .scroll-cue-arrow { display: inline-block; animation: cue-bob 1.8s ease-in-out infinite; }
        @keyframes cue-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }

        /* scroll-scrubbed words */
        .scroll-word { display: inline-block; opacity: 0.2; transition: opacity 0.1s linear; will-change: opacity; }

        /* custom cursor */
        .custom-cursor {
          position: fixed; top: 0; left: 0; width: 10px; height: 10px; border-radius: 999px;
          background: #E8A853; pointer-events: none; z-index: 999; mix-blend-mode: difference;
          transition: width 0.25s, height 0.25s, background 0.25s;
        }
        .custom-cursor.is-labeled {
          width: 64px; height: 64px; background: rgba(244,241,234,0.92); mix-blend-mode: normal;
          display: flex; align-items: center; justify-content: center;
        }
        .custom-cursor span { color: #08090A; font-size: 9px; letter-spacing: 0.12em; font-weight: 600; }
        @media (hover: hover) and (pointer: fine) {
          [data-cursor] { cursor: none; }
        }

        /* drag gallery */
        .drag-rail {
          display: flex; gap: 1.75rem; overflow-x: auto; cursor: grab; padding-bottom: 0.5rem;
          scroll-snap-type: x proximity; -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .drag-rail::-webkit-scrollbar { display: none; }
        .drag-rail.is-dragging { cursor: grabbing; scroll-snap-type: none; }
        .work-card { flex: 0 0 min(560px, 82vw); scroll-snap-align: start; }
        .work-card-img { position: relative; border-radius: 1.1rem; overflow: hidden; aspect-ratio: 4/3; box-shadow: 0 0 0 1px rgba(255,255,255,0.06); }
        .work-card-img img {
          width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.05);
          transform: scale(1.02); transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.7s ease;
        }
        .work-card:hover .work-card-img img { filter: grayscale(0); transform: scale(1.08); }
        /* looped video cover for the WEBSITES card — same grayscale-to-color
           hover treatment as the static images above, applied to <video> */
        .work-card-video {
          width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.05);
          transform: scale(1.02); transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.7s ease;
          background: #111;
        }
        .work-card:hover .work-card-video { filter: grayscale(0); transform: scale(1.08); }
        .work-card-idx {
          position: absolute; bottom: 12px; left: 14px; font-size: 12px; letter-spacing: 0.1em;
          color: rgba(244,241,234,0.7); background: rgba(8,9,10,0.55); backdrop-filter: blur(6px);
          padding: 3px 9px; border-radius: 999px;
        }

        /* ============ 3D coverflow-ring project carousel ============ */
        .pc-stage {
          position: relative; width: 100vw; margin-left: calc(50% - 50vw);
          height: 480px; background: #050506; overflow: hidden;
          perspective: 1700px;
        }
        @media (min-width: 640px)  { .pc-stage { height: 560px; } }
        @media (min-width: 1024px) { .pc-stage { height: 640px; } }

        .pc-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 45% at 50% 42%, rgba(232,168,83,0.10), transparent 70%);
        }

        .pc-floor {
          position: absolute; left: 0; right: 0; bottom: 0; height: 46%;
          background-image:
            linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px);
          background-size: 56px 56px;
          transform: perspective(600px) rotateX(58deg);
          transform-origin: bottom center;
          -webkit-mask-image: linear-gradient(to top, black, transparent 92%);
          mask-image: linear-gradient(to top, black, transparent 92%);
          opacity: 0.55;
        }

        .pc-top {
          position: absolute; top: 26px; left: 0; right: 0; z-index: 30;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(20px, 5vw, 64px);
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        @media (min-width: 1024px) { .pc-top { font-size: 12px; } }
        .pc-count { color: rgba(255,255,255,0.28); font-variant-numeric: tabular-nums; letter-spacing: 0.14em; }

        /* mouse-driven parallax wrapper — sits between the stage and the
           track, updated every frame via a lerped rAF loop in JS (no CSS
           transition here, or it would fight/lag the per-frame writes) */
        .pc-tiltwrap {
          position: absolute; inset: 0;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .pc-track {
          position: relative; height: 100%; width: 100%;
          transform-style: preserve-3d;
          display: flex; align-items: center; justify-content: center;
          cursor: grab; touch-action: pan-y; user-select: none;
          transform: rotateX(3deg) rotateZ(0deg);
          transition: transform 0.7s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pc-track:active { cursor: grabbing; }

        .pc-card {
          position: absolute; width: min(500px, 60vw); aspect-ratio: 4/3;
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 40px 80px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06);
          transition: transform 0.85s cubic-bezier(0.34,1.56,0.64,1), opacity 0.6s ease, filter 0.6s ease;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-touch-callout: none;
        }
        .pc-card.is-active {
          box-shadow: 0 50px 100px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(232,168,83,0.4), 0 0 46px -12px rgba(232,168,83,0.3);
        }

        /* per-card pointer tilt — an independent layer, written to
           directly on mousemove/mouseleave so it never collides with the
           ring-position transform on .pc-card or the float keyframes on
           .pc-card-inner */
        .pc-card-tilt {
          position: absolute; inset: 0;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .pc-card-inner {
          position: absolute; inset: 0;
          animation: pc-float 5.5s ease-in-out infinite;
        }
        .pc-card img {
          width: 100%; height: 100%; object-fit: cover; object-position: center;
          background: #111; transform: scale(1.07);
        }
        .pc-card-shade {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 45%, transparent 65%);
        }
        .pc-card-shine {
          position: absolute; inset: -20% -40%;
          background: linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.22) 50%, transparent 58%);
          transform: translateX(-120%);
          pointer-events: none;
        }
        .pc-card.is-active .pc-card-shine { animation: pc-shine 3.4s ease-in-out infinite; }

        .pc-card-info {
          position: absolute; left: 18px; right: 18px; bottom: 15px; z-index: 3;
          display: flex; align-items: flex-end; gap: 10px; color: #fff;
        }
        .pc-num { font-size: 11px; opacity: 0.5; }
        .pc-title { font-size: 15px; letter-spacing: 0.01em; line-height: 1.2; }
        .pc-tag { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.45); margin-top: 3px; }
        @media (min-width: 1024px) {
          .pc-num { font-size: 13px; }
          .pc-title { font-size: 19px; }
          .pc-tag { font-size: 12px; }
        }
        .pc-card:not(.is-active) .pc-card-info { opacity: 0; transform: translateY(6px); transition: opacity 0.4s ease, transform 0.4s ease; }
        .pc-card.is-active .pc-card-info { opacity: 1; transform: translateY(0); transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s; }

        .pc-go {
          position: absolute; right: 14px; top: 14px; z-index: 3;
          width: 34px; height: 34px; border-radius: 999px;
          background: rgba(255,255,255,0.12); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center; color: #fff;
          animation: pc-pop 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes pc-float {
          0%, 100% { transform: translateY(0) rotateZ(0deg); }
          50% { transform: translateY(-5px) rotateZ(0.4deg); }
        }
        @keyframes pc-shine {
          0% { transform: translateX(-120%); }
          55%, 100% { transform: translateX(120%); }
        }
        @keyframes pc-pop {
          0% { transform: scale(0.4); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }

        .pc-bottom {
          position: absolute; bottom: 20px; left: 0; right: 0; z-index: 30;
          display: flex; align-items: center; justify-content: center; gap: 18px;
        }
        .pc-arrow {
          width: 34px; height: 34px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: center;
          transition: color 0.3s, border-color 0.3s;
        }
        .pc-arrow:hover { color: #E8A853; border-color: rgba(232,168,83,0.5); }
        .pc-hint { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        @media (min-width: 1024px) { .pc-hint { font-size: 12px; } }

        /* brand index rows */
        .brand-row {
          display: flex; align-items: center; gap: 1.5rem; padding: 1.75rem 0.5rem;
          opacity: 0; transform: translateY(18px) scale(0.99); filter: blur(4px);
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.7s ease;
        }
        .reveal.is-in .brand-row { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .hero-bg-video { animation: none; opacity: 1; transform: none; }
          .work-card-img img { transition: none; }
          .work-card-video { transition: none; }
          .brand-row { transition: none; opacity: 1; transform: none; filter: none; }
          .stagger-item { transition: none; opacity: 1; transform: none; }
          .scroll-cue-arrow { animation: none; }
          .scroll-word { opacity: 1 !important; }
          .pc-card, .pc-track { transition: none; }
          .pc-card-inner, .pc-card-shine, .pc-go { animation: none; }
        }
      `}</style>
    </div>
  )
}

export default Home