import React from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from './Menu';
import { ArrowLeft, Compass, ArrowUpRight } from 'lucide-react'

/* ---------------------------------------------------------
   Same type system and palette as Home:
   Space Grotesk for display, warm amber/violet gradient
   accent, grain texture, drifting blobs. Requires the
   Space Grotesk webfont — add this to your document <head>
   for best performance:
   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
   --------------------------------------------------------- */
const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }

const eyebrow = 'text-[10px] tracking-[0.16em] uppercase text-white/35 font-medium'
const body = 'text-sm text-white/50 font-light leading-relaxed'

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#f2f0ec] overflow-hidden flex flex-col">
      {/* grain texture — matches Home */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* drifting blobs — same ambient signature as Home */}
      <div
        className="pointer-events-none fixed -top-32 left-[8%] w-[34rem] h-[34rem] z-0 opacity-[0.16] blur-[110px] animate-drift-a"
        style={{ background: 'radial-gradient(circle, #E8A853, transparent 65%)' }}
      />
      <div
        className="pointer-events-none fixed bottom-[-10%] right-[6%] w-[30rem] h-[30rem] z-0 opacity-[0.13] blur-[110px] animate-drift-b"
        style={{ background: 'radial-gradient(circle, #7C6FF0, transparent 65%)' }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="animate-float-slow flex items-center justify-center size-14 rounded-full border border-white/[0.1] text-[#E8A853]/80 mb-8">
          <Compass size={22} strokeWidth={1.5} className="animate-spin-slow" />
        </div>

        <p className={eyebrow}>Error 404</p>

        <h1
          className="mt-4 text-[4.5rem] md:text-[7rem] leading-none bg-gradient-to-r from-[#E8A853] to-[#7C6FF0] bg-clip-text text-transparent animate-float-slow"
          style={display}
        >
          404
        </h1>

        <h2 className="mt-4 text-xl md:text-2xl" style={display}>
          This page wandered off somewhere.
        </h2>
        <p className={`${body} max-w-sm mt-3`}>
          The page you're looking for doesn't exist, moved, or never made it past the sketch phase. Let's get you back on track.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-full bg-[#E8A853] text-black hover:bg-[#f2d6a3] transition-colors duration-300"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border border-white/[0.1] hover:border-[#E8A853]/50 rounded-full px-5 py-3 transition-colors duration-300"
          >
            See my work <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <BottomMenu />

      <style>{`
        @keyframes drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, 6%) scale(1.08); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-5%, -4%) scale(1.06); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-drift-a { animation: drift-a 18s ease-in-out infinite; }
        .animate-drift-b { animation: drift-b 22s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4.5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-drift-a, .animate-drift-b, .animate-float-slow, .animate-spin-slow { animation: none; }
        }
      `}</style>
    </div>
  )
}

export default NotFound