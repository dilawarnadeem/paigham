import Main from "@/components/main/Main";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import ScholarCard from "@/components/scholar-card/ScholarCard";
import DonateNow from "@/components/donateNow/DonateNow";
import { useState } from "react";
import { SettingsContext } from "@/context/setting-context";
import React, { useContext } from "react";
import { IScholorType } from "@/utils/types";
import apolloClient from "@/config/client";
import {
  AllPosts,
  AllScholars,
  HomeCategories,
  NewsTickers,
  SlidesQuery,
  ProgramsSchedulingByDay,
  ThemeOptionsQuery,
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
  Slider,
  OptionsData,
}: any) {
  const { setModelIsOpen, setVideoLink } = useContext(SettingsContext);
  const OpenVideo = (link: string) => {
    setModelIsOpen(true);
    setVideoLink(link);
  };

  const featuredCategories = allCategories.filter(
    (item: any) => item.categoryInfo.featured === true
  );

  // Replace (or extend) your tabData using ACF categories
  const tabData =
    OptionsData?.categories?.nodes?.map((cat: any) => ({
      name: cat.name,
      slug: cat.slug,
    })) || []; // fallback if empty

  return (
    <>
      <SeoMeta
        title="Paigham TV | Jo Badal De Zindagi"
        url="/"
        description="Paigham TV is an Islamic educational channel television network. The production of this channel is based on the teachings of Quran o Sunnah. "
      />

      <Main posts={Slider} Options={OptionsData} />
      <TabsSection
        allposts={allposts}
        allCategories={allCategories}
        tabData={tabData}
      />
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
            href="/programs"
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
const TabsSection = ({ allposts, tabData }: any) => {
  const [posts, setPost] = useState<any>(allposts.slice(0, 8));
  const [activeCategory, setActiveCategory] = useState("latest");
  const router = useRouter();

  const HandleVideosCategoryTabs = (slug: string) => {
    setActiveCategory(slug);
    const filtered =
      slug === "latest"
        ? allposts
        : allposts.filter((item: any) =>
            item.categories.nodes.some((cat: any) => cat.slug === slug)
          );
    setPost(filtered.slice(0, 8));
  };

  return (
    <section className="container mx-auto pt-10 md:pt-20  px-2">
      <div className="flex justify-between item-center border-b-2 border-gray-500">
        <ul className="hidden sm:grid grid-cols-4 sm:!flex flex-wrap justify-between space-x-2 w-full sm:w-auto font-metapro font-semibold">
          <li
            className={`${
              activeCategory === "latest"
                ? "bg-secondary px-1 sm:px-4 py-2 text-primary"
                : ""
            } flex-1 flex justify-center md:min-w-[180px] cursor-pointer items-center`}
            onClick={() => HandleVideosCategoryTabs("latest")}
          >
            Latest
          </li>
          {tabData?.map((item: any, idx: number) => (
            <li
              key={idx}
              className={`${
                activeCategory === item.slug
                  ? "bg-secondary px-1 sm:px-4 py-2 text-primary"
                  : ""
              } flex-1 flex justify-center md:min-w-[180px] cursor-pointer items-center`}
              onClick={() => HandleVideosCategoryTabs(item.slug)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="block sm:hidden w-full">
          <select
            className="w-full border p-2 rounded font-metapro"
            value={activeCategory}
            onChange={(e) => HandleVideosCategoryTabs(e.target.value)}
          >
            {tabData?.map((item: any, idx: number) => (
              <option key={idx} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/"
          className="uppercase hidden md:flex hover:text-orange items-center space-x-2 font-metapro text-xl tracking-widest font-semibold rtl:flex-row-reverse"
        >
          <span>View All</span>
          <HiOutlineArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 mt-10 gap-2">
        {posts?.map((item: any, idx: number) => (
          <div key={idx} className="px-1 group">
            <div className="bg-black rounded-lg overflow-hidden">
              <Link href={`/article/${item.slug}`}>
                <img
                  src={
                    item.featuredImage?.node?.mediaItemUrl ||
                    "/images/default.jpg"
                  }
                  alt={item.title}
                  className="w-full h-auto md:h-[210px] object-cover"
                />
              </Link>
            </div>
            <h4 className="font-medium md:px-2 tracking-wide my-3 line-clamp-2">
              <Link href={`/article/${item.slug}`}>{item.title}</Link>
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

// Paigham Channel Presents
const PaighamChannelPresents = ({ programs }: any) => {
  return (
    <section className="bg-primary mt-20">
      <div className="container font-metapro mx-auto px-4 text-white py-16">
        <h2 className=" text-3xl text-center md:text-5xl font-bold">
          Today On Paigham TV
        </h2>
        <div className="md:flex mt-10 md:gap-x-10 ">
          <div className="md:w-full mt-5 md:mt-0">
            {/* top headings  */}
            <div className="font-semibold flex justify-between sm:text-xl tracking-widest item-center">
              <h5>TODAY'S GUIDE</h5>
              <Link href="/tv-guide">
                <h5 className="text-secondary">FULL GUIDE</h5>
              </Link>
            </div>
            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2">
              {programs?.map((item: any, idx: number) => (
                <li
                  key={idx}
                  className="flex flex-row items-center gap-6 lg:gap-x-12 border-t-[1px] border-gray-500 py-5"
                >
                  <div className="w-full max-w-[170px] lg:max-w-[280px]">
                    <time className="font-medium text-sm">
                      {item?.programInfo?.programTime || `0000`}
                    </time>
                  </div>

                  <div>
                    <h6 className="text-secondary sm:text-xl font-medium text-start -tracking-wide">
                      {item.title}
                    </h6>
                    <div
                      className="text-start sm:text-lg mt-2"
                      dangerouslySetInnerHTML={{ __html: item?.excerpt }}
                    />
                  </div>
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
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const [
    postsResponse,
    categories,
    programs,
    Scholars_Res,
    Slider,
    ThemeOptions,
  ] = await Promise.all([
    apolloClient.query({ query: AllPosts }),
    apolloClient.query({ query: HomeCategories }),
    apolloClient.query({
      query: ProgramsSchedulingByDay,
      variables: { id: today }, // ⭐ pass today dynamically
      fetchPolicy: "no-cache",
    }),
    apolloClient.query({ query: AllScholars }),
    apolloClient.query({ query: SlidesQuery }),
    apolloClient.query({ query: ThemeOptionsQuery }),
  ]);

  const allposts = postsResponse.data.posts.nodes;
  const allCategories = categories.data.categories.nodes;
  const allProgramsScheduling =
    programs.data.singleDay.programsScheduling.nodes;

  const Scholars = Scholars_Res.data.scholars.nodes;
  const sliderData = Slider.data.slides.nodes;
  const OptionsData = ThemeOptions.data.themeGeneralSettings.zamzamOptions;
  return {
    props: {
      allposts,
      allCategories,
      allProgramsScheduling,
      Scholars,
      Slider: sliderData,
      OptionsData,
    },
  };
};
