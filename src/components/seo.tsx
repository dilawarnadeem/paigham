
import Head from 'next/head';

const SeoMeta = ({ title, description, url }: any) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={`https://www.paigham.tv${url}`} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="paighamtv" />
            <meta property="article:publisher" content="https://www.facebook.com/paighamtv" />
            <meta property="article:modified_time" content="2023-07-06T22:58:46+00:00" />
            <meta property="og:image" content="https://paigham.tv/_next/image?url=%2Fimages%2Flogomain.png&w=1080&q=75" />
            <meta property="og:image:width" content="254" />
            <meta property="og:image:height" content="56" />
            <meta property="og:image:type" content="image/png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@paighamtv" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Head>
    );
};

export default SeoMeta;
