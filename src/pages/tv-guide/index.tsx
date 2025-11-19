import PageBanner from "@/components/pageBanner/PageBanner";

import { Helmet } from "react-helmet";
import apolloClient from "@/config/client";
import { programsScheduling } from "@/config/query";
import { GetStaticProps } from "next";
import Link from "next/link";
import { SettingsContext } from "@/context/setting-context";
import React, { useContext } from "react";
import VideoPlayer from "@/components/video-player/VideoPlayer";
import { getVideoCode } from "../../utils";
import SeoMeta from "@/components/seo";

const PaighamChannelPresents = ({ programs }: any) => {
  return (
    <section className="bg-white">
      <div className="container font-metapro mx-auto px-4 text-primary py-16">
        
        <div className="md:flex mt-10 md:gap-x-10">
          <div className="md:w-full mt-5 md:mt-0">
            <ul className="mt-5">
              
              {programs.map((day: any, idx: number) => (
                <li
                  key={idx}
                  className="border-t-[1px] border-gray-300 py-5"
                >
                  {/* === DAY NAME === */}
                  <div className="font-semibold text-xl tracking-widest mb-2">
                    {day.node.name}
                  </div>

                  {/* === PROGRAM TIMES === */}
                  {day.node.programsScheduling.nodes.length === 0 ? (
                    <p className="text-gray-400">No programs available</p>
                  ) : (
                    day.node.programsScheduling.nodes.map(
                      (program: any, pIdx: number) => (
                        <div
                          key={pIdx}
                          className="flex justify-between md:gap-x-8 py-2"
                        >
                          <time className="font-medium md:text-xl">
                            {program.programInfo.programTime}
                          </time>
                        </div>
                      )
                    )
                  )}
                </li>
              ))}

            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};


export default function Program_Scheduling({ allProgramsScheduling }: any) {

 
  return (
    <>
      <SeoMeta
        title="TV Guide | Paigham TV"
        url="/tv-guide"
        description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah"
      />
      <PageBanner title="Program Scheduling" image="/images/banner2.jpg" />
   
      <PaighamChannelPresents programs={allProgramsScheduling} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [programs] = await Promise.all([
    apolloClient.query({ query: programsScheduling }),
  ]);
  // const allposts = postsResponse.data.posts.nodes;
  //  const allCategories = categories.data.categories.nodes
  const allProgramsScheduling = programs.data.allDay.edges;
  return {
    props: {
      allProgramsScheduling,
    },
  };
};
