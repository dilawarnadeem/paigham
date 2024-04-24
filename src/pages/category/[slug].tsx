import Category_Banner from '@/components/pageBanner/categoryBanner'
import SeoMeta from '@/components/seo'
import Card from '@/components/video-section/card'
import apolloClient from '@/config/client'
import { PostsByCategory } from '@/config/query'
import { SettingsContext } from '@/context/setting-context'
import { sliderSettings } from '@/utils'
import { IPost } from '@/utils/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { FaCirclePlay } from "react-icons/fa6";
import Slider from 'react-slick'


const Category = ({ posts, slug }: any) => {
  const { posts: { nodes } } = posts

  const { setModelIsOpen, setVideoLink, videoLink } = useContext(SettingsContext)

  const [selectItem, setSelectedItem] = useState<any>()

  const OpenVideo = (link: string) => {
    setModelIsOpen(false)
    setVideoLink(link)
  }

  useEffect(() => {
    const fItem = nodes?.find((item: any) => item?.postInfo?.tmVideoUrl === videoLink)
    setSelectedItem(fItem)
  }, [videoLink, setVideoLink, nodes])

  const slider = React.useRef<any>(null);

  const hanldeVideoButton = () => {
    setVideoLink(nodes[0].postInfo.tmVideoUrl)
  }


  return (
    <section className="bg-[rgb(22,31,40)] pb-20">
      <SeoMeta title={`${slug}  | Paigham TV`} url={`/category/${slug}`} description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />

      {
        videoLink ?
          nodes?.slice(0, 1).map((item: IPost, idx: number) => (
            <Category_Banner key={idx} item={item} />
          )) :
          <section className='relative'>
            <Image src={posts?.categoryInfo?.categoryBanner?.mediaItemUrl || '/images/tafseer-ul-quran.jpeg'} width={1200} height={800} alt={posts.name} className='h-[500px] w-full object-cover' />
            <div className="bg-gradient-to-t from-[#161F28] via-[#161F28]/60 absolute inset-0 to-black/0" />
            <FaCirclePlay onClick={hanldeVideoButton} className="text-5xl md:text-7xl animate-pulse cursor-pointer text-secondary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"/>
          </section>
      }

      <div className="container px-4 mx-auto">
        <div className=" mt-12 pb-8 border-b-[2px] border-gray-800">
          <h4 className="text-secondary font-semibold text-lg">{posts.name}</h4>
          <h4 className="text-white max-w-[900px] font-semibold text-2xl md:text-3xl mt-1">{selectItem?.title}</h4>
          <div className="max-w-[800px] md:text-xl mt-4 text-gray-400 " dangerouslySetInnerHTML={{ __html: selectItem?.excerpt || posts?.description }} />
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
