import Category_Banner from '@/components/pageBanner/categoryBanner'
import SeoMeta from '@/components/seo'
import Card from '@/components/video-section/card'
import apolloClient from '@/config/client'
import { PostsByCategory } from '@/config/query'
import { SettingsContext } from '@/context/setting-context'
import { sliderSettings } from '@/utils'
import { IPost } from '@/utils/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useContext, useEffect } from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import Slider from 'react-slick'

const Category = ({ posts, slug }: any) => {
  const { posts: { nodes } } = posts
  const { setModelIsOpen, setVideoLink } = useContext(SettingsContext)
  const OpenVideo = (link: string) => {
    setModelIsOpen(true)
    setVideoLink(link)
  }

  const slider = React.useRef<any>(null);

  return (
    <>
      <SeoMeta title={`${slug}  | Paigham TV`} url={`/category/${slug}`} description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />

      {
        nodes?.slice(0, 1).map((item: IPost, idx: number) => (
          <Category_Banner key={idx} item={item} />
        ))
      }
      <div className='container mx-auto my-20 px-4 relative'>
        <Slider {...sliderSettings} ref={slider}>
          {
            nodes?.slice(0).reverse().map((item: IPost, idx: number) => (
              <Card item={item} key={idx} OpenVideo={OpenVideo} slug />
            ))
          }
        </Slider>
        <div className={nodes?.length > 4 ? '' : 'lg:hidden'}>
            <button className='md:text-3xl text-xl text-gray-600 hover:text-primary absolute top-1/2 -mt-20 md:-left-8 -left-4' onClick={() => slider?.current?.slickPrev()}>
              <MdArrowBackIosNew />
            </button>
            <button className='md:text-3xl text-xl text-gray-600 hover:text-primary absolute top-1/2 -mt-20 md:-right-8 -right-4' onClick={() => slider?.current?.slickNext()}>
              <MdArrowForwardIos />
            </button>
          </div>
      </div>
    </>
  )
}

export default Category


export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
  const response = await apolloClient.query({
    query: PostsByCategory,
    variables: {
      slug
    },
  });
  const posts = response.data.category;

  return {
    props: {
      posts,
      slug
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any = [];
  return {
    paths,
    fallback: 'blocking',
  };
}
