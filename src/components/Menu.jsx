import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Mail, Menu, X } from 'lucide-react';

const display = { fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif" }
const ACCENT = '#E8A853'

const BottomMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'work', icon: Briefcase, label: 'Work' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Adding offset to improve detection

      // Find all sections and determine which one is in view
      const sections = menuItems.map(item => document.getElementById(item.id)).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveItem(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation method using direct scrolling
  const handleNavClick = (e, id) => {
    e.preventDefault(); // Prevent default anchor behavior

    // Update active state
    setActiveItem(id);

    // Close the menu
    setIsExpanded(false);

    // Get the target element
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // Calculate position to scroll to
      const headerOffset = 80; // Adjust based on your header height if needed
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Perform smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed bottom-5 left-0 right-0 z-50 lg:flex justify-center items-center px-4 animate-float hidden">
      <div
        className={`relative backdrop-blur-xl bg-white/[0.04] border border-white/[0.1] rounded-3xl transition-all duration-300 flex items-center ${
          isExpanded ? 'py-2 px-5 w-full max-w-md border-[#E8A853]/20' : 'p-1'
        }`}
        style={{
          boxShadow: isExpanded
            ? '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 24px rgba(232, 168, 83, 0.08)'
            : '0 8px 32px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleMenu}
          aria-label={isExpanded ? 'Close menu' : 'Open menu'}
          className="absolute left-3 z-10 bg-[#E8A853] hover:bg-[#f2d6a3] hover:scale-105 rounded-full p-2 transition-all duration-300"
        >
          {isExpanded ? <X size={20} color="black" /> : <Menu size={20} color="black" />}
        </button>

        {/* Menu Items */}
        <div className={`flex justify-between items-center w-full transition-all duration-300 ${
          isExpanded ? 'opacity-100 ml-10' : 'opacity-0 pointer-events-none'
        }`}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;

            return (
              <a
                href={`#${item.id}`}
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex flex-col items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'text-[#E8A853] scale-110'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                <div className={`relative p-2 ${isActive ? 'before:content-[""] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-1 before:bg-[#E8A853] before:rounded-full before:animate-pulse-soft' : ''}`}>
                  <IconComponent size={20} strokeWidth={isActive ? 2 : 1.75} />
                </div>
                <span className="text-[8px] mt-1 tracking-wide" style={display}>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Hidden Collapsed View */}
        <div className={`absolute inset-0 flex justify-center items-center transition-all duration-300 ${
          isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          <span className="text-xs font-semibold tracking-[0.2em] text-white/80 ml-8" style={display}>NAVIGATE</span>
        </div>
      </div>

      {/* Floating Indicator - Shows on hover/tap outside expanded menu */}
      <div
        className={`absolute bottom-full mb-4 bg-[#E8A853] text-black px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
          isExpanded ? 'opacity-0 pointer-events-none transform translate-y-2' : 'opacity-0'
        }`}
        style={display}
      >
        Tap to explore
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 1.8s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-float, .animate-pulse-soft { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default BottomMenu;