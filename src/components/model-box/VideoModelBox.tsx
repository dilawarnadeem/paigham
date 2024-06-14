import React from 'react'
import VideoPlayer from '../video-player/VideoPlayer';
import {MdOutlineClose} from 'react-icons/md'

const VideoModelBox = ({ setModelIsOpen }: any) => {

  function closeModal() {
    setModelIsOpen(false);
  }
  return (
    <>
    <div className='bg-black/60 fixed inset-0 z-50'>
      <div className='relative w-full h-full'>
        <div className='max-w-[850px] relative mx-auto h-full flex px-4 flex-col justify-center'>
        <button className="flex justify-end items-end mb-3" onClick={closeModal}><MdOutlineClose size={35} color="white"/></button>
          <VideoPlayer/>
          </div>
      </div>
    </div>
    </>
  )
}

export default VideoModelBox