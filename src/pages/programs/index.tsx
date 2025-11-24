
import PageBanner from '@/components/pageBanner/PageBanner';
import React from 'react'
import CategoryCard from '@/components/category-card/CategoryCard'
import { GetStaticProps } from 'next'
import apolloClient from '@/config/client'

import { Categories } from '@/config/query'
import SeoMeta from '@/components/seo';


export default function SeriesPrograms({  allScholars }: any) {
    return (
        <>
            <SeoMeta title="Programs | Paigham TV" url="/programs" description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />
            <PageBanner title="Programs" image="/images/banner-2.jpg" />
            <section className='pb-28 md:pt-20 bg-[#161F28]'>
                {
                    allScholars?.map((item: any, idx: any) => (
                        <CategoryCard key={idx} items={item} />
                    ))
                }
            </section>

        </>
    )
}


export const getStaticProps = async () => {
  const [categories] = await Promise.all([
    apolloClient.query({ query: Categories })
  ]);
  const allCategories = categories.data.categories.nodes
  return {
    props: {
      allScholars: allCategories
    },
  };
}
