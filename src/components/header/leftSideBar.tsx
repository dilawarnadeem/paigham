import Link from "next/link"
import { Socials } from "../footer"
import Logo from "../logo/Logo"
import { RxCross1 } from "react-icons/rx"

export const LeftSideBar = ({ setLeftSideBar, leftSidebar }: any) => {
     return (
       <section className={`bg-primary text-white fixed max-w-[350px] w-full z-50 top-0 transition-all duration-300 ease-in-out h-full ${leftSidebar ? 'left-0 rtl:left-auto rtl:right-0' : '-left-full rtl:left-auto rtl:-right-full'}`}>
         <div className=' h-full w-full flex flex-col items-center relative p-8'>
           <Logo />
           <p className='mt-4 text-center font-metapro mb-6'>Paigham TV is an Islamic educational channel television network. Its launched in Urdu language TV channel in 2011 and Pashto Channel was launched in 2014</p>
           <Socials />
           <Link href="/donate-us" className='font-montserrat mt-10 border border-secondary text-secondary hover:bg-secondary hover:text-black font-anton tracking-widest p-3 px-10'>Donate Us</Link>
           <img src="/images/bg-side.png" className='absolute bottom-0 opacity-20 left-0' alt="" />
           <RxCross1 className='absolute left-10 text-2xl hover:text-secondary cursor-pointer rtl:left-auto rtl:right-10' onClick={() => setLeftSideBar(false)} />
           <iframe className="mt-8" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13592.604137323078!2d74.300666!3d31.602321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191c7c0a71319d%3A0x4217b592e2f4ea1c!2sSuccess%20Designers!5e0!3m2!1sen!2sus!4v1689244313056!5m2!1sen!2sus" width="280" height="200" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
         </div>
       </section>
     )
   }