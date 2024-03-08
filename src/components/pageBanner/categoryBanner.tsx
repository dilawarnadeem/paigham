import { SettingsContext } from '@/context/setting-context';
import React, { useContext, useEffect, useState } from 'react'
import PageBanner from './PageBanner';

const Category_Banner = ({item}:any) => {

    const [isFacebookLink, setIsFacebookLink] = useState(false);
    const { videoLink } = useContext(SettingsContext)
    const [link, setLink] = useState<any>()

    useEffect(() => {
        // Check if the link is a Facebook link item.postInfo.tmVideoUrl
        var link = videoLink?.link.length > 3 ? videoLink?.link : item.postInfo.tmVideoUrl
        setLink(link)
        if (link.includes('facebook.com')) {
            setIsFacebookLink(true);
            // Load the Facebook SDK script
            const convertedLink = convertFacebookVideoLink(link);
            setLink(convertedLink)
        } else {
            setIsFacebookLink(false);
        }
    }, [videoLink, isFacebookLink]);

    function convertFacebookVideoLink(originalLink: any, width = 560) {
        // Encode the original link
        const encodedLink = encodeURIComponent(originalLink);
        const newLink = `https://www.facebook.com/plugins/video.php?href=${encodedLink}&show_text=0&width=${width}`;
        return newLink;
    }


    return (
        <>
        <section className='container mt-24 px-4 mx-auto '>
            <div className="container flex mx-auto justify-center bg-black items-center">
                <div className=" iframe-container">
                    {!isFacebookLink ? (
                        <iframe
                            // width="100%"
                            // height="100%"
                            src={link}
                            title="Embedded Video"
                            allowFullScreen
                        ></iframe>
                    ) : <iframe src={link}  scrolling="no" frameBorder="0" allowFullScreen></iframe>}
                </div>
            </div>
        </section >
       </> 
    );
}

export default Category_Banner