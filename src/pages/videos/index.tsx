import PageBanner from '@/components/pageBanner/PageBanner'
import apolloClient from '@/config/client'
import { postsForListingPage } from '@/config/query'
import { GetServerSideProps } from 'next'
import React, { useContext } from 'react'
import Card from '@/components/video-section/card'
import { SettingsContext } from '@/context/setting-context'
import { IPost } from '@/utils/types'
import { Pagination } from '@/components/pagination/Pagination'


const Posts = ({ allposts }: any) => {
     const { setModelIsOpen, setVideoLink } = useContext(SettingsContext)
     const OpenVideo = (link: string) => {
          setModelIsOpen(true)
          setVideoLink(link)
     }
     const { pageInfo } = allposts

     return (
          <section>
               <PageBanner title="All Videos" image="/images/banner-2.jpg" />
               <div className='grid grid-cols-2 container mx-auto my-20 px-4 lg:grid-cols-4 mt-20 gap-4'>
                    {
                         allposts?.nodes?.map((item: IPost, idx: number) => (
                              <Card item={item} key={idx} OpenVideo={OpenVideo} />
                         ))
                    }
               </div>
               <Pagination endCursor={pageInfo?.endCursor} />
          </section>
     )
}

export default Posts



export const getServerSideProps: GetServerSideProps = async (params) => {
     const endCursor = params?.query?.endCursor
     const method = params?.query?.method

     const postsResponse = await apolloClient.query({
          query: postsForListingPage,
          variables: {
               endCursor
          },
     });
     const allposts = postsResponse.data.posts;
     return {
          props: {
               allposts,
          },
     };
}