import ChannelsLinks from "@/components/channels/ChannelsLinks";
import apolloClient from "@/config/client";
import { GET_LIVE } from "@/config/query";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";


const navButons = [
  {
    name: "TV Urdu",
    icon: "/images/tv_icon.png",
    live: "/images/live.png",
    link: "/channel/live-tv",
  },
  {
    name: "Quran TV",
    icon: "/images/tv_icon.png",
    live: "/images/live.png",
       link: "/channel/quran-tv", 
  },
  {
    name: "TV Pashto",
    link: "/channel/pashto-tv", 
    icon: "/images/pashto_icon.png",
    live: "/images/live.png",

  },
];

interface LivePageProps {
  pageData: any; // You can replace 'any' with the actual type of your data (e.g., { liveLink: string; channelNavLinks: string[] })
}

const toEmbed = (url: string) => {
  if (!url) return "";
  // Convert normal YouTube URL to embed format
  return url.replace("watch?v=", "embed/");
};

const LivePage: React.FC<LivePageProps> = ({ pageData }) => {


  const TVUrdu = pageData.liveLink;
  const AlterUrdu = pageData.alternateLink;
  const TVQuran = pageData.quranTv;
  const TVPashto = pageData.pashtoTv;

  console.log("Live Page Data:", TVUrdu);

  return (
    <>
     <div className="container mx-auto text-white px-4 py-16">
      <div className="youtube-embed">
      <iframe
  width="560"
  height="315"
  src={toEmbed(TVUrdu)}
  title="YouTube video player"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
></iframe>

      </div>

       <ChannelsLinks />

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
      </div>
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
