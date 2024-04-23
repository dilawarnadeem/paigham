
import PageBanner from '@/components/pageBanner/PageBanner';

import { Helmet } from 'react-helmet';
import apolloClient from '@/config/client'
import { programsScheduling } from '@/config/query'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { SettingsContext } from '@/context/setting-context'
import React, { useContext } from 'react'
import VideoPlayer from '@/components/video-player/VideoPlayer'
import { getVideoCode } from '../../utils'
import SeoMeta from '@/components/seo';



const PaighamChannelPresents = ({ programs }: any) => {
    const { setVideoLink } = useContext<any>(SettingsContext)

    const handleLink = (link: string) => {
        setVideoLink(link)
    }

    return (

        
        <section className='bg-white'>
            <div className='container font-metapro mx-auto px-4 text-primary py-16'>
                <h2 className=' text-3xl text-center md:text-5xl font-bold'>Paigham Channel Presents</h2>
                <div className='md:flex mt-10 md:gap-x-10'>
                    <div className='md:w-[60%]'>
                        <VideoPlayer />
                    </div>
                    <div className="md:w-[40%] mt-5 md:mt-0">
                        {/* top headings  */}
                        <div className='font-semibold flex justify-between sm:text-xl tracking-widest item-center'>
                            <h5>TODAY'S GUIDE</h5>
                            <Link href="/program-scheduling"><h5 className='text-primary'>FULL GUIDE</h5></Link>
                        </div>
                        <ul className='mt-5 '>
                            {
                                programs.map((item: any, idx: number) => (
                                    <li key={idx} className='flex justify-between gap-x-6 md:gap-x-16 border-t-[1px] border-gray-300 py-5'>
                                        <time className='font-medium text-xl'>{item?.programInfo?.programTime || `0000`}</time>
                                        <button onClick={() => handleLink(getVideoCode(item?.programInfo?.videoUrl))}>
                                            <h6 className='text-primary text-xl font-medium text-start -tracking-wide'>{item.title}</h6>
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





export default function Program_Scheduling({ allProgramsScheduling }: any) {

    return (
        <>
        
        <SeoMeta title="Program Scheduling | Paigham TV" url="/program-scheduling" description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah" />
 

            <PageBanner title="Program Scheduling" image="/images/banner2.jpg" />
            {/* Categories section  */}

            <PaighamChannelPresents programs={allProgramsScheduling} />








        </>
    )
}



export const getStaticProps: GetStaticProps = async () => {
    const [programs] = await Promise.all([

        apolloClient.query({ query: programsScheduling }),
    ]);
    // const allposts = postsResponse.data.posts.nodes;
    //  const allCategories = categories.data.categories.nodes
    const allProgramsScheduling = programs.data.programsScheduling.nodes
    return {
        props: {

            allProgramsScheduling
        },
    };
}








