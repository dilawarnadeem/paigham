import apolloClient from "@/config/client";
import { GET_LIVE } from "@/config/query";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import QuranTV from "../channel/quran-tv";

const navButons = [
  {
    name: "TV Urdu",
    icon: "/images/tv_icon.png",
    live: "/images/live.png",
  },
  {
    name: "Quran TV",
    icon: "/images/tv_icon.png",
    live: "/images/live.png",
  },
  {
    name: "TV Pashto",
    link: "/channel/tv-pashto", // Note: Keeping this as fallback; remove if fully dynamic
    icon: "/images/pashto_icon.png",
    live: "/images/live.png",
  },
];

interface LivePageProps {
  pageData: any; // You can replace 'any' with the actual type of your data (e.g., { liveLink: string; channelNavLinks: string[] })
}

const LivePage: React.FC<LivePageProps> = ({ pageData }) => {
  console.log(pageData);

  const TVUrdu = pageData.liveLink;
  const TVQuran = pageData.pashtoTv;
  const TVPashto = pageData.quranTv;

  return (
    <>
      <div className="youtube-embed">
        <iframe
          src={pageData.liveLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="flex md:flex-row sm:flex-col gap-5 px-4  w-auto mx-auto justify-center items-center my-5">
        <Link
          href={TVUrdu}
          target="_blank"
          className="font-montserrat sm:max-w-[220px] text-primary w-full font-normal group uppercase bg-secondary shadow-lg hover:bg-primary hover:text-white"
        >
          <div className="px-2 py-2.5 flex items-center gap-1.5 lg:gap-x-1 justify-start">
            <img
              src="/images/tv_icon.png"
              alt="{item.name}"
              className="w-[25px]"
            />
            <p className="text-[14px] pt-1">TV Urdu</p>
            <img src="/images/live.png" alt="" className="w-[32px]" />
          </div>
        </Link>
        <Link
          href={TVQuran}
          target="_blank"
          className="font-montserrat sm:max-w-[220px] text-primary w-full font-normal group uppercase bg-secondary shadow-lg hover:bg-primary hover:text-white"
        >
          <div className="px-2 py-2.5 flex items-center gap-1.5 lg:gap-x-1 justify-start">
            <img
              src="/images/tv_icon.png"
              alt="{item.name}"
              className="w-[25px]"
            />
            <p className="text-[14px] pt-1">Quran TV</p>
            <img src="/images/live.png" alt="" className="w-[32px]" />
          </div>
        </Link>
        <Link
          href={TVPashto}
          target="_blank"
          className="font-montserrat sm:max-w-[220px] text-primary w-full font-normal group uppercase bg-secondary shadow-lg hover:bg-primary hover:text-white"
        >
          <div className="px-2 py-2.5 flex items-center gap-1.5 lg:gap-x-1 justify-start">
            <img
              src="/images/tv_icon.png"
              alt="{item.name}"
              className="w-[25px]"
            />
            <p className="text-[14px] pt-1">Pashto Urdu</p>
            <img src="/images/live.png" alt="" className="w-[32px]" />
          </div>
        </Link>
      </div>

      <style jsx>{`
        .youtube-embed {
          position: relative;
          width: 100%; /* Full width of parent container */
          padding-bottom: 56.25%; /* 16:9 aspect ratio (9/16 = 0.5625) */
          height: 0;
          overflow: hidden;
        }
        .youtube-embed iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const livedata = await apolloClient.query({ query: GET_LIVE });
  const pageData = livedata?.data?.page?.liveInfo;

  return {
    props: {
      pageData,
    },
  };
};

export default LivePage;
