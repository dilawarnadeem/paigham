import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import ChannelLinks from "../header/channelLinks";

const Main = ({ posts }: any) => {
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
          <div className='relative w-full bg-[url("/images/banner/slider1.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/slider2.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/slider3.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/slider4.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/slider5.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/slider6.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
        </Slider>
      </div>
      {/* For Mobile  */}
      <div className="md:hidden">
        <Slider ref={slider} {...settings}>
          <div className='relative w-full bg-[url("/images/banner/mobile/1.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/2.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/3.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/4.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/5.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/6.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className="container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center"></div>
          </div>
        </Slider>
      </div>

      <ChannelLinks />
      {/* <button
        className="absolute top-1/2 left-1 md:left-2 transform -translate-y-1/2 bg-dark-gray active:scale-105 text-yellow text-xl p-[6px] px-1.5 md:px-5"
        onClick={() => slider.current.slickPrev()} // Ensure slider exists
      >
        <img
          src="/svg/left-slider-arrow.svg"
          alt="left arrow"
          width={60}
          height={60}
          className="w-7 md:w-16"
        />
      </button>

      <button
        className="absolute top-1/2 right-1 md:right-2 transform -translate-y-1/2 bg-dark-gray active:scale-105 text-yellow text-xl p-[6px] px-1.5 md:px-5"
        onClick={() => slider.current.slickNext()} // Ensure slider exists
      >
        <img
          src="/svg/right-slider-arrow.svg"
          alt="right arrow"
          width={60}
          height={60}
          className="w-7 md:w-16"
        />
      </button> */}
    </main>
  );
};

export default Main;
