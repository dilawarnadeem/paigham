import Category_Banner from "@/components/pageBanner/categoryBanner";
import SeoMeta from "@/components/seo";
import Card from "@/components/video-section/card";
import apolloClient from "@/config/client";
import { HomeCategories, PostsByCategory } from "@/config/query";
import { SettingsContext } from "@/context/setting-context";
import { sliderSettings } from "@/utils";
import { IPost } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaCirclePlay, FaLinkedinIn } from "react-icons/fa6";
import Slider from "react-slick";
import Link from "next/link";
import CateCard from "@/components/cate-card/CatCard";
import { useRouter } from "next/router";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { GetStaticPaths } from "next";



const Category = ({ posts, slug, allCategories }: any) => {
  const {
    posts: { nodes },
  } = posts;

  const router = useRouter();

  const { setModelIsOpen, setVideoLink, videoLink } =
    useContext(SettingsContext);

  const [selectItem, setSelectedItem] = useState<any>();
  const [selectedValue, setSelectedValue] = useState("latest");

  const handleChange = (event: any) => {
    const value = event.target.value;
    setSelectedValue(value);
    router.push(`/category/${slug}?sort=${value}`);
  };

  const OpenVideo = (link: string, item: any) => {
    setModelIsOpen(false);
    setVideoLink(link);
    setSelectedItem(item); // 👈 force update selected video
  };
  useEffect(() => {
    const fItem = nodes?.find(
      (item: any) => item?.postInfo?.tmVideoUrl === videoLink
    );
    setSelectedItem(fItem || nodes?.[0]);
  }, [videoLink, nodes]);

  const slider = React.useRef<any>(null);

  const hanldeVideoButton = () => {
    if (nodes?.[0]) {
      setVideoLink(nodes[0].postInfo.tmVideoUrl);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://paigham.tv/article/${selectItem?.slug}`
      );
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="bg-[rgb(22,31,40)] pb-20">
      <SeoMeta
        title={`${slug}  | Paigham TV`}
        url={`/category/${slug}`}
        description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah "
      />

      {/* Banner Video or Image */}
      {videoLink ? (
        selectItem && <Category_Banner item={selectItem} />
      ) : (
        <section className="relative ">
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
          <div className="bg-gradient-to-t from-[#161F28] via-[#161F28]/60 absolute inset-0 to-black/0" />
          <Link
            href={`/article/${selectItem?.slug}`}
            className="absolute inset-0 flex justify-center"
          >
            <FaCirclePlay className="text-5xl md:text-7xl animate-pulse cursor-pointer text-secondary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
          </Link>
        </section>
      )}

      {/* Content */}
      <div className="container px-4 mx-auto">
        <div className="mt-12 pb-8 border-b-[2px] border-gray-800">
          <div className="md:flex justify-between items-end mt-2 md:mt-0">
            <div>
              <h4 className="text-white font-semibold text-2xl md:text-3xl">
                {selectItem?.title}
              </h4>
              <h4 className="text-secondary text-lg my-2 md:mb-0">
                {posts.name}
              </h4>
            </div>

            {/* Share Icons */}
            <ul className="flex text-white items-center gap-3 text-xl md:text-2xl">
              <li>Share:</li>

              <li className="hover:text-secondary">
                <Link
                  href={`https://api.whatsapp.com/send?text=https://paigham.tv/article/${selectItem?.slug}`}
                >
                  <FaWhatsapp size={25} />
                </Link>
              </li>

              <li className="hover:text-secondary">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://paigham.tv/article/${selectItem?.slug}`}
                >
                  <FaFacebook />
                </Link>
              </li>

              <li className="hover:text-secondary">
                <Link
                  href={`https://www.instagram.com/?url=https://paigham.tv/article/${selectItem?.slug}`}
                >
                  <FaInstagram />
                </Link>
              </li>

              <li className="hover:text-secondary">
                <Link
                  href={`https://twitter.com/intent/tweet?text=https://paigham.tv/article/${selectItem?.slug}`}
                >
                  <BsTwitter />
                </Link>
              </li>

              <li className="hover:text-secondary">
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https://paigham.tv/article/${selectItem?.slug}`}
                >
                  <FaLinkedinIn />
                </Link>
              </li>

              <li onClick={handleCopy} className="cursor-pointer">
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15.24 2h-3.894..." />
                </svg>
              </li>
            </ul>
          </div>

          <div
            className="max-w-[800px] md:text-xl mt-4 text-gray-400"
            dangerouslySetInnerHTML={{
              __html: selectItem?.excerpt || posts?.description,
            }}
          />
        </div>
      </div>

      {/* Sorting */}
      <div className="flex justify-end container mx-auto px-4">
        <form className="max-w-sm flex items-center gap-2 mt-10">
          <label className="block text-sm font-medium text-white">
            Sorting
          </label>

          <select
            className="bg-gray-50 min-w-[160px] border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={selectedValue}
            onChange={handleChange}
          >
            <option value="ASC">Latest</option>
            <option value="DESC">Oldest</option>
          </select>
        </form>
      </div>

      {/* Slider */}
      <div className="md:px-2 mt-20 relative">
        <Slider {...sliderSettings} ref={slider}>
          {nodes?.map((item: IPost, idx: number) => (
            <Card
              key={idx}
              item={item}
              OpenVideo={() => OpenVideo(item.postInfo.tmVideoUrl, item)}
              slug
            />
          ))}
        </Slider>

        {/* Slider Buttons */}
        <div className={nodes?.length > 4 ? "" : "lg:hidden"}>
          <button
            className="md:text-2xl text-xl text-white hover:text-primary bg-black/50 absolute -top-4 left-0 px-1 md:px-1.5"
            onClick={() => slider?.current?.slickPrev()}
          >
            <MdArrowBackIosNew />
          </button>

          <button
            className="md:text-2xl text-xl text-white hover:text-primary bg-black/50 absolute -top-4 right-0 px-1 md:px-1.5"
            onClick={() => slider?.current?.slickNext()}
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>

      {/* Top Categories */}
      <section className="container mx-auto mb-28 px-4">
        <h2 className="font-metapro text-xl text-white font-semibold mt-20 mb-6">
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

/* -----------------------------------
   Server-Side Data Fetching
------------------------------------ */
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
