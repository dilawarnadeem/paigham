import { SettingsContext } from '@/context/setting-context';
import React, { useContext } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube';
import FacebookVideoPlayer from './FacebookPlayer';

const VideoPlayer = ({ link }: any) => {
     const { videoLink } = useContext<any>(SettingsContext)

     const onPlayerReady: YouTubeProps['onReady'] = (event) => {
          event.target.pauseVideo();
     }
     const opts: YouTubeProps['opts'] = {
          height: '485',
          width: '840',
          playerVars: {
               autoplay: 0,
          },
     };

     return (
          <>
               {
                    videoLink?.type === 'facebook' ? <FacebookVideoPlayer /> : <YouTube
                         videoId={videoLink}
                         opts={opts}
                         className={`videocontainer`}
                         iframeClassName={`responsive-iframe`}
                         onReady={onPlayerReady}
                    />
               }


          </>
     )
}

export default VideoPlayer