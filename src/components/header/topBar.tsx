import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const TopBar = () => {
  const [hadith, setHadith] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/tickers",{
          method: "GET",
          mode: "no-cors",
          next: { revalidate: 60 }
        });
        const data = await response.json();
        setHadith(data?.tickers?.hadithBy)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <>
      {/* top bar with smooth scrolling  */}
      <div className="overflow-x-hidden bg-secondary">
        <div className="py-2">
        <Marquee direction="right">
          {hadith?.news_tickers?.newsTicker?.map((item: any, idx: any) => {
            return (
              <div className="flex items-center" key={idx}>
                <div className="p-[2.5px] px-3 bg-blue" />
                <span className="mx-2 text-sm md:text-xl leading-9 -mt-1 font-mehr text-[#050007] ">
                     {item.info}
                </span>
              </div>
            );
          })}
        </Marquee>
        </div>
      </div>
    </>
  );
};

export default TopBar;

