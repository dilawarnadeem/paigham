import React, { useEffect, useState } from "react";
import { headerSlider } from "../../../public/data";
import { GetStaticProps } from "next";
import apolloClient from "@/config/client";
import { AllPosts, NewsTickers } from "@/config/query";

const TopBar = () => {
  const [hadith, setHadith] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch( "http://localhost:3000/api/tickers", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = await response.json();
        console.log("🚀 ~ data:", data)

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
