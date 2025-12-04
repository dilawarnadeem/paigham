import SeoMeta from "@/components/seo";
import apolloClient from "@/config/client";
import { Get_Scholar_By_ID, PostsByScholar } from "@/config/query";
import { extractYoutubeID } from "@/utils";
import { IPost } from "@/utils/types";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

const SingleScholar = ({ posts, slug, scholar }: any) => {

  const firstVideo = posts?.[0]?.postInfo?.tmVideoUrl || "";

  // State for current video being played
  const [currentVideo, setCurrentVideo] = useState(firstVideo);

  const [visibleCount, setVisibleCount] = useState(8);
  const loadMore = () => setVisibleCount(prev => prev + 8);



  return (
    <div className="bg-[#161F28]">
      <SeoMeta title={`${slug} | Paigham TV`} url={`/scholars/${slug}`} />

     {/* ------ VIDEO PLAYER AFTER HEADER ------ */}
      <div className="container mx-auto px-4 pt-10" id="videoplayer">
        {currentVideo && (
          <div className="w-full h-[620px] aspect-video rounded-xl overflow-hidden mb-10">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${extractYoutubeID(currentVideo)}`}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 pt-14">
        <h6 className="uppercase text-xl text-secondary font-medium">Scholar:</h6>

        <h2 className="text-white mt-2 capitalize text-2xl md:text-3xl font-semibold">
          {scholar.title}
        </h2>

        <div
          className="text-gray-400 mt-4 mb-8"
          dangerouslySetInnerHTML={{ __html: scholar.content }}
        ></div>
      </div>

     
      {/* ------ VIDEO GRID ------ */}
      <div className="grid grid-cols-1 container mx-auto py-20 px-4 lg:grid-cols-4 gap-4">
        {posts?.slice(0, visibleCount).map((item: IPost, idx: number) => (
         <div
  key={idx}
  className="px-1 group cursor-pointer"
  onClick={() => {
    setCurrentVideo(item.postInfo.tmVideoUrl);
    document.getElementById("videoplayer")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  }}
>
            <div className="bg-black rounded-lg overflow-hidden">
              <img
                src={item?.featuredImage?.node?.mediaItemUrl}
                alt="image"
                width={1280}
                height={720}
                className="w-full object-cover max-h-[200px]"
              />
            </div>

            <h4 className="font-medium md:px-2 tracking-wide my-3 line-clamp-2 text-white">
              {item.title}
            </h4>
          </div>
        ))}

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
  );
};

export default SingleScholar;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;
  const sid = context.query.id;

  const response = await apolloClient.query({
    query: PostsByScholar,
    variables: { sid },
  });

  const scholarRes = await apolloClient.query({
    query: Get_Scholar_By_ID,
    variables: { sid },
  });

  return {
    props: {
      posts: response.data.posts.nodes,
      scholar: scholarRes.data.scholar,
      slug,
    },
  };
};
