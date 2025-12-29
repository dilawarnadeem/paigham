import { SettingsContext } from '@/context/setting-context';
import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

const Category_Banner = ({ item }: any) => {

    const { videoLink } = useContext(SettingsContext)
    const [link, setLink] = useState<any>()

    useEffect(() => {
        var link = videoLink?.link?.length > 3 ? videoLink?.link : item?.postInfo?.tmVideoUrl
        // Check if the link is a Facebook link
        if (videoLink?.type === 'facebook') {
            setLink(link)
        } else {
            const modifiedYtLink = videoLink?.replace(videoLink?.includes('https://youtu.be/') ? 'https://youtu.be/' : 'https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
            setLink(modifiedYtLink)
        }
    }, [videoLink, link, item?.postInfo?.tmVideoUrl]);

    return (
        <>
            {
                videoLink?.includes('facebook') ?
                    <section className='bg-black'>
                        <div className="container mx-auto flex justify-center bg-black items-center">
                            <div className={'iframe-container mb0 relative pt-[56%] md:pt-[40.25%] fbVideo'}
                            >
                               
                                <ReactPlayer
                                    url={link}
                                    playing={true}
                                    controls={true}
                                    width='71.50%'
                                    height='100%'
                                    style={{ position: 'absolute', top: 0, right: '50%', transform: 'translateX(50%)' }}
                                    className="!w-full md:w-[71.50%]"
                                />
                                123456
                            </div>
                        </div>
                    </section> :
                    <div className="aspect-w-16 aspect-h-9 md:aspect-h-6">
                        <iframe src={link} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
            }
        </>
    );
}

export default Category_Banner

