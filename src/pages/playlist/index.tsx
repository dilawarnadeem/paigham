import PageBanner from '@/components/pageBanner/PageBanner'
import React from 'react'
import ScholarCard from '@/components/scholar-card/ScholarCard'
import apolloClient from '@/config/client'
import { AllPlaylist } from '@/config/query'
import { GetStaticProps } from 'next'
import SeoMeta from '@/components/seo'

const Playlist = ({ allPlaylist }: any) => {
  return (
    <>
      <SeoMeta title={`Play List | Paigham TV`} url={`/playlist`} description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />

      <PageBanner title="Play List" image="/images/main-image.png" />

      <div className='grid container mx-auto my-20 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 px-4'>
        {
          allPlaylist.map((item: any, idx: number) => (
            <ScholarCard key={idx} item={item} />
          ))
        }
      </div>
    </>
  )
}

export default Playlist



export const getStaticProps: GetStaticProps = async () => {
  const [playLists] = await Promise.all([
    apolloClient.query({ query: AllPlaylist })
  ]);
  const allPlaylist = playLists.data.playLists.nodes
  return {
    props: {
      allPlaylist
    },
  };
}
