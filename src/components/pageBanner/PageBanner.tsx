

import React from "react";

interface IPageBanner {
  title: any;
  image: string;
  mobile?: string; // optional
}

const PageBanner = ({ title, image, mobile }: IPageBanner) => {
  return (
    <section className="relative">
      <picture>
        {/* Mobile image only if provided */}
        {mobile && (
          <img
          src={mobile}
          alt={title}
          width={450}
          height={450}
          className="w-full h-[110px] md:h-[450px] object-cover"
        />
        )}

        {/* Default image (desktop + fallback) */}
        <img
          src={image}
          alt={title}
          width={1600}
          height={1400}
          className="w-full h-[110px] md:h-[350px] object-cover"
        />
      </picture>

      <div className="bg-black/20 absolute inset-0 flex flex-col justify-center">
        <h2 className="text-center text-3xl md:text-5xl font-anton tracking-widest text-secondary uppercase">
          {title}
        </h2>
      </div>
    </section>
  );
};

export default PageBanner;
