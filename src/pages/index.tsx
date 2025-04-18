import Image from "next/image";
import Main from "@/components/main/Main";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import ScholarCard from "@/components/scholar-card/ScholarCard";
import DonateNow from "@/components/donateNow/DonateNow";
import { useState } from "react";
import { getVideoCode } from "../utils";
import { SettingsContext } from "@/context/setting-context";
import React, { useContext } from "react";
import { IScholorType } from "@/utils/types";
import apolloClient from "@/config/client";
import {
  AllPosts,
  Categories,
  programsScheduling,
  AllScholars,
  HomeCategories,
  NewsTickers,
} from "@/config/query";
import { GetStaticProps } from "next";
import SeoMeta from "@/components/seo";
import CateCard from "@/components/cate-card/CatCard";
import { useRouter } from "next/router";

export default function Home({
  allposts,
  allCategories,
  allProgramsScheduling,
  Scholars,
}: any) {
  const { setModelIsOpen, setVideoLink } = useContext(SettingsContext);
  const OpenVideo = (link: string) => {
    setModelIsOpen(true);
    setVideoLink(link);
  };

  const featuredCategories = allCategories.filter(
    (item: any) => item.categoryInfo.featured === true
  );

  return (
    <>
      <SeoMeta
        title="Paigham TV | Jo Badal De Zindagi"
        url="/"
        description="Paigham TV is an Islamic educational channel television network. The production of this channel is based on the teachings of Quran o Sunnah. "
      />

      <Main posts={allposts} />
      <TabsSection allposts={allposts} allCategories={allCategories} />
      <PaighamChannelPresents
        programs={allProgramsScheduling}
        OpenVideo={OpenVideo}
      />
      {/* Categories section  */}
      <section className="container mx-auto mb-28 px-4">
        {/* heading  */}
        <div className="flex justify-between items-center mt-20 mb-10 border-b-[3px] border-darkgray pb-5">
          <h2 className="font-metapro text-3xl md:text-5xl text-darkgray font-bold">
            Categories
          </h2>
          <Link
            href="/series"
            className="uppercase flex hover:text-orange items-center gap-x-2 font-metapro text-xl tracking-widest font-semibold rtl:flex-row-reverse"
          >
            <span>View All</span>
            <HiOutlineArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {allCategories.map((item: any, idx: any) => (
            <CateCard key={idx} item={item} />
          ))}
        </div>
      </section>

      <section className="container mx-auto mb-28 px-4">
        <div className="flex justify-between items-center mt-20 mb-10 border-b-[3px] border-darkgray pb-5">
          <h2 className="font-metapro text-3xl md:text-5xl text-darkgray font-bold">
            Scholar
          </h2>
          <Link
            href="/scholars"
            className="uppercase flex hover:text-orange items-center gap-x-2 font-metapro text-xl tracking-widest font-semibold rtl:flex-row-reverse"
          >
            <span>View All</span>
            <HiOutlineArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Scholars.slice(0, 8).map((item: IScholorType, idx: number) => (
            <ScholarCard key={idx} item={item} />
          ))}
        </div>
      </section>
      {/* donate now section  */}
      <DonateNow />
    </>
  );
}

// Tabs section
const TabsSection = ({ allposts }: any) => {
  const [posts, setPost] = useState<any>(allposts.slice(0, 8));
  const [activeCategory, setActiveCategory] = useState("latest");
  const router = useRouter();

  const HandleVideosCategoryTabs = (slug: string) => {
    setActiveCategory(slug);
    const p =
      slug === "latest"
        ? allposts
        : allposts.filter((item: any) =>
            item.categories.nodes.some((item: any) => item.slug === slug)
          );
    setPost(p.slice(0, 8));
  };

  const { setModelIsOpen, setVideoLink } = useContext(SettingsContext);
  const OpenVideo = (link: string) => {
    // setModelIsOpen(true)
    // setVideoLink(link)
    router?.push(`/article/${link}`);
  };

  return (
    <section className="container mx-auto pt-36 sm:pt-20 px-2">
      {/* top header  */}
      <div className="flex justify-between item-center border-b-2 border-gray-500">
        <div className="grid grid-cols-4 sm:!flex flex-wrap justify-between space-x-2 w-full sm:w-auto font-metapro font-semibold  ">
          {tabData.map((item, idx) => (
            <li
              key={idx}
              className={`${
                activeCategory === item.slug &&
                "bg-secondary px-1 sm:px-4 py-2 text-primary "
              } ${
                idx === 1 && " col-span-2"
              } flex-1 flex justify-center md:min-w-[180px] w-auto cursor-pointer items-center md:text-base text-sm`}
              onClick={() => HandleVideosCategoryTabs(item.slug)}
            >
              {item.name}
            </li>
          ))}
        </div>
        <Link
          href="/"
          className="uppercase hidden md:flex hover:text-orange items-center space-x-2 font-metapro text-xl tracking-widest font-semibold rtl:flex-row-reverse"
        >
          <span>View All</span>
          <HiOutlineArrowRight />
        </Link>
      </div>
      {/* articles  */}
      <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 gap-2">
        {posts?.map((item: any, idx: number) => (
          <div className="px-1 group" key={idx}>
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="bg-red-300 relative overflow-hidden ">
                <Link href={`/article/${item.slug}`}>
                  <img
                    src={item?.featuredImage?.node?.mediaItemUrl}
                    alt="image"
                    width={700}
                    height={400}
                    className=" w-full object-cover transition-all h-[150px] md:h-[210px] duration-200 ease-in-out"
                  />
                  <div className=" group-hover:bg-black/40 absolute inset-0 group-hover:cursor-pointer p-3 md:p-6 flex flex-col justify-end font-metapro " />
                </Link>
              </div>
            </div>
            <h4
              className={`font-medium md:px-2 tracking-wide my-3 line-clamp-2`}
            >
              <Link href={`/article/${item.slug}`}>{item?.title}</Link>
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

// Paigham Channel Presents
const PaighamChannelPresents = ({ programs, OpenVideo }: any) => {
  const { setVideoLink } = useContext<any>(SettingsContext);

  const handleLink = (link: string) => {
    setVideoLink(link);
  };

  return (
    <section className="bg-primary mt-20">
      <div className="container font-metapro mx-auto px-4 text-white py-16">
        <h2 className=" text-3xl text-center md:text-5xl font-bold">
          Paigham Channel Presents
        </h2>
        <div className="md:flex mt-10 md:gap-x-10 ">
          <div className="md:w-full mt-5 md:mt-0">
            {/* top headings  */}
            <div className="font-semibold flex justify-between sm:text-xl tracking-widest item-center">
              <h5>TODAY'S GUIDE</h5>
              <Link href="/program-scheduling">
                <h5 className="text-secondary">FULL GUIDE</h5>
              </Link>
            </div>
            <ul className="mt-5">
              {programs.map((item: any, idx: number) => (
                <li
                  key={idx}
                  className="flex md:flex-row flex-col items-start gap-6 lg:gap-x-12 border-t-[1px] border-gray-500 py-5"
                >
                  <div className="w-full max-w-[240px] lg:max-w-[280px]">
                    <time className="font-medium text-xl">
                      {item?.programInfo?.programTime || `0000`}
                    </time>
                  </div>

                  <button className="bg-black/80 w-full md:w-auto min-w-[240px] flex justify-center items-center min-h-[180px] sm:min-h-[220px] md:!min-h-[120px] group">
                    <img
                      src="/images/ytbutton.png"
                      alt="icon"
                      onClick={() =>
                        OpenVideo(getVideoCode(item?.programInfo?.videoUrl))
                      }
                      width={80}
                      height={40}
                      className="group-hover:scale-105 transition-all duration-200 ease-linear"
                    />
                  </button>
                  <button
                    onClick={() =>
                      handleLink(getVideoCode(item?.programInfo?.videoUrl))
                    }
                  >
                    <h6 className="text-secondary sm:text-xl font-medium text-start -tracking-wide">
                      {item.title}
                    </h6>
                    <div
                      className="text-start sm:text-lg mt-2"
                      dangerouslySetInnerHTML={{ __html: item?.excerpt }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [postsResponse, categories, programs, Scholars_Res] = await Promise.all(
    [
      apolloClient.query({ query: AllPosts }),
      apolloClient.query({ query: HomeCategories }),
      apolloClient.query({ query: programsScheduling }),
      apolloClient.query({ query: AllScholars }),
    ]
  );

  const allposts = postsResponse.data.posts.nodes;
  const allCategories = categories.data.categories.nodes;
  const allProgramsScheduling = programs.data.programsScheduling.nodes;

  const Scholars = Scholars_Res.data.scholars.nodes;
  return {
    props: {
      allposts,
      allCategories,
      allProgramsScheduling,
      Scholars,
    },
  };
};

const tabData = [
  {
    name: "Latest",
    slug: "latest",
  },
  // {
  //   name: "Hajj & Eid al Adha",
  //   slug: "hajj",
  // },
  {
    name: "Ramzan 1446/2025",
    slug: "ramzan-1446-2025",
  },
  {
    name: "Short Clips",
    slug: "short-videos",
  },
  {
    name: "Khawabon Ki Tabeer",
    slug: "khawab-aur-tabeer",
  },
  {
    name: "Paigham QA",
    slug: "paigham-qa",
  },
];
