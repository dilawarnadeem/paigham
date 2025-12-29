import Image from "next/image";
import React, { useContext } from "react";
//import DefaultImage from '../../../public/images/Islamic.png'
import Link from "next/link";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { SettingsContext } from "@/context/setting-context";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { sliderSettings } from "@/utils";
const CategoryCard = ({ items }: any) => {
  const { setVideoLink } = useContext(SettingsContext);
  const router = useRouter();
  const slider = React.useRef<any>(null);
  return (
    <>
      <div className="flex justify-between container mx-auto px-2 pt-12 pb-6 items-center text-white">
        <h4 className="font-semibold md:text-xl">{items?.name}</h4>
        <Link
          href={`/category/${items?.slug}`}
          className="hover:underline md:text-xl"
        >
          View All
        </Link>
      </div>
      <div className="relative md:px-2">
        <Slider {...sliderSettings} ref={slider}>
          {items?.posts?.nodes
            ?.slice(0, 20)
            ?.reverse()
            ?.map((item: any, idx: number) => {
              return (
                <>
                  <div className="px-2 group ">
                    <div
                      className="bg-black !rounded-lg !overflow-hidden"
                      key={idx}
                    >
                      <div className="bg-red-300 relative cursor-pointer overflow-hidden">
                        <Link href={`/article/${item?.slug}`}>
                          <img
                            src={item?.featuredImage?.node?.mediaItemUrl}
                            alt="image"
                            width={700}
                            height={400}
                            className=" w-full object-cover transition-all h-[150px] md:h-[170px] duration-200 ease-in-out"
                          />
                        </Link>
                        <div className=" group-hover:bg-black/40 absolute inset-0 p-3 md:p-6 flex flex-col justify-end font-metapro" />
                      </div>
                    </div>
                    <Link href={`/article/${item?.slug}`}>
                      <h4 className="text-white font-medium md:px-2 tracking-wide my-3 line-clamp-2">
                        {item?.title}
                      </h4>
                    </Link>
                  </div>
                </>
              );
            })}
        </Slider>
        <div className={items?.posts?.nodes?.length > 4 ? "" : "lg:hidden"}>
          <button
            className="md:text-2xl text-xl text-white hover:text-primary bg-black/50  absolute -top-4 px-1 md:px-1.5 bottom-0 left-0 "
            onClick={() => slider?.current?.slickPrev()}
          >
            <MdArrowBackIosNew />
          </button>
          <button
            className="md:text-2xl text-xl text-white hover:text-primary bg-black/50  absolute -top-4 px-1 md:px-1.5 bottom-0 right-0"
            onClick={() => slider?.current?.slickNext()}
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </>
  );
};
export default CategoryCard;
