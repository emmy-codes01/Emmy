import React, { useEffect } from 'react'
import ScrollReveal from 'scrollreveal';
import ButtonGroup from '../components/ButtonGroup';

const Websites = () => {



  const currentYear = new Date().getFullYear();

    
    // SCROLL REVEAL

 useEffect(() => {
    // ScrollReveal setup
    ScrollReveal().reveal('.reveal', {
      distance: '50px',
      duration: 1000,
      delay: 200,
      reset: false, // Optional: Reset animation on scroll back
      scale: 0.8, // Optional: You can scale the element
    });
   
   
 ScrollReveal().reveal(".reveal1", {
      origin: "left",
      distance: "800px",
      duration: 1200,
      delay: 200,
      reset: true,
    });
    ScrollReveal().reveal(".reveal2", {
      origin: "right",
      distance: "800px",
      duration: 1200,
      delay: 200,
      reset: true,
    });
   
   
   
  }, []);
    


  return (
    <div className='flex flex-col text-white items-stretch gap-4 px-5 lg:px-85 py-5 lg:py-15'>
      {/* Heading */}
      <div>
        <h4 className='reveal md:gap-14 lg:gap-52 bg-white/3 border border-zinc-900 border-3xl p-5 rounded-3xl text-2xl font-semibold shadow-md shadow-indigo-500'>Websites <span className='text-indigo-500'>&</span> Landingpages</h4>
      </div>



      <footer className="w-full bg-transparent py-6 border-t border-gray-800 mt-16 mb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Copyright and name */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              <span className="font-medium text-white">Emmanuel Ayeni</span> © {currentYear} All rights reserved
            </p>
          </div>
          
          {/* Middle - Navigation */}
          {/* <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-6">
              <li><a href="#home" className="text-gray-400 hover:text-white text-sm transition duration-300">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white text-sm transition duration-300">About</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white text-sm transition duration-300">Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white text-sm transition duration-300">Contact</a></li>
            </ul>
          </nav> */}
          
          {/* Right side - Email */}
          {/* <div className="text-center md:text-right">
            <a 
              href="mailto:eayeni105@gmail.com" 
              className="text-gray-400 shadow-md flex gap-1.5 shadow-indigo-500 p-4 rounded-2xl text-sm hover:text-indigo-400 transition duration-300"
                >
               <Mail size={24} />   
              eayeni105@gmail.com
            </a>
          </div> */}
        </div>
      </div>
    </footer>
<ButtonGroup />
    </div>
  )
}

export default Websites