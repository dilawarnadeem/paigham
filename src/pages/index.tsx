import Image from 'next/image'
import { Inter } from 'next/font/google'
import Main from '@/components/main/Main'
import Link from 'next/link'
import { HiOutlineArrowRight } from 'react-icons/hi'
import CategoryCard from '@/components/category-card/CategoryCard'
import ScholarCard from '@/components/scholar-card/ScholarCard'
import DonateNow from '@/components/donateNow/DonateNow'
import VideoSection from '@/components/video-section/VideoSection'
import { useState } from 'react'
import { PiPlay } from 'react-icons/pi'
import VideoPlayer from '@/components/video-player/VideoPlayer'
import { getVideoCode } from '../utils'
import { SettingsContext } from '@/context/setting-context'
import React, { useContext } from 'react'
import {category } from '../../public/data'
import { IScholorType } from '@/utils/types'
import { Helmet } from 'react-helmet';
import apolloClient from '@/config/client'
import { AllPosts, Categories, programsScheduling, AllScholars } from '@/config/query'
import { GetStaticProps } from 'next'
import Card from '@/components/video-section/card'
import FacebookVideoPlayer from '@/components/video-player/FacebookPlayer'
import SeoMeta from '@/components/seo'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ allposts, allCategories, allProgramsScheduling, Scholars }: any) {

  return (
    <>
 
    <SeoMeta title="Home - Paigham TV" url="/" description="Paigham TV is an Islamic educational channel television network. It launched its Urdu language TV channel in 2011. The production of this channel is based on the teachings of Quran o Sunnah. A team of Islamic scholars monitors the material presented on its programs. Each program of Paigham TV is previewed according to authentic references of Quran o Hadees." />
 
      <Main posts={allposts} />
      <TabsSection allposts={allposts} allCategories={allCategories} />
      <PaighamChannelPresents programs={allProgramsScheduling} />
      {/* Categories section  */}
      <section className='container mx-auto mb-28 px-4'>
        {/* heading  */}
        <div className='flex justify-between items-center mt-20 mb-10 border-b-[3px] border-darkgray pb-5'>
          <h2 className='font-metapro text-3xl md:text-5xl text-darkgray font-bold'>Categories</h2>
          <Link href="#" className='uppercase flex hover:text-orange items-center gap-x-2 font-metapro text-xl tracking-widest font-semibold rtl:flex-row-reverse'>
            <span>View All</span>
            <HiOutlineArrowRight />
          </Link>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {
            allCategories.slice(0, 4).map((item: any, idx: any) => (
              <CategoryCard key={idx} item={item} />
            ))
          }
        </div>
      </section>
      {/* videos section  */}
      <VideoSection allposts={allposts} allCategories={allCategories} />
      {/* Scholar section  */}
      <section className='container mx-auto mb-28 px-4'>
        {/* heading  */}
        <div className='flex justify-between items-center mt-20 mb-10 border-b-[3px] border-darkgray pb-5'>
          <h2 className='font-metapro text-3xl md:text-5xl text-darkgray font-bold'>Scholar</h2>
          <Link href="#" className='uppercase flex hover:text-orange items-center gap-x-2 font-metapro text-xl tracking-widest font-semibold rtl:flex-row-reverse'>
            <span>View All</span>
            <HiOutlineArrowRight />
          </Link>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {
            Scholars.slice(0, 8).map((item: IScholorType, idx: number) => (
              <ScholarCard key={idx} item={item} />
            ))
          }
        </div>
      </section>
      {/* donate now section  */}
      <DonateNow />
    </>
  )
}



// Tabs section 
const TabsSection = ({ allposts }: any) => {
  const [posts, setPost] = useState<any>(allposts.slice(0, 4))
  const [activeCategory, setActiveCategory] = useState('tafseer-ul-quran')
  const HandleVideosCategoryTabs = (slug: string) => {
    setActiveCategory(slug)
    const p = allposts.filter((item: any) => item.categories.nodes.some((item: any) => item.slug === slug))
    setPost(p.slice(0, 8))
  }
  const { modalIsOpen, setModelIsOpen, setVideoLink } = useContext(SettingsContext)
  const OpenVideo = (link: string) => {
    setModelIsOpen(true)
    setVideoLink(link)
  }
  
  return (
    <section className="container mx-auto pt-20 px-4">
      {/* top header  */}
      <div className='flex justify-between item-center border-b-2 border-gray-500'>
        <ul className='flex justify-between space-x-2 overflow-x-scroll xl:overflow-x-hidden font-metapro font-semibold  '>
          {
            tabData.map((item, idx) => (
              <li key={idx} className={`${activeCategory === item.slug && 'bg-secondary px-4 py-2 text-primary '} flex-1 flex justify-center min-w-[160px] cursor-pointer  items-center`} onClick={() => HandleVideosCategoryTabs(item.slug)}>{item.name}</li>
            ))
          }
        </ul>
        <Link href="#" className='uppercase hidden md:flex hover:text-orange items-center space-x-2 font-metapro text-xl tracking-widest font-semibold rtl:flex-row-reverse'>
          <span>View All</span>
          <HiOutlineArrowRight />
        </Link>
      </div>
      {/* articles  */}

      <div className='grid grid-cols-2 lg:grid-cols-4 mt-10 gap-2'>
        {
          posts?.map((item: any, idx: number) => (
            <Card item={item} key={idx} OpenVideo={OpenVideo} />
          ))
        }
      </div>

    </section>
  )
}

// Paigham Channel Presents
const PaighamChannelPresents = ({ programs }: any) => {
  const { setVideoLink } = useContext<any>(SettingsContext)

  const handleLink = (link: string) => {
    setVideoLink(link)
  }

  return (
    <section className='bg-primary mt-20'>
      <div className='container font-metapro mx-auto px-4 text-white py-16'>
        <h2 className=' text-3xl text-center md:text-5xl font-bold'>Paigham Channel Presents</h2>
        <div className='md:flex mt-10 md:gap-x-10 '>
          <div className='md:w-[60%]'>
            <VideoPlayer />
          </div>
          <div className="md:w-[40%] mt-5 md:mt-0">
            {/* top headings  */}
            <div className='font-semibold flex justify-between text-xl tracking-widest item-center'>
              <h5>TODAY'S GUIDE</h5>
              <Link href="/program-scheduling"><h5 className='text-secondary'>FULL GUIDE</h5></Link>
            </div>
            <ul className='mt-5 '>
              {
                programs.map((item: any, idx: number) => (
                  <li key={idx} className='flex justify-between gap-x-6 md:gap-x-16 border-t-[1px] border-gray-500 py-5'>
                    <time className='font-medium text-xl'>{item?.programInfo?.programTime || `0000`}</time>
                    <button onClick={() => handleLink(getVideoCode(item?.programInfo?.videoUrl))}>
                      <h6 className='text-secondary text-xl font-medium text-start -tracking-wide'>{item.title}</h6>
                      <div className='text-start text-lg mt-2' dangerouslySetInnerHTML={{ __html: item?.excerpt }} />
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const [postsResponse, categories, programs, Scholars_Res] = await Promise.all([
    apolloClient.query({ query: AllPosts }),
    apolloClient.query({ query: Categories }),
    apolloClient.query({ query: programsScheduling }),
    apolloClient.query({ query: AllScholars }),
  ]);

  const allposts = postsResponse.data.posts.nodes;
  const allCategories = categories.data.categories.nodes
  const allProgramsScheduling = programs.data.programsScheduling.nodes
  const Scholars = Scholars_Res.data.scholars.nodes
  return {
    props: {
      allposts,
      allCategories,
      allProgramsScheduling,
      Scholars
    },
  };
}




const tabData = [
  {
    name: 'Tafseer ul Quran',
    slug: 'tafseer-ul-quran'
  },
  {
    name: 'Subhe Watan',
    slug: 'subhe-watan'
  },
  {
    name: 'Paigham Podcast',
    slug: 'paigham-podcast'
  },
]

