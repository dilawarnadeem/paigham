import PageBanner from '@/components/pageBanner/PageBanner'
import SeoMeta from '@/components/seo'
import apolloClient from '@/config/client'
import { SearchPost } from '@/config/query'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const Search = ({allPosts}:any) => {
     console.log("🚀 ~ Search ~ allPosts:", allPosts)
     const router = useRouter()
     const q = router.query.q

     return (
          <>
               <SeoMeta title={`${q} | Paigham TV`} url="/series" description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah " />
               <PageBanner title={q} image="/images/banner-2.jpg" />

          </>
     )
}

export default Search



export const getServerSideProps = async ({query}:any) => {
     const q = query.q
     const [posts] = await Promise.all([
          apolloClient.query({
               query: SearchPost,
               variables: {
                    search: q
               },
          }),
     ]);
     const allPosts = posts.data.posts.nodes
     return {
          props: {
               allPosts
          },
     };
}