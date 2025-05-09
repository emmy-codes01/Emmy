import React, { useEffect } from 'react'
import ScrollReveal from 'scrollreveal';
import ButtonGroup from '../components/ButtonGroup';
import { ArrowRight, ArrowUp, ArrowDown, X, Eye, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import ig from '../assets/images/Instagram.png'
import li from '../assets/images/LinkedIn.png'
import wa from '../assets/images/WhatsApp.png'
import grid from '../assets/images/OASIS.png'
import CRESTORA from '../assets/images/CRESTORA.png'
import upwavelogo from '../assets/images/upwavelogo.png'
import RCR from '../assets/images/RCR.png'
import SMITHXM from '../assets/images/SMITHXM.png'
import KONNEX from '../assets/images/KONNEX.png'
import KRONIK from '../assets/images/KRONIK.png'



const Brands = () => {

    React.useEffect(() => {
    // Set page title when component mounts
    document.title = "Brands Designed by Emmy";
    
    // Optional: Reset title when component unmounts
    return () => {
      document.title = "Emmanuel Ayeni";
    };
  }, []);

  const currentYear = new Date().getFullYear();

    
    // SCROLL REVEAL

 useEffect(() => {
    // ScrollReveal setup
    ScrollReveal().reveal('.reveal', {
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'ease-in-out',
      opacity: 0,
      reset: false, // Optional: Reset animation on scroll back
      scale: 0.8, // Optional: You can scale the element
    });
   
   
 ScrollReveal().reveal(".reveal1", {
      origin: "left",
      distance: "800px",
      duration: 1200,
      delay: 200,
      reset: false,
    });
    ScrollReveal().reveal(".reveal2", {
      origin: "right",
      distance: "800px",
      duration: 1200,
      delay: 200,
      reset: false,
    });
   
   
   
  }, []);
    


  return (
     <div className='flex flex-col text-white items-stretch gap-4 px-5 lg:px-85 py-5 lg:py-15'>
      {/* Heading */}
       <div className='flex flex-col bg-white/3 border border-zinc-900 rounded-3xl border-3xl p-5 shadow-md shadow-indigo-500'>
        <h4 className=' text-lg font-semibold '>LOGOS & BRAND <span className='text-indigo-500'>IDENTITIES</span></h4>
        <p className='font-light opacity-70 text-[10px]'>Some lucky brands that were designed by me</p>
      </div>
    
      

  
      {/* Cards wrapper */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one - OASIS */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={grid} alt="logo compilation" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>URBAN STREETWEAR CLOTHING</p>
                  <p className='font-semibold'>OASIS NG</p>
                </div>
                <Link to="/projects/logos&brand-designs/oasis" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link>
              </div>
            </div>

            {/* two - CRESTORA */}
            <div className='reveal2 transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={CRESTORA} alt="CRESTORA" className='blur-xs bg-cover w-full h-full rounded-2xl' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>COSMETIC & SKINCARE</p>
                  <p className='font-semibold'>CRESTORA</p>
                </div>
                <Link to="/projects/logos&brand-designs/crestora" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                    <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link>
              </div>
        </div>
        
 {/* three - UPWAVE UNI */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={upwavelogo} alt="My Designs" className='blur-xs bg-cover rounded-2xl w-full h-full'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>EDUCATION · CORPORATE</p>
                  <p className='font-semibold'>UPWAVE UNIVERSITY</p>
                </div>
                <Link to="/projects/logos&brand-designs/upwave-university" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                    <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link>
              </div>
        </div>

      </div>


{/* ROW 2 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one - RCR */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={RCR} alt="RCR RACING" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>SPORT · RACING · REBRANDING</p>
                  <p className='font-semibold'>RCR RACING</p>
                </div>
                <Link to="/projects/logos&brand-designs/RCR-RACING" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link>
              </div>
            </div>

            {/* two - SMITH XM */}
            <div className='reveal2 transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={SMITHXM} alt="SMITHXM" className='blur-xs bg-cover w-full h-full rounded-2xl' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>CRYTOCURRENCY · TRADING</p>
                  <p className='font-semibold'>SMITH XM GLOBAL</p>
                </div>
                <Link to="/projects/logos&brand-designs/smith-xm-global" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                    <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link>
              </div>
        </div>
        
 {/* three - KONNEX */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={KONNEX} alt="KONNEX" className='blur-xs bg-cover rounded-2xl w-full h-full'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>TECHNOLOGY · CORPORATE</p>
                  <p className='font-semibold'>KONNEX</p>
                </div>
                <Link to="/projects/logos&brand-designs/konnex" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                    <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link>
              </div>
        </div>

      </div>

{/* ROW 3 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one - RCR */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={KRONIK} alt="KRONIK" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>BUILDING · CONSRTUCTION</p>
                  <p className='font-semibold'>KRONIK</p>
                </div>
                <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link>
              </div>
            </div>

           

      </div>



      {/* ROW 4 */}
              <div className='transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col lg:flex-row justify-evenly  items-center py-8 px-5 w-full h-full border border-zinc-900'>
                      {/* <img src={works} alt="MacBook Pro" className='w-50 mb-[-1.5rem]' /> */}
            
                      {/* <img src={works} alt="MacBook Pro" className='w-50 mb-[-1.5rem]' /> */}
            
                      <div className='flex justify-center items-center w-full reveal '>
                        <div className='flex flex-col mr-auto'>
                          <p className='text-[8px] opacity-70'>CLICK ICONS TO</p>
                          <p className='font-semibold lg:text-2xl'>GET IN TOUCH</p>
                        </div>
                        {/* <a href="/" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                          <ArrowRight size={18} className='rotate-125' />
                        </a> */}
                              </div>
                              
                              <div className="socials flex gap-3 w-full h-full mr-[-1rem] reveal">
                                  <a href="https://instagram.com/emmanuelayeni_"><img src={ig} alt="Instagram" className='reveal size-20 transition-transform duration-300 hover:scale-130 blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                              onLoad={(e) => e.target.classList.remove('blur-xs')}/></a>
                                 <a href="https://wa.me/+2349132489550"><img src={wa} alt="whatsapp" className='reveal size-20 transition-transform duration-300 hover:scale-130 blur-xs'    loading="eager" // Ensure logo is eagerly loaded
                              onLoad={(e) => e.target.classList.remove('blur-xs')}/></a>
                                 <a href="https://linkedin.com/in/emmanuel-ayeni01"><img src={li} alt="linkedin"className='reveal size-20 transition-transform duration-300 hover:scale-130 blur-xs'   loading="eager" // Ensure logo is eagerly loaded
                              onLoad={(e) => e.target.classList.remove('blur-xs')}/></a>
                              </div>
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

export default Brands