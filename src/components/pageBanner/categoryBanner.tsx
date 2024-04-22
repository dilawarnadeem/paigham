import { SettingsContext } from '@/context/setting-context';
import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

const Category_Banner = ({ item }: any) => {

    const { videoLink } = useContext(SettingsContext)
    const [link, setLink] = useState<any>()
    console.log("🚀 ~ link:", link)

    useEffect(() => {
        var link = videoLink?.link.length > 3 ? videoLink?.link : item.postInfo.tmVideoUrl
        // Check if the link is a Facebook link
        if (videoLink?.type === 'facebook') {
            setLink(link)
        } else {
            const modifiedYtLink = videoLink?.replace(videoLink?.includes('https://youtu.be/') ? 'https://youtu.be/' : 'https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
            setLink(modifiedYtLink)
        }
    }, [videoLink, link, item.postInfo.tmVideoUrl]);

    return (
        <>
            <section className='container mt-24 px-4 mx-auto'>
                <div className="container flex mx-auto justify-center bg-black items-center">
                    <div className={videoLink?.includes('facebook') ? 'iframe-container mb0 relative pt-[56.25%]' : 'iframe-container'}
                    >
                        {videoLink?.includes('facebook') ?
                            <ReactPlayer
                                url={link}
                                playing={true}
                                controls={true}
                                width='100%'
                                height='100%'
                                style={{ position: 'absolute', top: 0, left: 0 }}
                            /> :
                            <iframe
                                // width="100%"
                                // height="100%"
                                src={link}
                                title="Embedded Video"
                                allowFullScreen
                            ></iframe>
                        }
                    </div>
                </div>
            </section>

        </>
    );
}

export default Category_Banner