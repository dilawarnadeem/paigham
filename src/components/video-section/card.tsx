import Image from "next/image";
import React, { useContext } from "react";
import { getVideoCode } from "@/utils";
import { PiPlay } from "react-icons/pi";
import { SettingsContext } from "@/context/setting-context";
import { useRouter } from "next/router";

const Card = ({ item, OpenVideo, slug, textColor, activeCategory }: any) => {
  const router = useRouter()
  const isArticle =  router?.pathname.includes("article")
  console.log("🚀 ~ Card ~ router:", router, isArticle)

  const { language, setVideoLink } = useContext(SettingsContext);
  var title = item.title;
  if (language === "ar") {
    title = item.postInfo.arabicTitle;
  } else if (language === "ur") {
    title = item.postInfo.urduTitle;
  }
  
  const handlePlay = () => {
    slug ? playONTop() : activeCategory === 'latest' ? OpenVideo(item?.postInfo?.tmVideoUrl) : VideoPl()
  };

  function playONTop(){
    setVideoLink(item?.postInfo?.tmVideoUrl);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function VideoPl (){
    setVideoLink(item?.postInfo?.tmVideoUrl);
    router.push(`/${isArticle ? "article" : "category"}/${ isArticle ? slug : activeCategory}`);
  }
  

  return (
    <div className="px-1 group">
      <div className="bg-black rounded-lg overflow-hidden">
        <div className="bg-red-300 relative overflow-hidden " onClick={handlePlay}>
          <Image
            src={item?.featuredImage?.node?.mediaItemUrl}
            alt="image"
            width={700}
            height={400}
            className=" w-full object-cover transition-all h-[150px] md:h-[170px] duration-200 ease-in-out"
          />
          <div className=" group-hover:bg-black/40 absolute inset-0 group-hover:cursor-pointer p-3 md:p-6 flex flex-col justify-end font-metapro "/>
        </div>
      </div>
      <h4 className={`${textColor ? textColor : 'text-white' } font-medium md:px-2 tracking-wide my-3 line-clamp-2`}>
        {title}
      </h4>
    </div>
  );
};

export default Card;
