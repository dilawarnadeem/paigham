import PageBanner from "@/components/pageBanner/PageBanner";
import apolloClient from "@/config/client";
import { programsScheduling } from "@/config/query";
import { GetStaticProps } from "next";
import React, { useContext } from "react";
import SeoMeta from "@/components/seo";

const PaighamChannelPresents = ({ programs }: any) => {
  const [activeDay, setActiveDay] = React.useState(programs[0]?.node?.name);

  const days = programs.map((d: any) => d.node.name);

  const activePrograms = programs.find((d: any) => d.node.name === activeDay)
    ?.node.programsScheduling.nodes;

  return (


    <section className="bg-white">
      <div className="container font-metapro mx-auto px-4 text-primary py-16">
        {/* === TABS === */}
        <div className="flex gap-3 overflow-x-auto  pb-4">
          {days.map((day: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 font-semibold whitespace-nowrap
                ${
                  activeDay === day
                    ? "bg-primary text-white rounded-lg"
                    : "bg-gray-200 text-primary rounded-lg"
                }
              `}
            >
              {day}
            </button>
          ))}
        </div>

        {/* === PROGRAMS FOR ACTIVE DAY === */}

        <ul className="mt-8 grid grid-cols-2 gap-6">
          {activePrograms?.length === 0 ? (
            <p className="text-gray-400">No programs available</p>
          ) : (
            activePrograms?.map((program: any, idx: number) => (
              <li
                key={idx}
                className="flex md:flex-row flex-col items-start gap-6 lg:gap-x-12 border-t-[1px] border-gray-500 py-5"
              >
                <div className="w-full max-w-[240px] lg:max-w-[280px]">
                  <time className="font-medium text-xl">
                    {program?.programInfo?.programTime || `0000`}
                  </time>
                </div>

                <div>
                  <h6 className="text-secondary sm:text-xl font-medium text-start -tracking-wide">
                    {program.title}
                  </h6>
                  <div
                    className="text-start sm:text-lg mt-2"
                    dangerouslySetInnerHTML={{ __html: program?.excerpt }}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
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
      <PageBanner title="" image="/images/program.jpg" />

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
