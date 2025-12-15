import SeoMeta from "@/components/seo";
import CateCard from "@/components/cate-card/CatCard";
import ShareButtons from "@/components/share-buttons/ShareButtons";
import apolloClient from "@/config/client";
import { HomeCategories, PostsByCategory, SinglePost } from "@/config/query";
import { SettingsContext } from "@/context/setting-context";
import { extractVideoInfo } from "@/utils";
import { IPost } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import Link from "next/link";

const SingleArticle = ({ post, allCategories, relatedPost }: any) => {
  const { setVideoLink, videoLink } = useContext(SettingsContext);

  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [selectItem, setSelectedItem] = useState<any>(post);



  // ---------------- PLAY VIDEO ----------------
  const handlePlay = () => {
    const link = post.postInfo?.tmVideoUrl;
    setCurrentVideo(link);
    setVideoLink(link);
    setSelectedItem(post);
  };

  // Sync selected post when videoLink changes
  useEffect(() => {
    if (videoLink) setCurrentVideo(videoLink);
  }, [videoLink]);

  const {
    posts: { nodes },
  } = relatedPost;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://paigham.tv/article/${selectItem?.slug}`
      );
      alert("Link copied!");
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <section className="bg-[rgb(22,31,40)] pb-20">
      <SeoMeta
        title={`${post?.title} | Paigham TV`}
        url={`/article/${post?.slug}`}
        description="Paigham TV is a satellite TV channel the objectives of which are preaching Quran & Sunnah."
      />

      {/* ---------------- VIDEO PLAYER ---------------- */}
      {currentVideo ? (
        <div className="container mx-auto px-4 pt-10">
          {(() => {
            const video = extractVideoInfo(currentVideo);
            if (!video) return null;

            if (video.type === "youtube") {
              return (
                <iframe
                  className="w-full md:h-[620px] h-[280px] aspect-video rounded-xl mb-10"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  allowFullScreen
                ></iframe>
              );
            }

            if (video.type === "facebook") {
              return (
                <iframe
                  className="w-full md:h-[620px] h-[280px] aspect-video rounded-xl mb-10"
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
        /* ---------------- BANNER WITH PLAY BUTTON ---------------- */
        <section className="relative">
          <img
            src={
              post?.featuredImage?.node?.mediaItemUrl ||
              "/images/tafseer-ul-quran.jpeg"
            }
            width={1200}
            height={800}
            alt={post?.title}
            className="h-[500px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#161F28] via-[#161F28]/60 to-black/0" />

          <div
            onClick={handlePlay}
            className="absolute inset-0 flex justify-center cursor-pointer"
          >
            <FaCirclePlay className="text-5xl md:text-7xl text-secondary animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </section>
      )}

      {/* ---------------- POST HEADER ---------------- */}
      <div className="container px-4 mx-auto">
        <div className="mt-12 pb-8 border-b-[2px] border-gray-800">
          <div className="md:flex justify-between items-end">
            <div>
              <h4 className="text-white font-semibold text-2xl md:text-3xl">
                {selectItem?.title}
              </h4>

              <h4 className="text-secondary text-lg my-2">
                {selectItem?.categories?.nodes?.[0]?.name}
              </h4>
            </div>

            <ShareButtons slug={selectItem?.slug} onCopy={handleCopy} />
          </div>

          <div
            className="max-w-[800px] md:text-xl mt-4 text-gray-400"
            dangerouslySetInnerHTML={{
              __html: post?.excerpt || post?.description,
            }}
          />
        </div>
      </div>

      {/* ---------------- RELATED VIDEOS GRID ---------------- */}
      <div className="md:px-2">
        <div className="grid grid-cols-1 container mx-auto py-20 px-4 lg:grid-cols-4 gap-4">
          {nodes?.map((item: IPost, idx: number) => (
            <div
              key={idx}
              onClick={() => {
                setVideoLink(item.postInfo.tmVideoUrl);
                setCurrentVideo(item.postInfo.tmVideoUrl);
                setSelectedItem(item);
              }}
              className="cursor-pointer"
            >
              <img
                src={item?.featuredImage?.node?.mediaItemUrl}
                className="rounded-lg object-cover h-[180px] w-full"
              />
              <h4 className="mt-3 text-white font-medium line-clamp-2">
                {item?.title}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- TOP CATEGORIES ---------------- */}
      <section className="container mx-auto mb-28 px-4">
        <h2 className="text-xl text-white font-semibold mt-20 mb-6">
          Top Categories
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {allCategories.map((item: any, idx: any) => (
            <CateCard key={idx} item={item} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default SingleArticle;

/* ---------------- SERVER SIDE ---------------- */
export const getServerSideProps = async (context: any) => {
  const queryParam = context?.query?.sort || "ASC";
  const slug = context.params?.slug;

  const response = await apolloClient.query({
    query: SinglePost,
    variables: { slug },
  });

  const sameCategoriesResponse = await apolloClient.query({
    query: PostsByCategory,
    variables: {
      slug: response.data.post?.categories?.nodes?.[0]?.slug,
      order: queryParam,
    },
  });

  const categories = await apolloClient.query({ query: HomeCategories });

  return {
    props: {
      post: response.data.post,
      relatedPost: sameCategoriesResponse.data.category,
      allCategories: categories.data.categories.nodes,
    },
  };
};
