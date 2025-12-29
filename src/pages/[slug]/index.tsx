import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import apolloClient from "@/config/client";
import SeoMeta from "@/components/seo";
import PageBanner from "@/components/pageBanner/PageBanner";
import { gql } from "@apollo/client";

type PageProps = {
  page: {
    title: string;
    content: string;
    featuredImage?: {
      node?: {
        sourceUrl: string;
      };
    };
  };
};

export default function DynamicPage({ page }: PageProps) {
  if (!page) return <div>Page not found</div>;

  const bannerImage =
    page.featuredImage?.node?.sourceUrl || "/images/banner-2.jpg";

  return (
    <>
      <SeoMeta
        title={`${page.title} | Paigham TV`}
        url={`/${page.title.toLowerCase().replace(/\s+/g, "-")}`}
        description="Paigham TV dynamic page powered by WPGraphQL"
      />
      <PageBanner title={page.title} image={bannerImage} />

      <section className="container mx-auto mb-28 px-4 page_content">
        {/* heading  */}
        <div className=" justify-between items-center mt-10 mb-10  ">
          <div
            className=" px-6"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>
    </>
  );
}

// GraphQL Query to get all page slugs
export const GET_ALL_PAGE_SLUGS = gql`
  query AllPageSlugs {
    pages {
      nodes {
        slug
      }
    }
  }
`;

// GraphQL Query to get a single page by slug
export const GET_PAGE_BY_SLUG = gql`
  query PageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: GET_ALL_PAGE_SLUGS,
  });

  const paths =
    data.pages.nodes.map((page: any) => ({
      params: { slug: page.slug },
    })) || [];

  return {
    paths,
    fallback: "blocking", // or true if you want incremental build
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug: params?.slug },
    });

    if (!data.page) {
      return { notFound: true };
    }

    return {
      props: {
        page: data.page,
      },
      revalidate: 60, // ISR
    };
  } catch (error) {
    console.error("Error fetching page:", error);
    return { notFound: true };
  }
};
