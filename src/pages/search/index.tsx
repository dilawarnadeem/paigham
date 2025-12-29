import PageBanner from '@/components/pageBanner/PageBanner'
import Category_Banner from '@/components/pageBanner/categoryBanner'
import SeoMeta from '@/components/seo'
import Card from '@/components/video-section/card'
import apolloClient from '@/config/client'
import { SearchPost } from '@/config/query'
import { SettingsContext } from '@/context/setting-context'
import { IPost } from '@/utils/types'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

const Search = ({ allPosts }: any) => {
     const router = useRouter()
     const q = router.query.q

     const { setModelIsOpen, setVideoLink, videoLink } = useContext(SettingsContext)
     const OpenVideo = (link: string) => {
          setModelIsOpen(true)
          setVideoLink(link)
     }

     return (
          <>
               <SeoMeta title={`${q} | Paigham TV`} url="/programs" description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />
               <section className='bg-[#161F28]'>
                    {videoLink?.length > 4 && <Category_Banner item={videoLink} />}
               </section>
               <section className='pb-28 md:pt-20 bg-[#161F28] '>
                    <div className='container px-3 mx-auto mb-12 text-white'>
                         Search:  <h4 className="font-semibold text-2xl capitalize">{q}</h4>
                    </div>
                    <div className='container px-3 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-3'>
                         {    
                              allPosts.length > 0 ? 
                              allPosts?.map((item: IPost, idx: number) => (
                                   <Card item={item} key={idx} OpenVideo={OpenVideo} slug />
                              )) : <div>
                                   <h2 className='text-xl text-gray-400'>Opps: <br/> Result Not Found.! Pease Search Again.</h2>
                              </div>
                         }
                    </div>
               </section>
          </>
     )
}

export default Search



export const getServerSideProps = async ({ query }: any) => {
     const q = query.q
     const [posts] = await Promise.all([
          apolloClient.query({
               query: SearchPost,
               variables: {
                    search: q
               },
          }),
     ]);
     const allPosts = posts.data.posts.nodes
     return {
          props: {
               allPosts
          },
     };
}