import Image from 'next/image'
import React, { useContext } from 'react'
//import DefaultImage from '../../../public/images/Islamic.png'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { SettingsContext } from '@/context/setting-context';

const CateCard = ({ item }: any) => {
  const { setVideoLink } = useContext(SettingsContext)

  const featued_image = item?.categoryInfo?.catImage?.mediaItemUrl;

  const router = useRouter()

  function handleCategory(){
    setVideoLink('')
    router.push(`/category/${item.slug}`)
  }

  return (
    <div className='bg-red-300 relative group overflow-hidden'>
      <button onClick={handleCategory} ><Image src={featued_image} alt="image" width={700} height={700} className='w-full object-cover h-[420px] transition-all duration-200 ease-in-out group-hover:scale-105' />
        <div className='bg-gradient-to-t from-primary absolute inset-0 p-6 flex flex-col justify-end font-metapro to-black/0'>
          <h4 className='text-white text-2xl font-semibold tracking-wide'>{item.name}</h4>
          <p className='text-orange font-medium text-lg'>{item.count} Shows</p>
        </div>
      </button>
    </div>
  )
}
export default CateCard