import Category_Banner from "@/components/pageBanner/categoryBanner";
import SeoMeta from "@/components/seo";
import Card from "@/components/video-section/card";
import apolloClient from "@/config/client";
import { HomeCategories, PostsByCategory } from "@/config/query";
import { SettingsContext } from "@/context/setting-context";
import { sliderSettings } from "@/utils";
import { IPost } from "@/utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import Slider from "react-slick";
import Link from "next/link";
import CateCard from "@/components/cate-card/CatCard";
import { useRouter } from "next/router";

import { FaFacebook } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";

const Category = ({ posts, slug, allCategories }: any) => {
  const {
    posts: { nodes },
  } = posts;

  const router = useRouter();

  const { setModelIsOpen, setVideoLink, videoLink } =
    useContext(SettingsContext);

  const [selectItem, setSelectedItem] = useState<any>();
  const [selectedValue, setSelectedValue] = useState('latest');
  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
    router.push(`/category/${slug}?sort=${event.target.value}`)
  };

  const OpenVideo = (link: string) => {
    setModelIsOpen(false);
    setVideoLink(link);
  };

  useEffect(() => {
    const fItem = nodes?.find(
      (item: any) => item?.postInfo?.tmVideoUrl === videoLink
    );
    setSelectedItem(fItem);
  }, [videoLink, setVideoLink, nodes]);

  const slider = React.useRef<any>(null);

  const hanldeVideoButton = () => {
    setVideoLink(nodes[0].postInfo.tmVideoUrl);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://paigham.tv/category/${slug}`
      );
      alert("Text copied to clipboard!");
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
      {videoLink ? (
        nodes
          ?.slice(0, 1)
          .map((item: IPost, idx: number) => (
            <Category_Banner key={idx} item={item} />
          ))
      ) : (
        <section className="relative">
          <Image
            src={
              posts?.categoryInfo?.categoryBanner?.mediaItemUrl ||
              "/images/tafseer-ul-quran.jpeg"
            }
            width={1200}
            height={800}
            alt={posts.name}
            className="h-[500px] w-full object-cover"
          />
          <div className="bg-gradient-to-t from-[#161F28] via-[#161F28]/60 absolute inset-0 to-black/0" />
          <FaCirclePlay
            onClick={hanldeVideoButton}
            className="text-5xl md:text-7xl animate-pulse cursor-pointer text-secondary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          />
        </section>
      )}

      <div className="container px-4 mx-auto">
        <div className=" mt-12 pb-8 border-b-[2px] border-gray-800">
          <div className="md:flex justify-between items-end mt-2 md:mt-0">
            <div>
              <h4 className="text-white max-w-[900px] font-semibold text-2xl md:text-3xl">
                {selectItem?.title}
              </h4>
              <h4 className="text-secondary text-lg my-2 md:mb-0">
                {posts.name}
              </h4>
            </div>
            <ul className="flex text-white items-center gap-3 text-xl md:text-2xl">
              <li>Share: </li>
              <li className="hover:text-secondary cursor-pointer">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://paigham.tv/category/${posts.slug}`}
                >
                  <FaFacebook />
                </Link>
              </li>
              <li className="hover:text-secondary cursor-pointer">
                <Link
                  href={`https://twitter.com/intent/tweet?text=https://paigham.tv/category/${posts.slug}`}
                >
                  <BsTwitter />
                </Link>
              </li>

              <li className="hover:text-secondary cursor-pointer">
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https://paigham.tv/category/${posts.slug}`}
                >
                  <FaLinkedinIn />
                </Link>
              </li>
              <li onClick={handleCopy} className="cursor-pointer">
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593c.734-.737 1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.601 3.601 0 0 0 15.24 2"
                  />
                  <path
                    fill="currentColor"
                    d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847c.843.847.843 2.21.843 4.936v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936z"
                  />
                </svg>
              </li>
            </ul>
          </div>
          <div
            className="max-w-[800px] md:text-xl mt-4 text-gray-400 "
            dangerouslySetInnerHTML={{
              __html: selectItem?.excerpt || posts?.description,
            }}
          />
        </div>
      </div>
      <div className="flex justify-end container mx-auto px-4">
          <form className="max-w-sm flex items-center gap-2 mt-10">
            <label
              className="block text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white"
            >
              Sorting
            </label>
            <select
        id="countries"
        className="bg-gray-50 border min-w-[160px] border-gray-300 text-gray-900 text-sm outline-none focus:none rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        value={selectedValue} // Bind the value to state
        onChange={handleChange} // Bind the change handler
      >
        <option value="ASC">Latest</option>
        <option value="DESC">Old</option>
      </select>
          </form>
        </div>
      <div className="md:px-2 mt-20 relative">
        <Slider {...sliderSettings} ref={slider}>
          {nodes
            ?.map((item: IPost, idx: number) => (
              <Card item={item} key={idx} OpenVideo={OpenVideo} slug />
            ))}
        </Slider>
        <div className={nodes?.length > 4 ? "" : "lg:hidden"}>
          <button
            className="md:text-2xl text-xl text-white hover:text-primary bg-black/50  absolute -top-4 px-1 md:px-1.5 bottom-0 left-0 "
            onClick={() => slider?.current?.slickPrev()}
          >
            <MdArrowBackIosNew />
          </button>
          <button
            className="md:text-2xl text-xl text-white hover:text-primary bg-black/50  absolute -top-4 px-1 md:px-1.5 bottom-0 right-0"
            onClick={() => slider?.current?.slickNext()}
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>

      <section className="container mx-auto mb-28 px-4">
        {/* heading  */}
        <div className="flex justify-between items-center mt-20 mb-6">
          <h2 className="font-metapro text-xl text-white font-semibold">
            Top Categories
          </h2>
        </div>
        
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

export const getServerSideProps: any = async (context:any) => {
  const queryParam = context?.query?.sort;

  const slug = context.params?.slug;
  const response = await apolloClient.query({
    query: PostsByCategory,
    variables: {
      slug,
      order: queryParam
    },
  });

  const [categories] = await Promise.all([
    apolloClient.query({ query: HomeCategories }),
  ]);

  const posts = response.data.category;
  const allCategories = categories.data.categories.nodes;

  return {
    props: {
      posts,
      slug,
      allCategories,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths: any = [];
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };
