import { gql } from "@apollo/client";

export const postsForListingPage = gql`
  query AllPosts($endCursor: String) {
    posts(first: 40, after: $endCursor) {
      nodes {
        title
        slug
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
            name
          }
        }
        postInfo {
          tmVideoUrl
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`;

export const AllPosts = gql`
  query AllPosts {
    posts(first: 100) {
      nodes {
        title
        slug
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
            name
          }
        }
        postInfo {
          tmVideoUrl
          urduTitle
          arabicTitle
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`;

export const NewsTickers = gql`
query NewQuery {
  hadithBy(hadithId: 4299) {
    title
    news_tickers {
      newsTicker {
        title
        info
      }
    }
  }
}
`

export const SinglePost = gql`
  query SinglePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      slug
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories {
        nodes {
          slug
          name
        }
      }
      postInfo {
        tmVideoUrl
        urduTitle
        arabicTitle
      }
    }
  }
`;

export const PostsByTags = gql`
  query PostByTags($slug: ID!) {
    tag(id: $slug, idType: SLUG) {
      name
      slug
      description
      posts(first: 1000) {
        nodes {
          title
          slug
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          categories {
            nodes {
              slug
              name
            }
          }
          postInfo {
            tmVideoUrl
          }
        }
      }
    }
  }
`;

export const AllTags = gql`
  query AllTags {
    tags {
      nodes {
        slug
        name
      }
    }
  }
`;

// post by category pass category slug in qury
export const PostsByCategory = gql`
  query PostsByCategory($slug: ID!, $order: OrderEnum = DESC) {
    category(id: $slug, idType: SLUG) {
      name
      slug
      description
      categoryInfo {
        categoryBanner {
          mediaItemUrl
        }
      }
      posts(first: 1000, where: { orderby: { field: DATE, order: $order } }) {
        nodes {
          title
          slug
          excerpt
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          categories {
            nodes {
              slug
              name
            }
          }
          postInfo {
            tmVideoUrl
          }
        }
      }
    }
  }
`;

export const Categories = gql`
query Categories {
  categories(first: 1000) {
    nodes {
      name
      slug
      count
      categoryInfo {
        catImage {
          mediaItemUrl
        }
        categoryBanner {
          mediaItemUrl
        }
        featured
      }
      posts {
        nodes {
          title
          status
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          postInfo {
            tmVideoUrl
          }
        }
      }
    }
  }
}
`;
export const HomeCategories = gql`
  query HomeCategories {
    categories(
      first: 1000
      where: { include: ["1", "80", "123", "60"], order: DESC }
    ) {
      nodes {
        name
        slug
        count
        categoryInfo {
          catImage {
            mediaItemUrl
          }
          categoryBanner {
            mediaItemUrl
          }
          featured
        }
      }
    }
  }
`;

export const programsScheduling = gql`
  query programsScheduling {
    programsScheduling(first: 3) {
      nodes {
        title
        excerpt
        programInfo {
          videoUrl
          programTime
        }
      }
    }
  }
`;

export const AllScholars = gql`
  query AllScholars {
    scholars(first: 50, where: { orderby: { order: ASC, field: MENU_ORDER } }) {
      nodes {
        slug
        title
        databaseId
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export const AllPlaylist = gql`
  query AllPlaylist {
    playLists {
      nodes {
        slug
        title
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export const PostsByScholar = gql`
  query PostsByScholar($sid: String = "") {
    posts(
      where: {
        metaQuery: {
          metaArray: { key: "actor_id", compare: LIKE, value: $sid }
        }
      }
      first: 99
    ) {
      nodes {
        title
        content
        postInfo {
          tmVideoUrl
          urduTitle
          arabicTitle
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

// search Post

export const SearchPost = gql`
  query PostsByScholar($search: String = "") {
    posts(where: { search: $search }) {
      nodes {
        title
        content
        postInfo {
          tmVideoUrl
          urduTitle
          arabicTitle
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;
