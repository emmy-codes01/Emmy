import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, X, WifiLow } from 'lucide-react';

/* Matches Home / NotFound: Space Grotesk for the title, flat
   dark glass instead of a colored gradient shell, amber/violet
   as the two accents, neutral border instead of a colored glow. */
const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }

const NetworkStatusDetector = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    isOnline: navigator.onLine,
    isWeak: false,
    latency: 0
  });
  const [showNotification, setShowNotification] = useState(false);
  const [hasHadIssue, setHasHadIssue] = useState(false);

  // Function to test connection speed/quality
  const checkConnectionQuality = () => {
    // Only check if we're online
    if (!navigator.onLine) return;

    const startTime = Date.now();

    // Fetch a small resource to test latency
    fetch('/favicon.ico', { cache: 'no-store' })
      .then(response => {
        const latency = Date.now() - startTime;
        const isWeak = latency > 600; // Consider connection weak if latency > 600ms

        setConnectionStatus(prev => ({
          ...prev,
          isWeak,
          latency
        }));

        // Show notification if connection is weak and we haven't shown one already
        if (isWeak && !showNotification) {
          setHasHadIssue(true);
          setShowNotification(true);
          // Auto-hide after 5 seconds
          setTimeout(() => setShowNotification(false), 7000);
        }
      })
      .catch(() => {
        // If fetch fails but navigator.onLine is true, it might be a weak connection
        setConnectionStatus(prev => ({
          ...prev,
          isWeak: true
        }));
        setHasHadIssue(true);
        setShowNotification(true);
      });
  };

  useEffect(() => {
    // Handler functions
    const handleOnline = () => {
      setConnectionStatus(prev => ({
        ...prev,
        isOnline: true
      }));

      if (hasHadIssue) {
        setShowNotification(true);
        // Auto-hide the notification after 5 seconds
        setTimeout(() => setShowNotification(false), 5000);
      }

      // Check quality after connection is restored
      setTimeout(checkConnectionQuality, 1000);
    };

    const handleOffline = () => {
      setConnectionStatus(prev => ({
        ...prev,
        isOnline: false
      }));
      setHasHadIssue(true);
      setShowNotification(true);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection quality initially and periodically
    checkConnectionQuality();
    const intervalId = setInterval(checkConnectionQuality, 30000); // Check every 30 seconds

    // Also check when resources fail to load
    const handleResourceError = () => {
      checkConnectionQuality();
    };

    window.addEventListener('error', handleResourceError, true);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('error', handleResourceError, true);
      clearInterval(intervalId);
    };
  }, [hasHadIssue]);

  // Helper function to get notification content based on connection status
  const getNotificationContent = () => {
    if (!connectionStatus.isOnline) {
      return {
        icon: <WifiOff className="text-red-400/90 h-5 w-5" strokeWidth={1.75} />,
        iconBg: 'bg-red-400/10',
        dot: 'bg-red-500',
        pulse: true,
        title: 'No Internet Connection',
        message: 'Please check your internet connection and reload.'
      };
    } else if (connectionStatus.isWeak) {
      return {
        icon: <WifiLow className="text-[#E8A853] h-5 w-5" strokeWidth={1.75} />,
        iconBg: 'bg-[#E8A853]/10',
        dot: 'bg-[#E8A853]',
        pulse: true,
        title: 'Weak Connection Detected',
        message: `Slow loading might occur in some images. Network latency: ${connectionStatus.latency}ms`
      };
    } else {
      return {
        icon: <Wifi className="text-[#7CE87C] h-5 w-5" strokeWidth={1.75} />,
        iconBg: 'bg-[#7CE87C]/10',
        dot: 'bg-[#7CE87C]',
        pulse: false,
        title: 'Connection Restored',
        message: 'Your connection has been restored. You can continue exploring.'
      };
    }
  };

  // Don't render anything if there's no notification to show
  if (!showNotification) return null;

  const content = getNotificationContent();

  return (
    <div className="fixed top-6 right-6 left-6 md:left-auto md:w-96 z-50 flex items-start gap-3 bg-[#0a0a0b]/95 border border-white/[0.1] rounded-2xl p-4 shadow-lg shadow-black/40 backdrop-blur-xl animate-toast-in">
      <div className={`relative flex items-center justify-center size-9 rounded-full ${content.iconBg} shrink-0`}>
        {content.icon}
        <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${content.dot} ${content.pulse ? 'animate-pulse-soft' : ''}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-white" style={display}>{content.title}</p>
        <p className="text-xs text-white/45 font-light leading-relaxed mt-0.5">{content.message}</p>
      </div>

      <button
        onClick={() => setShowNotification(false)}
        aria-label="Dismiss"
        className="text-white/35 hover:text-white transition-colors duration-300 shrink-0 -mr-1 -mt-1 p-1"
      >
        <X size={16} />
      </button>

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .animate-toast-in { animation: toast-in 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-toast-in, .animate-pulse-soft { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default NetworkStatusDetector;