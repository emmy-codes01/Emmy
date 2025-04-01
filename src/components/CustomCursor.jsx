import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Optional: Simplified trail with just 2 dots instead of 5
  const trailCount = 2;
  const trails = Array(trailCount).fill().map((_, i) => {
    const size = 4 - (i * 1);
    const opacity = 0.4 - (i * 0.2);
    const delay = i * 50;

    return (
      <div 
        key={i}
        className="fixed rounded-full bg-indigo-400 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: opacity,
          transitionDuration: `${delay}ms`,
        }}
      />
    );
  });

  return (
    <>
      {/* Minimal trail effect */}
      {trails}
      
      {/* Main cursor - much smaller now */}
      <div 
        className={`fixed rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 mix-blend-difference
          ${isHovering ? 'w-5 h-5 bg-white' : 'w-3 h-3 bg-indigo-400 border border-white border-opacity-60'} 
          ${isClicking ? 'scale-90' : 'scale-100'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      />
      
      {/* Center dot - smaller */}
      <div 
        className={`fixed w-1 h-1 rounded-full bg-white pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75
          ${isClicking ? 'scale-150' : 'scale-100'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;