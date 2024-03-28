import { SettingsContext } from '@/context/setting-context';
import React, { useContext, useEffect, useState } from 'react'
import PageBanner from './PageBanner';
import FacebookVideoPlayer from '../video-player/FacebookVideoPlayer';

const Category_Banner = ({ item }: any) => {

    const [isFacebookLink, setIsFacebookLink] = useState(false);
    const { videoLink } = useContext(SettingsContext)
    const [link, setLink] = useState<any>()
    console.log("🚀 ~ link:", link)

    useEffect(() => {
        // Check if the link is a Facebook link item.postInfo.tmVideoUrl
        // var link = videoLink?.link.length > 3 ? videoLink?.link : item.postInfo.tmVideoUrl
        const modifiedYtLink = videoLink?.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')        
        if (modifiedYtLink?.includes('facebook.com')) {
            setIsFacebookLink(true);
            setLink(modifiedYtLink)
        } else {
            setIsFacebookLink(false);
            setLink(modifiedYtLink)
        }
    }, [videoLink, isFacebookLink, link]);



    return (
        <>
            <section className='container mt-24 px-4 mx-auto '>
                <div className="container flex mx-auto justify-center bg-black items-center">
                    <div className={ isFacebookLink ? 'iframe-container mb0' : 'iframe-container' }>
                        {!isFacebookLink ? (
                            <iframe
                                // width="100%"
                                // height="100%"
                                src={link}
                                title="Embedded Video"
                                allowFullScreen
                            ></iframe>
                        ) : <FacebookVideoPlayer videoUrl={link} />
                        }
                    </div>
                </div>
            </section >
        </>
    );
}

export default Category_Banner