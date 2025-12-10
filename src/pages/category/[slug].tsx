import Category_Banner from "@/components/pageBanner/categoryBanner";
import SeoMeta from "@/components/seo";
import Card from "@/components/video-section/card";
import apolloClient from "@/config/client";
import { HomeCategories, PostsByCategory } from "@/config/query";
import { SettingsContext } from "@/context/setting-context";
import { extractVideoInfo } from "@/utils";
import { IPost } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import { FaCirclePlay, FaLinkedinIn } from "react-icons/fa6";
import Link from "next/link";
import CateCard from "@/components/cate-card/CatCard";
import { useRouter } from "next/router";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import ShareButtons from "@/components/share-buttons/ShareButtons";

const Category = ({ posts, slug, allCategories }: any) => {
  const {
    posts: { nodes },
  } = posts;

  const router = useRouter();

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

  // Sync selectedItem when videoLink changes
  useEffect(() => {
    const matched = nodes?.find(
      (x: any) => x?.postInfo?.tmVideoUrl === videoLink
    );
    if (matched) setSelectedItem(matched);
  }, [videoLink, nodes]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://paigham.tv/article/${selectItem?.slug}`
      );
      alert("Link copied!");
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <section className="bg-[rgb(22,31,40)] pb-20">
      <SeoMeta
        title={`${slug} | Paigham TV`}
        url={`/category/${slug}`}
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
                  className="w-full h-[620px] rounded-xl mb-10"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  allowFullScreen
                ></iframe>
              );
            }

            if (video.type === "facebook") {
              return (
                <iframe
                  className="w-full h-[620px] rounded-xl mb-10"
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

      {/* ----------------- SELECTED ITEM HEADER ----------------- */}
      <div className="container px-4 mx-auto">
        <div className="mt-12 pb-8 border-b-[2px] border-gray-800">
          <div className="md:flex justify-between items-end">
            <div>
              <h4 className="text-white font-semibold text-2xl md:text-3xl">
                {selectItem?.title}
              </h4>
              <h4 className="text-secondary text-lg my-2">{posts.name}</h4>
            </div>

            <ShareButtons slug={selectItem?.slug} onCopy={handleCopy} />
          </div>

          <div
            className="max-w-[800px] md:text-xl mt-4 text-gray-400"
            dangerouslySetInnerHTML={{
              __html: selectItem?.excerpt || posts?.description,
            }}
          />
        </div>
      </div>

      {/* ----------------- VIDEO CARDS LIST ----------------- */}
      <div className="md:px-2">
        <div className="grid grid-cols-1 container mx-auto py-20 px-4 lg:grid-cols-4 gap-4">
          {nodes?.slice(0, visibleCount).map((item: IPost, idx: number) => (
            <Card
              key={idx}
              item={item}
              OpenVideo={OpenVideo}
              slug={slug}
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
      </div>

      {/* ----------------- TOP CATEGORIES ----------------- */}
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

export default Category;

export const getServerSideProps = async (context: any) => {
  const queryParam = context?.query?.sort || "ASC";
  const slug = context.params?.slug;

  const response = await apolloClient.query({
    query: PostsByCategory,
    variables: {
      slug,
      order: queryParam,
    },
  });

  const categories = await apolloClient.query({ query: HomeCategories });

  return {
    props: {
      posts: response.data.category,
      slug,
      allCategories: categories.data.categories.nodes,
    },
  };
};
