import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedinIn, FaRegCopy } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const ShareButtons = ({ slug, onCopy }: { slug: string; onCopy: () => void }) => {
  const url = `https://paigham.tv/article/${slug}`;

  return (
    <ul className="flex text-white items-center gap-3 text-xl">
      <li className="text-white">Share:</li>

      <li>
        <Link href={`https://api.whatsapp.com/send?text=${url}`} target="_blank">
          <FaWhatsapp size={25} />
        </Link>
      </li>

      <li>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
        >
          <FaFacebook size={25} />
        </Link>
      </li>

      <li>
        <Link href={`https://www.instagram.com/?url=${url}`} target="_blank">
          <FaInstagram size={25} />
        </Link>
      </li>

      <li>
        <Link href={`https://twitter.com/intent/tweet?text=${url}`} target="_blank">
          <BsTwitter size={24} />
        </Link>
      </li>

      <li>
        <Link
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          target="_blank"
        >
          <FaLinkedinIn size={24} />
        </Link>
      </li>

      <li onClick={onCopy} className="cursor-pointer text-white">
       <FaRegCopy size={24} />
      </li>
    </ul>
  );
};

export default ShareButtons;
