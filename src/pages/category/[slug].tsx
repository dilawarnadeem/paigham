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
    <section className="bg-[rgb(22,31,40)] pb-20">
      <SeoMeta title={`${slug}  | Paigham TV`} url={`/category/${slug}`} description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />

      {
        nodes?.slice(0, 1).map((item: IPost, idx: number) => (
          <Category_Banner key={idx} item={item} />
        ))
      }
      <div className="container px-4 mx-auto">
        <div className=" mt-12 pb-8 border-b-[2px] border-gray-800">
          <h4 className="text-white font-semibold text-3xl">{posts.name}</h4>
          <p className="max-w-[800px] md:text-xl mt-4 text-gray-400 ">{posts?.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}</p>
        </div>
      </div>
      <div className='md:px-8 mt-20 relative'>
        <Slider {...sliderSettings} ref={slider}>
          {
            nodes?.slice(0).reverse().map((item: IPost, idx: number) => (
              <Card item={item} key={idx} OpenVideo={OpenVideo} slug />
            ))
          }
        </Slider>
        <div className={nodes?.length > 4 ? '' : 'lg:hidden'}>
          <button className='md:text-3xl text-xl text-white hover:text-primary bg-black/50 h-full absolute top-0 bottom-0 left-0 ' onClick={() => slider?.current?.slickPrev()}>
            <MdArrowBackIosNew />
          </button>
          <button className='md:text-3xl text-xl text-white hover:text-primary bg-black/50 h-full absolute top-0 bottom-0 right-0' onClick={() => slider?.current?.slickNext()}>
            <MdArrowForwardIos />
          </button>
        </div>
      </div>

      
    </section>
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
