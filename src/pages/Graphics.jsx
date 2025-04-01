import React, { useEffect } from 'react'
import ScrollReveal from 'scrollreveal';
import ButtonGroup from '../components/ButtonGroup';
import dfexchange from '../assets/images/designs/dfexchange.webp'
import ajbliss from '../assets/images/designs/ajbliss.webp'
import bday from '../assets/images/designs/bday.webp'
import cisco from '../assets/images/designs/cisco.webp'
import crystalplug from '../assets/images/designs/crystalplug.webp'
import df2 from '../assets/images/designs/df2.webp'
import diadem from '../assets/images/designs/diadem.webp'
import funmite from '../assets/images/designs/funmite.webp'
import image from '../assets/images/designs/image.webp'
import img2 from '../assets/images/designs/img2.webp'
import jozeal from '../assets/images/designs/jozeal.webp'
import jozeal2 from '../assets/images/designs/jozeal2.webp'
import mfmcf from '../assets/images/designs/mfmcf.webp'
import rox from '../assets/images/designs/rox.webp'
import sw93 from '../assets/images/designs/sw93.webp'
import xmas2 from '../assets/images/designs/xmas2.webp'
import fr from '../assets/images/designs/fr.webp'
import mcl from '../assets/images/designs/mcl.webp'
import nike from '../assets/images/designs/nike.webp'
import painter from '../assets/images/designs/painter.webp'
import sm1 from '../assets/images/designs/sm1.webp'
import sm2 from '../assets/images/designs/sm2.webp'
import sm3 from '../assets/images/designs/sm3.webp'
import sm4 from '../assets/images/designs/sm4.webp'
import sm5 from '../assets/images/designs/sm5.webp'
import sm6 from '../assets/images/designs/sm6.webp'


const Graphics = () => {

    React.useEffect(() => {
    // Set page title when component mounts
    document.title = "Graphic Designs by Emmy";
    
    // Optional: Reset title when component unmounts
    return () => {
      document.title = "Emmanuel Ayeni";
    };
  }, []);

     console.log("Graphics component rendering attempt");


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
      <div className='reveal flex flex-col text-white items-stretch gap-4 px-5 lg:px-85 py-5 lg:py-15'>
      {/* Heading */}
      <div>
        <h4 className='md:gap-14 lg:gap-52 bg-white/3 border border-zinc-900 border-3xl p-5 rounded-3xl text-2xl font-semibold shadow-md shadow-indigo-500'>Graphic <span className='text-indigo-500'>Designs</span></h4>
      </div>
      
      
          

      


      {/* Cards wrapper */}
      

      {/* ROW 1 */}
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one - OASIS */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={dfexchange} alt="dfexchange" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>DF EXCHANGE</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/oasis" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
            </div>

            {/* two - CRESTORA */}
            <div className='reveal2 transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={funmite} alt="funmite" className='blur-xs bg-cover w-full h-full rounded-2xl' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>FUNMITE ACCESSORIES</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/crestora" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                    <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
 {/* three - UPWAVE UNI */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={jozeal} alt="jozeal" className='blur-xs bg-cover rounded-2xl w-full h-full'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>JOZEAL TECHNOLOGIES</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/upwave-university" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                    <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>

      </div>


{/* ROW 2 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one - RCR */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={jozeal2} alt="jozeal2" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>JOZEAL TECHNOLOGIES</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/RCR-RACING" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
            </div>

            {/* two - SMITH XM */}
            <div className='reveal2 transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={diadem} alt="diadem" className='blur-xs bg-cover w-full h-full rounded-2xl' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>BIRTHDAY POSTER</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/smith-xm-global" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                    <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
 {/* three - KONNEX */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 reveal bg-white/3 rounded-4xl flex flex-col justify-between gap-7 items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={rox} alt="rox" className='blur-xs bg-cover rounded-2xl w-full h-full'   loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-end items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>ROXIQUE TRAVEL AGENCY</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/konnex" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                    <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>

      </div>

          





{/* ROW 3 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={sw93} alt="sw93" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>MFM CHURCH EVENT</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
          {/* two */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={crystalplug} alt="crystalplug" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>CRYSTAL PLUG</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
            {/* three */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={ajbliss} alt="ajbliss" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>AJ BLISS</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
        </div>

        

      
{/* ROW 8 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={sm1} alt="sm1" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>SMITH XM GLOBAL</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
          {/* two */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={sm2} alt="sm2" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>SMITH XM GLOBAL</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
            {/* three */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={sm3} alt="sm3" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>SMITH XM GLOBAL</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
        </div>



{/* ROW 8 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={sm4} alt="sm4" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>SMITH XM GLOBAL</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
          {/* two */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={sm5} alt="sm5" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>SMITH XM GLOBAL</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
            {/* three */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={sm6} alt="sm6" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>SMITH XM GLOBAL</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
        </div>




{/* ROW 5 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={df2} alt="df2" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>DF EXCHANGE</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
          {/* two */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={cisco} alt="cisco" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>IG CISCO</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
            {/* three */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={bday} alt="bday" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>BIRTHDAY PARTY POSTER</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        

</div>




{/* ROW 6 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={mfmcf} alt="mfmcf" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>MFMCF BDAY DESIGN</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
          {/* two */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={img2} alt="img2" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>HAPPY WEEKEND DESIGN</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
            {/* three */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={image} alt="image" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>COLLATION</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
          
</div>
        


{/* ROW 7 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={mcl} alt="mcl" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>MC LAREN FAN ART POSTER</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
          {/* two */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={fr} alt="fr" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>FERRARI FAN ART POSTER</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
            {/* three */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={xmas2} alt="xmas2" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>XMAS SEASON FOR DIADEM SCHOOLS</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
        </div>








{/* ROW 8 */}
      
          <div className='flex gap-4 flex-col md:flex-row w-full h-full' >
            {/* one */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={nike} alt="nike" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>BUILDING</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
          {/* two */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={painter} alt="painter" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>BUILDING</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
        </div>
        
            {/* three */}
            <div className='reveal1 transition-all hover:shadow-lg hover:shadow-indigo-500/50 bg-white/3 rounded-4xl flex flex-col gap-11 justify-between items-center py-5 px-5 w-full h-full border border-zinc-900'>
              <img src={xmas2} alt="xmas2" className='rounded-2xl size-45 bg-cover w-full h-full blur-xs' loading="eager" // Ensure logo is eagerly loaded
                  onLoad={(e) => e.target.classList.remove('blur-xs')}/>

              <div className='flex justify-center items-center w-full'>
                <div className='flex flex-col mr-auto'>
                  <p className='text-[8px] opacity-70'>ASSET</p>
                  <p className='font-semibold'>BUILDING</p>
                </div>
                {/* <Link to="/projects/logos&brand-designs/kronik" className='bg-white/4 p-2 rounded-full shadow-md shadow-indigo-500'>
                  <span className='flex text-xs items-center gap-1'>View <Eye size={10} /></span>
                </Link> */}
              </div>
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

export default Graphics