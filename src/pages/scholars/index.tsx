import PageBanner from '@/components/pageBanner/PageBanner'
import React from 'react'
import { GetStaticProps } from 'next'
import apolloClient from '@/config/client'
import ScholarCard from '@/components/scholar-card/ScholarCard'
import { AllScholars } from '@/config/query'
import SeoMeta from '@/components/seo'

const Scholar = ({ allScholars }: any) => {
  return (
    <>
      <SeoMeta title="Scholars of Paigham TV | Paigham TV" url="/scholars" description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />
      <PageBanner title="Scholar" image="/images/banner-2.jpg" />
      <div className='grid container mx-auto my-20 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 px-4 '>
        {
          allScholars.map((item: any, idx: number) => (
            <ScholarCard key={idx} item={item} />
          ))
        }
      </div>
    </>
  )
}

export default Scholar



export const getStaticProps: GetStaticProps = async () => {
  const [scholars] = await Promise.all([
    apolloClient.query({ query: AllScholars })
  ]);
  const allScholars = scholars.data.scholars.nodes
  return {
    props: {
      allScholars
    },
  };
}
