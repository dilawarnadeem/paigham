import React from 'react';

const TVUrdu = () => {
  return (
    <div className="h-screen text-center flex flex-col items-center justify-center">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/watch?v=11IDr_Iy7PU"
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
  );
};

export default TVUrdu;
