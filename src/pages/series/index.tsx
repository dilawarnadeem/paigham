
import PageBanner from '@/components/pageBanner/PageBanner';
import React from 'react'
import CategoryCard from '@/components/category-card/CategoryCard'
import { GetStaticProps } from 'next'
import apolloClient from '@/config/client'

import { Categories } from '@/config/query'
import SeoMeta from '@/components/seo';


export default function Series({ allCategories }: any) {
    return (
        <>
            <SeoMeta title="Series | Paigham TV" url="/series" description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />
            <PageBanner title="Series" image="/images/banner-2.jpg" />
            <section className='pb-28 pt-20 bg-[#161F28]'>
                {
                    allCategories?.map((item: any, idx: any) => (
                        <CategoryCard key={idx} items={item} />
                    ))
                }
            </section>

        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const [categories] = await Promise.all([
        apolloClient.query({ query: Categories }),
    ]);
    const allCategories = categories.data.categories.nodes
    return {
        props: {
            allCategories
        },
    };
}

