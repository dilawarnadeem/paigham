import PageBanner from "@/components/pageBanner/PageBanner";
import React from "react";
import { GetStaticProps } from "next";
import apolloClient from "@/config/client";
import { Categories } from "@/config/query";
import SeoMeta from "@/components/seo";
import CateCard from "@/components/cate-card/CatCard";

export default function SeriesPrograms({ allCategories }: any) {
  return (
    <>
      <SeoMeta
        title="Programs | Paigham TV"
        url="/programs"
        description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah "
      />
      <PageBanner title="Programs" image="/images/banner-2.jpg" />
      {/* <section className="pb-28 md:pt-20 bg-[#161F28]">
        {allScholars?.map((item: any, idx: any) => (
          <CategoryCard key={idx} items={item} />
        ))}
      </section> */}

       {/* Categories section  */}
      <section className="container mx-auto mb-28 px-4">
        {/* heading  */}
        <div className="flex justify-between items-center mt-20 mb-10 border-b-[3px] border-darkgray pb-5">
          <h2 className="font-metapro text-3xl md:text-5xl text-darkgray font-bold">
            Programs
          </h2>
         
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {allCategories.map((item: any, idx: any) => (
            <CateCard key={idx} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}



export const getStaticProps: GetStaticProps = async () => {
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const [
    
    categories,
    
  ] = await Promise.all([
 
    apolloClient.query({ query: Categories }),    
   
  ]);

  
  const allCategories = categories.data.categories.nodes;
  return {
    props: {
     
      allCategories,
      
    },
  };
};
