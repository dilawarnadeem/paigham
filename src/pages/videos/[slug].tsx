import apolloClient from '@/config/client';
import { SinglePost } from '@/config/query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsTwitter } from 'react-icons/bs';
import { FaFacebook, FaLinkedinIn } from 'react-icons/fa';

const Slug = ({ post }: any) => {
  console.log("🚀 ~ Slug ~ post:", post)
  const [link, setLink] = useState<any>()

  useEffect(() => {
    var link = post?.postInfo?.tmVideoUrl
    // Check if the link is a Facebook link
    if (link.includes('facebook')) {
      setLink(link)
    } else {
      var link = post?.postInfo?.tmVideoUrl
      const modifiedYtLink = link?.replace(link?.includes('https://youtu.be/') ? 'https://youtu.be/' : 'https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
      setLink(modifiedYtLink)
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://paigham.tv/videos/${post?.slug}`
      );
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="bg-[rgb(22,31,40)] pb-20">
      {
        // videoLink?.includes('facebook') ?
        //   <section className='bg-black'>
        //     <div className="container mx-auto flex justify-center bg-black items-center">
        //       <div className={'iframe-container mb0 relative pt-[56%] md:pt-[40.25%] fbVideo'}
        //       >
        //         <ReactPlayer
        //           url={link}
        //           playing={true}
        //           controls={true}
        //           width='71.50%'
        //           height='100%'
        //           style={{ position: 'absolute', top: 0, right: '50%', transform: 'translateX(50%)' }}
        //           className="!w-full md:w-[71.50%]"
        //         />
        //       </div>
        //     </div>
        //   </section> :
        <div className="aspect-w-16 aspect-h-9 md:aspect-h-6">
          <iframe src={link} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      }

      <div className="container px-4 mx-auto">
        <div className=" mt-12 pb-8 border-b-[2px] border-gray-800">
          <div className="md:flex justify-between items-end mt-2 md:mt-0">
            <div>
              <h4 className="text-white max-w-[900px] font-semibold text-2xl md:text-3xl">
                {post?.title}
              </h4>
              <h4 className="text-secondary text-lg my-2 md:mb-0">
                <Link href={`/category/${post?.categories?.nodes[0]?.slug}`}>
                  {post?.categories?.nodes[0]?.name}
                </Link>
              </h4>
            </div>
            <ul className="flex text-white items-center gap-3 text-xl md:text-2xl">
              <li>Share: </li>
              <li className="hover:text-secondary cursor-pointer">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://paigham.tv/videos/${post.slug}`}
                >
                  <FaFacebook />
                </Link>
              </li>
              <li className="hover:text-secondary cursor-pointer">
                <Link
                  href={`https://twitter.com/intent/tweet?text=https://paigham.tv/videos/${post.slug}`}
                >
                  <BsTwitter />
                </Link>
              </li>

              <li className="hover:text-secondary cursor-pointer">
                <Link
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https://paigham.tv/videos/${post.slug}`}
                >
                  <FaLinkedinIn />
                </Link>
              </li>
              <li onClick={handleCopy} className="cursor-pointer">
                <svg width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148c-1.126.152-2.037.472-2.755 1.193c-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342c-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27c.127-.948.413-1.856 1.147-2.593c.734-.737 1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.601 3.601 0 0 0 15.24 2"
                  />
                  <path
                    fill="currentColor"
                    d="M6.6 11.397c0-2.726 0-4.089.844-4.936c.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847c.843.847.843 2.21.843 4.936v4.82c0 2.726 0 4.089-.843 4.936c-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847c-.844-.847-.844-2.21-.844-4.936z"
                  />
                </svg>
              </li>
            </ul>
          </div>
          <div
            className="max-w-[800px] md:text-xl mt-4 text-gray-400 "
            dangerouslySetInnerHTML={{
              __html: post?.excerpt || post?.content,
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Slug

export const getServerSideProps: any = async (context: any) => {
  const slugParams = context?.query?.sort

  const slug = context.params?.slug;
  const response = await apolloClient.query({
    query: SinglePost,
    variables: {
      id: slug,
      // order: queryParam
    },
  });

  const post = response.data.post;

  return {
    props: {
      post,
    },
  };
};