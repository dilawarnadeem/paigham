import Image from 'next/image';
import React from 'react'
import Slider from "react-slick";
import ChannelLinks from '../header/channelLinks';


const Main = ({posts}:any) => {
  const slider = React.useRef<Slider>(null);
  
  const prevSlide =()=>{
    slider?.current?.slickPrev()
  }
  const nextSlide =()=>{
    slider?.current?.slickNext()
  }


  return (
    <main className='relative h-[40vh] sm:h-[65vh] md:h-[80vh]'>
      <div className='hidden md:block'>
        <Slider ref={slider} {...settings} >
          <div className='relative w-full bg-[url("/images/banner/banner1.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/banner2.jpeg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/banner3.jpeg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/banner4.jpeg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/banner5.jpeg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
        </Slider>
      </div>
      {/* For Mobile  */}
      {/* <div className='md:hidden'>
        <Slider ref={slider} {...settings} >
          <div className='relative w-full bg-[url("/images/banner/mobile/1.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/2.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/3.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/4.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/5.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
          <div className='relative w-full bg-[url("/images/banner/mobile/6.jpg")]  h-[40vh] sm:h-[65vh] md:h-[80vh] bg-cover md:bg-cover bg-no-repeat'>
            <div className='container mx-auto text-white h-[40vh] sm:h-[65vh] md:h-[80vh] font-metapro lg:px-16 2xl:px-0 flex flex-col items-center md:items-start justify-center'>
            </div>
          </div>
        </Slider>
      </div> */}

      <ChannelLinks />
      <button className="absolute top-1/2 left-1 md:left-2 transform -translate-y-1/2 bg-dark-gray active:scale-105 text-yellow text-xl p-[6px] px-1.5 md:px-5 " onClick={prevSlide}><Image src="/svg/left-slider-arrow.svg" alt="arrow" width={60} height={60} className='w-7 md:w-16' /></button>
      <button className="absolute top-1/2 right-1 md:right-2 transform -translate-y-1/2 bg-dark-gray active:scale-105 text-yellow text-xl p-[6px] px-1.5 md:px-5 " onClick={nextSlide}><Image src="/svg/right-slider-arrow.svg" alt="arrow" width={60} height={60} className='w-7 md:w-16' /></button>

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
  autoplay: true,
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