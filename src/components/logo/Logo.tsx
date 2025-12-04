import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="">
      <img
        src="/images/Logo_gold.png"
        alt="logo"
        width={120}
        height={189}
        className="z-10 hidden md:block w-14 md:w-[120px]  relative"
      />
      <Image
        src="/images/logo-white.png"
        alt="logo"
        width={160}
        height={189}
        className="z-10 md:hidden w-14 md:w-[160px]  relative"
      />
    </Link>
  );
};

export default Logo;
