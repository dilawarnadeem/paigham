import { SettingsContext } from '@/context/setting-context';
import React, { useContext, useState } from 'react'
import FacebookPlayer from 'react-facebook-player';


const FacebookVideoPlayer = () => {
     const [state, setState] = useState({ player: null });
     const onReady = (player) => {
          setState({
               player: player,
          });
     }
     const { videoLink } = useContext(SettingsContext)

     // playVideo = () => {
     //   const { player } = this.state;
     //   if (player) player.play();
     // }
     // pauseVideo = () => {
     //   const { player } = this.state;
     //   if (player) player.pause();
     // }

     var link = videoLink?.link?.toString()?.replace("https://www.facebook.com/watch/?v=", "")
     return (
          <div className='w-[70%] mx-auto'>
               <FacebookPlayer
                    videoId={link}
                    appId="1731606113949263"
                    onReady={onReady}
               />
          </div>

     )
}

export default FacebookVideoPlayer