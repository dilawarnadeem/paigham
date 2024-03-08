import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react'
import Slider from "react-slick";
import { PiPlay } from 'react-icons/pi'
import VideoModelBox from '../model-box/VideoModelBox';
import { SettingsContext } from '@/context/setting-context';
import ChannelLinks from '../header/channelLinks';
import { getVideoCode } from '@/utils';

const Main = ({ posts }: any) => {
  const slider = React.useRef<Slider>(null);
  const { modalIsOpen, setModelIsOpen, setVideoLink } = useContext(SettingsContext)
  const OpenVideo = (link: string) => {
    setModelIsOpen(true)
    setVideoLink(link)
  }
  return (
    <main className='relative h-[700px]'>
      <Slider ref={slider} {...settings}>



        <div className='relative w-full bg-[url("/images/banner/banner1.jpg")] p-2 h-[calc(100vh-40px)] bg-contain bg-no-repeat'>
          <div className='container mx-auto text-white font-metapro h-full lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
          </div>
        </div>
        <div className='relative w-full bg-[url("/images/banner/banner2.jpeg")] p-2 h-[calc(100vh-40px)] bg-contain bg-no-repeat'>
          <div className='container mx-auto text-white font-metapro h-full lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
          </div>
        </div>
        <div className='relative w-full bg-[url("/images/banner/banner3.jpeg")] p-2 h-[calc(100vh-40px)] bg-contain bg-no-repeat'>
          <div className='container mx-auto text-white font-metapro h-full lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
          </div>
        </div>
        <div className='relative w-full bg-[url("/images/banner/banner4.jpeg")] p-2 h-[calc(100vh-40px)] bg-contain bg-no-repeat'>
          <div className='container mx-auto text-white font-metapro h-full lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
          </div>
        </div>
        <div className='relative w-full bg-[url("/images/banner/banner5.jpeg")] p-2 h-[calc(100vh-40px)] bg-contain bg-no-repeat'>
          <div className='container mx-auto text-white font-metapro h-full lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
          </div>
        </div>


      </Slider>
      {/* <section className='sliceslider right-0 absolute bottom-5 2xl:bottom-10 w-full lg:w-[50%]'>
        <Slider {...SliderSlice}>
          {
            posts.slice(10, 20).map((item: any, idx: number) => {
              return (
                <button onClick={() => OpenVideo(getVideoCode(item?.postInfo?.tmVideoUrl))} key={idx} className=''>
                  <Image src={item.featuredImage.node.mediaItemUrl} alt="image" width={600} height={600} className='' />
                </button>
              )
            })
          }
        </Slider>
      </section> */}
      <ChannelLinks />
      <button className="absolute top-1/2 left-1 md:left-2 transform -translate-y-1/2 bg-dark-gray active:scale-105 text-yellow text-xl p-[6px] px-1.5 md:px-5 " onClick={() => slider?.current?.slickPrev()}><Image src="/svg/left-slider-arrow.svg" alt="arrow" width={60} height={60} className='w-7 md:w-16' /></button>
      <button className="absolute top-1/2 right-1 md:right-2 transform -translate-y-1/2 bg-dark-gray active:scale-105 text-yellow text-xl p-[6px] px-1.5 md:px-5 " onClick={() => slider?.current?.slickNext()}><Image src="/svg/right-slider-arrow.svg" alt="arrow" width={60} height={60} className='w-7 md:w-16' /></button>
      {modalIsOpen && <VideoModelBox setModelIsOpen={setModelIsOpen} />}

    </main>
  )
}

export default Main

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  // autoplay: true,
};
const SliderSlice = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 6000,
  autoplaySpeed: 0,
  cssEase: "linear",
  arrows: false,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};


const imageSlide = [
  "/images/sli1.png", "/images/sli2.png", "/images/sli3.png", "/images/sli1.png", "/images/sli2.png", "/images/sli3.png", "/images/sli2.png", "/images/sli3.png", "/images/sli1.png", "/images/sli2.png", "/images/sli3.png", "/images/sli1.png", "/images/sli2.png", "/images/sli3.png", "/images/sli1.png", "/images/sli2.png", "/images/sli3.png", "/images/sli2.png", "/images/sli3.png", "/images/sli1.png", "/images/sli2.png", "/images/sli3.png"
]