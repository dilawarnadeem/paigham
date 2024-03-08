import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaTiktok } from 'react-icons/fa'
import { HiOutlineArrowRight } from 'react-icons/hi'
import Logo from '../logo/Logo'
import { footerNav } from '../../../public/data'
import apolloClient from '@/config/client'
import { AllTags } from '@/config/query'
import { useQuery } from '@apollo/client'
import { graphql } from 'graphql'

const Footer = () => {

     return (
          <footer className='bg-primary'>
               <div className='container mx-auto text-white px-4 py-16'>
                    <div className='sm:flex justify-between items-center'>
                         <Socials />
                         <div>
                              <div className='bg-[#27396C] flex items-center mt-6 sm:mt-0'>
                                   <input className='bg-transparent w-full p-4 placeholder:font-metapro md:w-[400px] outline-none placeholder:font-normal placeholder:tracking-wider' placeholder="SUBCRIBE OUR NEWSLETTER" />
                                   <button className='bg-secondary h-full p-4 px-6 active:scale-105'><HiOutlineArrowRight size="30" /></button>
                              </div>
                         </div>
                    </div>
                    <div className='grid grid-cols-4 md:grid-cols-5 font-metapro gap-6 mt-16 pt-12 border-t-[1px] border-gray-500'>
                         <Logo />
                         {
                              footerNav.map((item, idx) => {
                                   return (
                                        <div key={idx}>
                                             <h6 className="text-lg font-medium tracking-widest uppercase">{item.name}</h6>
                                             <ul className='mt-4'>
                                                  {
                                                       item.nav.map((nav, id) => (
                                                            <li className="text-lg mt-2 hover:text-secondary font-light text-gray-300 tracking-wider" key={id}><Link href={nav.link}>{nav.name}</Link></li>
                                                       ))
                                                  }
                                             </ul>
                                        </div>
                                   )
                              })
                         }
                         
                    </div>
               </div>
          </footer>
     )
}

export default Footer


export const Socials = () => {
     return (
          <div className="flex justify-center sm:justify-start gap-5 text-2xl ">
               <Link href="http://facebook.com/paighamtv" target='_blank' className='hover:text-secondary'><FaFacebookF size={21} /></Link>
               <Link href="http://instgram.com/paighamtv" target='_blank' className='hover:text-secondary'><FaInstagram /></Link>
               <Link href="http://youtube.com/paighamtvofficial" target='_blank' className='hover:text-secondary'><FaYoutube /></Link>
               <Link href="http://twitter.com/paighamtv" target='_blank' className='hover:text-secondary'><FaTwitter /></Link>
               <Link href="https://www.tiktok.com/@paigham_tv" target='_blank' className='hover:text-secondary'><FaTiktok /></Link>
          </div>
     )
}