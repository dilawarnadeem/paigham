import React, { useEffect, useState } from "react";
import { headerSlider } from "../../../public/data";
import { GetStaticProps } from "next";
import apolloClient from "@/config/client";
import { AllPosts, NewsTickers } from "@/config/query";

const query = `
  query NewQuery {
    hadithBy(hadithId: 4299) {
      title
      news_tickers {
        newsTicker {
          title
          info
        }
      }
    }
  }
`;

const TopBar = () => {
  const [hadith, setHadith] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://ant.a59.mywebsitetransfer.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: query,
            }),
          }
        );

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        setHadith(data?.hadithBy);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <>
      {/* top bar with smooth scrolling  */}
      <div className="overflow-x-hidden bg-secondary">
        <div className="py-2 animate-marquee_Ltr rtl:animate-marquee_Rtl whitespace-nowrap flex ">
          {hadith?.news_tickers?.newsTicker.map((item: any, idx: any) => {
            return (
              <div className="flex items-center" key={idx}>
                <div className="p-[2.5px] px-3 bg-blue" />
                <span className="mx-2 text-lg -mt-1 font-mehr text-[#050007] ">
                  {" "}
                  {item.info}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TopBar;
