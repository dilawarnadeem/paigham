import Image from 'next/image'
import React, { useContext } from 'react'
import { getVideoCode } from '@/utils'
import { PiPlay } from 'react-icons/pi'
import { SettingsContext } from '@/context/setting-context'


const Card = ({ item, OpenVideo, slug }: any) => {
     const { language, setVideoLink } = useContext(SettingsContext)
     var title = item.title
     if (language === 'ar') {
          title = item.postInfo.arabicTitle
     } else if (language === 'ur') {
          title = item.postInfo.urduTitle
     }

     return (
          <div className='px-1'>
               <div className='bg-black pb-3'>
                    <div className='bg-red-300 relative group overflow-hidden '>
                         <Image src={item?.featuredImage?.node?.mediaItemUrl} alt="image" width={700} height={400} className=' w-full object-cover transition-all h-[220px] duration-200 ease-in-out group-hover:scale-105' />
                         <div className=' bg-gradient-to-t from-black via-black/50 absolute inset-0 to-black/0 p-3 md:p-6 flex flex-col justify-end font-metapro '>
                               {
                                   slug ? <button onClick={() => {
                                        setVideoLink(item?.postInfo?.tmVideoUrl); 
                                        window.scrollTo({
                                             top: 0,
                                             behavior: 'smooth',
                                        });
                                   }} className='bg-secondary opacity-75 hover:scale-105 p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                                        <PiPlay size={28} />
                                   </button> : <button onClick={() => OpenVideo(item?.postInfo?.tmVideoUrl)} className='bg-secondary opacity-75 hover:scale-105 p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                                        <PiPlay size={28} />
                                   </button>
                              }
                         </div>
                    </div>
                    <h4 className='text-white md:text-lg font-medium min-h-[56px] md:px-2 text-center tracking-wide my-3 line-clamp-2'>{title}</h4>
               </div>
          </div>
     )
}

export default Card