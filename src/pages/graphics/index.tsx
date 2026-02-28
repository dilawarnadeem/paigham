import apolloClient from "@/config/client";
import { GET_GRAPHICS } from "@/config/query";
import { GetStaticProps } from "next";
import React from "react";

const GraphicPage: React.FC<any> = ({ pageData }: any) => {
  const nodes = pageData?.graphicGallery?.nodes ?? [];

  return (
    <div className="container mx-auto text-white px-4 py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {nodes.map((item: any, index: number) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-900">
              <img
                src={item?.mediaItemUrl}
                alt={item?.title ?? `Graphic ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const livedata = await apolloClient.query({ query: GET_GRAPHICS });
  const pageData = livedata?.data?.page?.graphicsInfo;

  return {
    props: { pageData },
    revalidate: 60, // optional: ISR
  };
};

export default GraphicPage;
