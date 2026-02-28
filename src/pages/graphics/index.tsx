import ImageModal from "@/components/ImageModal/ImageModal";
import PageBanner from "@/components/pageBanner/PageBanner";
import SeoMeta from "@/components/seo";
import apolloClient from "@/config/client";
import { GET_GRAPHICS } from "@/config/query";
import { GetStaticProps } from "next";
import React from "react";


const GraphicPage: React.FC<any> = ({ pageData }: any) => {
  const nodes = pageData?.graphicGallery?.nodes ?? [];

  const [open, setOpen] = React.useState(false);
const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
const [selectedTitle, setSelectedTitle] = React.useState<string | undefined>();

  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<{ url: string; title?: string } | null>(null);

  const openModal = (item: any) => {
    setSelected({ url: item?.mediaItemUrl, title: item?.title });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
  };

  return (
    <>
      <SeoMeta
        title="Graphics of Paigham TV | Paigham TV"
        url="/graphics"
        description="Paigham TV is a satellite TV channel the objectives of which are preaching the true teachings of the Holy Quran and Sunnah "
      />
      <PageBanner title="Graphics" image="/images/scholars.jpg" />

      <div className="container mx-auto px-4 py-16">
        {/* Masonry (free-size) */}

          <div className="columns-1 gap-4 md:columns-2 lg:columns-4">
  {nodes.map((item: any, index: number) => (
    <button
      key={index}
      onClick={() => {
        setSelectedImage(item?.mediaItemUrl);
        setSelectedTitle(item?.title);
        setOpen(true);
      }}
      className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg"
    >
      <img
        src={item?.mediaItemUrl}
        alt={item?.title ?? `Graphic ${index + 1}`}
        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.03]"
        loading="lazy"
      />
    </button>
  ))}
</div>
        
      </div>

      {/* Your existing modal */}
   <ImageModal
  open={open}
  onClose={() => setOpen(false)}
  image={selectedImage}
  title={selectedTitle}
/>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const livedata = await apolloClient.query({ query: GET_GRAPHICS });
  const pageData = livedata?.data?.page?.graphicsInfo;

  return {
    props: { pageData },
    revalidate: 60,
  };
};

export default GraphicPage;