import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import ChannelLinks from "../header/channelLinks";

const Main = ({ posts , Options }: any) => {
  const slider = React.useRef<any>(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <main className="relative h-[40vh] sm:h-[65vh] md:h-[80vh]">
      <div className="hidden md:block">
        <Slider ref={slider} {...settings}>
          {posts?.map((post: any, index: number) => {
            const image =
              post?.featuredImage?.node?.mediaItemUrl ||
              "/images/banner/slider1.jpg";

            return (
              <div
                className="relative w-full h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat"
                key={index}
              >
                <Image
                  src={image}
                  width={1600}
                  height={583}
                  alt="Featured Image"
                  className="absolute h-full w-full object-cover object-center "
                />
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="block md:hidden">
        <Slider ref={slider} {...settings}>
          {posts?.map((post: any, index: number) => {
            const mobileimage =
              post?.slideInfo?.mobileImage?.node?.mediaItemUrl ||
              "/images/mobile/2.jpg";
            return (
              <div
                className="relative w-full h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat"
                key={index}
              >
                <Image
                  src={mobileimage}
                  width={360}
                  height={460}
                  alt="Featured Image"
                  className="absolute h-full w-full object-cover object-center "
                />
              </div>
            );
          })}
        </Slider>
      </div>
      <ChannelLinks Options={Options} />
    </main>
  );
};

export default Main;
