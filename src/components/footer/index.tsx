import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { footerNav } from "../../../public/data";

// ------------------------------
// WhatsApp Subscribe Handler
// ------------------------------
function WhatsAppSubscribe() {
  const handleSubscribe = () => {
    const channelUrl =
      "https://whatsapp.com/channel/0029Va8MnujGufIrphvESZ3w";

    window.open(channelUrl, "_blank");
  };

  return (
    <div className="bg-[#27396C] flex items-center mt-6 sm:mt-0">
      <input
        className="bg-transparent w-full p-4 placeholder:font-metapro md:w-[400px] outline-none placeholder:font-normal placeholder:tracking-wider"
        placeholder="Enter your mobile number"
        type="tel"
      />
      <button
        onClick={handleSubscribe}
        className="bg-secondary h-full p-4 px-6 active:scale-105"
      >
        <HiOutlineArrowRight size="30" />
      </button>
    </div>
  );
}

// ------------------------------
// Social Icons
// ------------------------------
export const Socials = () => {
  return (
    <div className="flex justify-center sm:justify-start gap-5 text-2xl ">
      <Link
        href="http://facebook.com/paighamtv"
        target="_blank"
        className="hover:text-secondary"
      >
        <FaFacebookF size={21} />
      </Link>
      <Link
        href="http://instgram.com/paighamtv"
        target="_blank"
        className="hover:text-secondary"
      >
        <FaInstagram />
      </Link>
      <Link
        href="http://youtube.com/paighamtvofficial"
        target="_blank"
        className="hover:text-secondary"
      >
        <FaYoutube />
      </Link>
      <Link
        href="http://twitter.com/paighamtv"
        target="_blank"
        className="hover:text-secondary"
      >
        <FaTwitter />
      </Link>
      <Link
        href="https://www.tiktok.com/@paigham_tv"
        target="_blank"
        className="hover:text-secondary"
      >
        <FaTiktok />
      </Link>
    </div>
  );
};

// ------------------------------
// Main Footer Component
// ------------------------------
export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="container mx-auto text-white px-4 py-16">
        <div className="sm:flex justify-between items-center">
          <Socials />
          <WhatsAppSubscribe />
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 font-metapro gap-6 mt-16 pt-12 border-t border-gray-500">
          <Link href="/">
            <img
              src="/images/Logo_gold.png"
              alt="logo"
              width={160}
              height={189}
              className="hidden md:block w-14 md:w-[120px] lg:w-[160px]"
            />
            <img
              src="/images/logo-white.png"
              alt="logo"
              width={440}
              height={440}
              className="md:hidden w-14 md:w-[120px] lg:w-[160px]"
            />
            <p className="mt-3">©2025 All Rights Reserved</p>
          </Link>

          {footerNav.map((item, idx) => (
            <div key={idx}>
              <h6 className="text-lg font-medium tracking-widest uppercase">
                {item.name}
              </h6>
              <ul className="mt-4">
                {item.nav.map((nav, id) => (
                  <li
                    key={id}
                    className="text-lg mt-2 hover:text-secondary font-light text-gray-300 tracking-wider"
                  >
                    <Link href={nav.link}>{nav.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
