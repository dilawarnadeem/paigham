import PageBanner from '@/components/pageBanner/PageBanner'
import SeoMeta from '@/components/seo'
import Card from '@/components/video-section/card'
import apolloClient from '@/config/client'
import { PostsByScholar } from '@/config/query'
import { SettingsContext } from '@/context/setting-context'
import { IPost } from '@/utils/types'
import { GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import React, { useContext } from 'react'

const SingleScholar = ({ posts, slug }: any) => {
  // const { name, posts: { nodes } } = posts


  const { setModelIsOpen, setVideoLink } = useContext(SettingsContext)
  const OpenVideo = (link: string) => {
    setModelIsOpen(true)
    setVideoLink(link)
  }

  return (
    <>
    <SeoMeta title= {`${slug}  | Paigham TV`} url={`/scholars/${slug}`} description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />
 
      <PageBanner title={slug} image="/images/banner2.jpg" />
      <div className='grid grid-cols-2 container mx-auto my-20 px-4 lg:grid-cols-4 gap-4'>
        {
          posts?.map((item: IPost, idx: number) => (
            <Card item={item} key={idx} OpenVideo={OpenVideo} />
          ))
        }
      </div>
    </>
  )
}

export default SingleScholar


export const getServerSideProps: GetServerSideProps = async (context) => {

  //const { queryStringData } = context;
  // const { param1, param2 } = queryStringData;
  const slug = context.params?.slug
  const sid = context.query.id

  console.log(sid)
  const response = await apolloClient.query({
    query: PostsByScholar,
    variables: {
      sid
    },
  });
  const posts = response.data.posts.nodes;
  // console.log(posts);
  return {
    props: {
      posts, slug
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
