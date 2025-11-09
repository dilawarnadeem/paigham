import Category_Banner from "@/components/pageBanner/categoryBanner";
import Card from "@/components/video-section/card";
import apolloClient from "@/config/client";
import { PostsByTags } from "@/config/query";
import { SettingsContext } from "@/context/setting-context";
import { IPost } from "@/utils/types";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useContext, useEffect } from "react";

const Tags = ({ posts }: any) => {
  const {
    name,
    posts: { nodes },
  } = posts;

  const postsList = nodes;

  const { setModelIsOpen, setVideoLink } = useContext(SettingsContext);
  const OpenVideo = (link: string) => {
    setModelIsOpen(true);
    setVideoLink(link);
  };

  return (
    <>
      <h2 className="container mx-auto text-3xl font-bold px-4 my-10">
        {name}
      </h2>
      <div className="grid grid-cols-2 container mx-auto  px-4 lg:grid-cols-4 gap-4 mb-20">
        {postsList.map((item: IPost, idx: number) => (
          <Card item={item} key={idx} OpenVideo={OpenVideo} slug />
        ))}
      </div>
    </>
  );
};

export default Tags;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  const response = await apolloClient.query({
    query: PostsByTags,
    variables: {
      slug,
    },
  });
  const posts = response.data.tag;

  return {
    props: {
      posts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any = [];
  return {
    paths,
    fallback: "blocking",
  };
};
