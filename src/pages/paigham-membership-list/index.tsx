"use client";

import React from "react";
import PageBanner from "@/components/pageBanner/PageBanner";
import SeoMeta from "@/components/seo";

export default function PaighamClubMembers() {
  return (
    <>
      {/* SEO */}
      <SeoMeta
        title="Paigham Club Members | Paigham TV"
        url="/club-membership-list"
        description="Paigham Club Members Verification Page"
      />

      {/* Page Banner */}
      <PageBanner
        title="Paigham Club Members"
        image="/images/banner-2.jpg"
      />

      {/* Iframe Section */}
      <section className="w-full h-screen">
        <iframe
          src="https://zamzamwelfaretrust.com/paighamtv/club-membership-list/"
          title="Paigham Club Members"
          className="w-full h-full border-none"
          loading="lazy"
        />
      </section>
    </>
  );
}

