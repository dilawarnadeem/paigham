import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { SettingsContext } from '@/context/setting-context'
import Card from './card'

const VideoSection = ({ allCategories, allposts }: any) => {
     const [activeCategory, setActiveCategory] = useState('')
     const [posts, setPost] = useState<any>(allposts.slice(0, 8))
     const HandleVideosCategoryTabs = (slug: string) => {
          setActiveCategory(slug)
          const p = allposts.filter((item: any) => item.categories.nodes.some((item: any) => item.slug === slug))
          setPost(p.slice(0, 8))
     }

     const { setModelIsOpen, setVideoLink } = useContext(SettingsContext)
     const OpenVideo = (link: string) => {
          setModelIsOpen(true)
          setVideoLink(link)
     }

     return (
          <section className="bg-primary py-20">
               <div className='container mx-auto px-4'>
                    {/* heading  */}
                    <div className='flex justify-between text-white items-center mb-5 pb-5'>
                         <h2 className='font-metapro text-3xl md:text-5xl font-bold'>VIDEOS</h2>
                         <Link href="/posts" className='uppercase flex hover:text-orange items-center gap-x-2 font-metapro text-xl tracking-widest font-semibold rtl:flex-row-reverse'>
                              <span>View All</span>
                              <HiOutlineArrowRight />
                         </Link>
                    </div>
                    <ul className='flex justify-between  text-white overflow-x-scroll xl:overflow-x-hidden font-metapro font-medium border-b-[1px] border-gray-500'>
                         {
                              allCategories?.slice(0, 8)?.map((item: any, idx: number) => (
                                   <li key={idx} className={`${activeCategory === item.slug && 'bg-secondary px-4 text-primary '} flex-1 py-2 flex justify-center min-w-[140px] cursor-pointer items-center`} onClick={() => HandleVideosCategoryTabs(item?.slug)}>{item.name}</li>
                              ))
                         }
                    </ul>
                    <div className='grid grid-cols-2 lg:grid-cols-4 mt-10 gap-2'>
                         {
                              posts?.map((item: any, idx: number) => (
                                   <Card item={item} key={idx} OpenVideo={OpenVideo} />
                              ))
                         }
                    </div>
               </div>

          </section>
     )
}

export default VideoSection



const videoCategory = [
     "All", "Dua o Azkar", "Tafseer Ul Quran", "Research Talk", "Paigham e Pakistan", "Time Line", "Jiyo Pak Zindagi",
     "Mehakte Phool", "Jadu aur Jinnat", "Ahkam o Masail"
]