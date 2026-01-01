import Category_Banner from "@/components/pageBanner/categoryBanner";
import SeoMeta from "@/components/seo";
import Card from "@/components/video-section/card";
import apolloClient from "@/config/client";
import { PostsByTags } from "@/config/query";
import { SettingsContext } from "@/context/setting-context";
import { extractVideoInfo } from "@/utils";
import { IPost } from "@/utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";

const Tags = ({ posts,slug }: any) => {
  const {
    name,
    posts: { nodes },
  } = posts;

  
    // ❗ Show video only when user clicks play on banner or card
    const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  
    const [visibleCount, setVisibleCount] = useState(8);
    const loadMore = () => setVisibleCount((prev) => prev + 8);
  
    const { setModelIsOpen, setVideoLink, videoLink } =
      useContext(SettingsContext);
  
    const [selectItem, setSelectedItem] = useState<any>();
  
    // PLAY FIRST VIDEO WHEN USER CLICKS BANNER PLAY BUTTON
    const handlePlayBanner = () => {
      if (nodes?.[0]) {
        const firstItem = nodes[0];
        setCurrentVideo(firstItem.postInfo.tmVideoUrl);
        setVideoLink(firstItem.postInfo.tmVideoUrl);
        setSelectedItem(firstItem);
      }
    };
  
    // OPEN VIDEO FROM CARD CLICK
    const OpenVideo = (link: string, item: any) => {
      setVideoLink(link);
      setCurrentVideo(link);
      setSelectedItem(item);
    };

  return (
    <section className="bg-[rgb(22,31,40)] pb-20">
      <SeoMeta
        title={`${name} | Paigham TV`}
        url={`/tags/${slug}`}
        description="Paigham TV is a satellite TV channel the objectives of which are preaching the Holy Quran and Sunnah."
      />

     {/* ----------------- SHOW VIDEO PLAYER ----------------- */}
          {currentVideo ? (
            <div className="container mx-auto px-4 pt-10" id="videoplayer">
              {(() => {
                const video = extractVideoInfo(currentVideo);
                if (!video) return null;
    
                if (video.type === "youtube") {
                  return (
                    <iframe
                      className="w-full md:h-[620px] h-[280px]  aspect-video  rounded-xl mb-10"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=0&rel=0`}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                }
    
                if (video.type === "facebook") {
                  return (
                    <iframe
                      className="w-full md:h-[620px]  h-[280px] aspect-video  rounded-xl mb-10"
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                        video.url
                      )}&show_text=false&width=800`}
                      allow="encrypted-media; autoplay; clipboard-write"
                      allowFullScreen
                    ></iframe>
                  );
                }
    
                return null;
              })()}
            </div>
          ) : (
            /* ----------------- SHOW BANNER ----------------- */
            <section className="relative">
              <img
                src={
                  posts?.categoryInfo?.categoryBanner?.node.mediaItemUrl ||
                  "/images/tafseer-ul-quran.jpeg"
                }
                width={1200}
                height={800}
                alt={posts.name}
                className="h-[500px] w-full object-cover"
              />
    
              <div className="absolute inset-0 bg-gradient-to-t from-[#161F28] via-[#161F28]/60 to-black/0" />
    
              <div
                onClick={handlePlayBanner}
                className="absolute inset-0 flex justify-center cursor-pointer"
              >
                <FaCirclePlay className="text-5xl md:text-7xl animate-pulse text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </section>
          )}
      <h2 className="container mx-auto text-3xl text-white font-bold px-4 my-10">
        {name}
      </h2>
      <div className="grid grid-cols-2 container mx-auto  px-4 lg:grid-cols-4 gap-4 mb-20">
        {nodes?.slice(0, visibleCount).map((item: IPost, idx: number) => (
          <Card
              key={idx}
              item={item}
              OpenVideo={OpenVideo}
             
              CurrentVideo={setCurrentVideo}
            />
        ))}

         {visibleCount < nodes.length && (
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
    </section>
  );
};

export default Tags;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  const response = await apolloClient.query({
    query: PostsByTags,
    variables: {
      slug,
    },
  });
  const posts = response.data.tag;

  return {
    props: {
      posts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any = [];
  return {
    paths,
    fallback: "blocking",
  };
};
