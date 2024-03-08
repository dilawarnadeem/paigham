
import PageBanner from '@/components/pageBanner/PageBanner';
import React from 'react'
import { Helmet } from 'react-helmet';

import { category } from '../../../public/data'
import CategoryCard from '@/components/category-card/CategoryCard'
import { GetStaticProps } from 'next'
import apolloClient from '@/config/client'

import { Categories } from '@/config/query'
import SeoMeta from '@/components/seo';








export default function Series({ allCategories }: any) {
    //   console.log(" ~ allCategories:", allCategories)
    return (
        <>
            <SeoMeta title="Series | Paigham TV" url="/series" description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />
 

            <PageBanner title="Series" image="/images/banner-2.jpg" />
            <section className='container mx-auto mb-28 px-4 mt-20'>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                    {
                        allCategories.map((item: any, idx: any) => (
                            <CategoryCard key={idx} item={item} />
                        ))
                    }
                </div>
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

