import React, { useContext } from "react";
import { SettingsContext } from "@/context/setting-context";

const Card = ({ item, OpenVideo, CurrentVideo }: any) => {
  const { setVideoLink } = useContext(SettingsContext);

  const handleClick = () => {
    setVideoLink(item.postInfo.tmVideoUrl);
    CurrentVideo(item.postInfo.tmVideoUrl);
    OpenVideo(item.postInfo.tmVideoUrl, item);

    // Scroll to video player
    document.getElementById("videoplayer")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="px-1 group cursor-pointer" onClick={handleClick}>
      <div className="bg-black rounded-lg overflow-hidden">
        <img
          src={item?.featuredImage?.node?.mediaItemUrl}
          alt="image"
          width={1280}
          height={720}
          className="w-full object-cover max-h-[200px]"
        />
      </div>

      <h4 className="font-medium md:px-2 tracking-wide my-3 line-clamp-2 text-white">
        {item.title}
      </h4>
    </div>
  );
};

export default Card;
