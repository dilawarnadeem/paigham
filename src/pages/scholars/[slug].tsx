import PageBanner from '@/components/pageBanner/PageBanner'
import Category_Banner from '@/components/pageBanner/categoryBanner'
import SeoMeta from '@/components/seo'
import Card from '@/components/video-section/card'
import apolloClient from '@/config/client'
import { Get_Scholar_By_ID, PostsByScholar } from '@/config/query'
import { SettingsContext } from '@/context/setting-context'
import { IPost } from '@/utils/types'
import { GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'

const SingleScholar = ({ posts, slug,scholar }: any) => {
  // const { name, posts: { nodes } } = posts
  const router:any =  useRouter()

  console.log(scholar);
  

  const { setModelIsOpen, setVideoLink } = useContext(SettingsContext)

  const OpenVideo = (link: string) => {
    setModelIsOpen(false)
    setVideoLink(link)
  }
  const [visibleCount, setVisibleCount] = useState(8);

const loadMore = () => {
  setVisibleCount((prev) => prev + 8);
};

  return (
    <div className='bg-[#161F28]'>
      <SeoMeta title={`${slug}  | Paigham TV`} url={`/scholars/${slug}`} description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />
  
      <div className='container mx-auto px-4 pt-14'>
        <h6 className='uppercase text-xl text-secondary font-medium'>scholar:</h6>
        <h2 className="text-white mt-2 capitalize text-2xl md:text-3xl font-semibold">{scholar.title}</h2>
        <div className='text-gray-400 mt-4 mb-8' dangerouslySetInnerHTML={{__html: scholar.content}}></div>
      </div>
      <div className='grid grid-cols-1 container mx-auto py-20 px-4 lg:grid-cols-4 gap-4 '>
      
  {/* Render ONLY visible posts */}
  {posts?.slice(0, visibleCount).map((item: IPost, idx: number) => (
    <Card item={item} key={idx} OpenVideo={OpenVideo} />
  ))}

  {/* Load More Button */}
  {visibleCount < posts.length && (
    <div className="text-center mt-8 md:col-span-4">
      <button
        onClick={loadMore}
        className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition"
      >
        Load More
      </button>
    </div>
  )}


      </div>
    </div>
  )
}

export default SingleScholar


export const getServerSideProps: GetServerSideProps = async (context) => {


  const slug = context.params?.slug
  const sid = context.query.id

  const response = await apolloClient.query({
    query: PostsByScholar,
    variables: {
      sid
    },
  });

   const scholars = await apolloClient.query({
    query: Get_Scholar_By_ID,
    variables: {
      sid
    },
  });
  const posts = response.data.posts.nodes;
    const scholar = scholars.data.scholar;
  // console.log(posts);
  return {
    props: {
      posts, slug,
      scholar
    },
  };
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths: any = [];
//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }
