import SeoMeta from '@/components/seo';
import React from 'react';

const TVUrdu = () => {
  return (
    <>
    <SeoMeta title="Paigham TV Live | #Live #PaighamTV | Paigham TV" url="/contact-us" description="Contact Us for preaching the true teachings of the Holy Quran and Sunnah " />
           
    <div className="h-screen text-center flex flex-col items-center justify-center">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/skEy_MZ-rds?si=msQ2rGxUEhuM6_Di"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <a
        href="https://sscsott.com/pk/paighamtv/embed.html"
        className="px-10 py-2 bg-blue text-white rounded  block my-10 "
      >
        Live URDU
      </a>
    </div>
    </>
  );
};

export default TVUrdu;
