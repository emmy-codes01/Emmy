import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import ScrollReveal from 'scrollreveal';
import BottomMenu from './Menu';

const NotFound = () => {
  useEffect(() => {
    // ScrollReveal setup
    ScrollReveal().reveal('.reveal', {
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'ease-in-out',
      opacity: 0,
      reset: false,
      scale: 0.8,
    });
  }, []);

  return (
    <div className='flex flex-col text-white min-h-screen px-5 lg:px-45 py-10 lg:py-20'>
      <div className='flex-grow flex flex-col items-center justify-center'>
        {/* 404 Main Content */}
        <div className='reveal transition-all border border-zinc-900 flex flex-col justify-center items-center bg-white/3 py-10 px-5 rounded-4xl w-full max-w-xl shadow-lg shadow-indigo-500/30'>
          {/* 404 Text */}
          <h1 className='font-bold text-6xl md:text-8xl mb-2 text-indigo-400 reveal'>404</h1>
          <div className='w-20 h-1 bg-indigo-500 rounded-full mb-6 reveal'></div>
          
          <h2 className='font-semibold text-xl md:text-2xl mb-4 reveal'>Page Not Found</h2>
          <p className='text-sm md:text-base text-center opacity-70 mb-8 max-w-md reveal' style={{fontWeight: '300'}}>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          
          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 reveal'>
            <Link to="/" className='bg-indigo-500 hover:bg-indigo-600 transition-colors text-white px-6 py-3 rounded-full shadow-md flex items-center justify-center gap-2'>
              <Home size={18} />
              Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className='bg-white/4 hover:bg-white/8 transition-colors px-6 py-3 rounded-full shadow-md flex items-center justify-center gap-2'
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className='grid grid-cols-3 gap-4 mt-8 w-full max-w-md reveal'>
          <div className='h-2 bg-indigo-500/30 rounded-full'></div>
          <div className='h-2 bg-indigo-500/50 rounded-full'></div>
          <div className='h-2 bg-indigo-500/70 rounded-full'></div>
        </div>
      </div>
      
      {/* Footer with copyright */}
      <footer className="w-full bg-transparent py-6 border-t border-gray-800 mt-auto mb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <p className="text-gray-400 text-sm">
              <span className="font-medium text-white">Emmanuel Ayeni</span> © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
      
      {/* Bottom Menu */}
      <BottomMenu />
      
      {/* Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;