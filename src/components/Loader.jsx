import React, { useEffect, useState } from 'react';

const ACCENT = '#E8A853';
const SIZE = 64;
const STROKE = 1.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const FuturisticLoader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let interval;

    if (isLoading) {
      setVisible(true);
      // Use a more reliable approach for progress incrementation
      interval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + 1;
          // Force completion after a timeout to prevent hanging
          if (newValue >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newValue;
        });
      }, 25);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  // Handle completion and transition separately
  useEffect(() => {
    let hideTimer;

    if (progress >= 100 && !isLoading) {
      hideTimer = setTimeout(() => {
        setVisible(false);
      }, 800); // Slightly longer delay for smoother transition
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [progress, isLoading]);

  // Add a safety timeout to ensure the loader always completes
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      if (progress < 100) {
        setProgress(100);
      }
    }, 4000); // Force completion after 4 seconds max

    return () => clearTimeout(safetyTimeout);
  }, []);

  // If not visible, don't render anything
  if (!visible) return null;

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <div className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-700 ${!isLoading && progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative animate-breathe" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="animate-spin-slow"
        >
          <defs>
            <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* faint track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth={STROKE}
          />

          {/* progress arc */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="url(#loaderGradient)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
          />
        </svg>

        {/* still center point */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 3, height: 3, backgroundColor: ACCENT, opacity: 0.6 }}
        />
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(0.94); opacity: 1; }
        }
        .animate-spin-slow { animation: spin-slow 2.2s linear infinite; }
        .animate-breathe { animation: breathe 2.8s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-spin-slow, .animate-breathe { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default FuturisticLoader;