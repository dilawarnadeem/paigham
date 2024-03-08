import Link from 'next/link'
import React from 'react'


const ChannelLinks = () => {
  return (
    <div className='flex flex-col absolute top-20 gap-1 right-0 my-5 mb-5 md:my-0 md:mb-0 items-start lg:items-center rtl:right-auto rtl:left-0'>
      {
        navButons.map((item, idx) => (
          <Link href={item.link} key={idx} target='_blank' className='font-montserrat max-w-[220px] text-primary w-full font-normal  group uppercase bg-secondary shadow-lg hover:bg-primary hover:text-white'>
            <div className='px-2 py-2.5 flex items-center gap-1.5 lg:gap-x-1 justify-start '>
              <img src={item.icon} alt={item.name} className='w-[25px]' />
              <p className='text-[14px] pt-1 '>{item.name}</p>
              <img src={item.live} alt={item.name} className='w-[32px]' />
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default ChannelLinks

const navButons = [
  {
    name: 'TV Urdu',
    link: 'https://www.youtube.com/channel/UCi-vOBG7Jgk_nKAG1Zd0R5g/live',
    icon: '/images/tv_icon.png',
    live: '/images/live.png'
  },
  {
    name: 'Quran TV',
    link: 'http://buttflu.pointto.us:8032/pk/Qurantv/index.m3u8',
    icon: '/images/tv_icon.png',
    live: '/images/live.png'
  },
  {
    name: 'TV UK',
    link: 'http://buttflu.pointto.us:8032/pk/paighamtv/video.m3u8',
    icon: '/images/tv_icon.png',
    live: '/images/live.png'
  },
  {
    name: 'TV Pashto',
    link: 'http://buttflu.pointto.us:8032/paigham/pashto/video.m3u8',
    icon: '/images/pashto_icon.png',
    live: '/images/live.png'
  }
]