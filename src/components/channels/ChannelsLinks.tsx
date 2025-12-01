const navButons = [
  {
    name: "Alter Urdu",
    icon: "/images/tv_icon.png",
    live: "/images/live.png",
    link: "/channel/urdu-tv",
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

import Link from "next/link";
import React from "react";

const ChannelsLinks = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col gap-3 px-4  w-auto mx-auto justify-center items-center my-5">
        <Link
          href="/channel/urdu-tv"
          className="font-montserrat sm:max-w-[220px] text-primary w-full font-normal group uppercase bg-secondary shadow-lg hover:bg-primary hover:text-white"
        >
          <div className="px-2 py-2.5 flex items-center gap-1.5 lg:gap-x-1 justify-start">
            <img
              src="/images/tv_icon.png"
              alt="{item.name}"
              className="w-[25px]"
            />
            <p className="text-[14px] pt-1">Alternate Urdu</p>
            <img src="/images/live.png" alt="" className="w-[32px]" />
          </div>
        </Link>
        <Link
          href="/channel/quran-tv"
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
          href="/channel/pashto-tv"
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
    </div>
  );
};

export default ChannelsLinks;
