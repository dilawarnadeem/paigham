import Image from 'next/image'
import React from 'react'
//import DefaultImage from '../../../public/images/Islamic.png'
import Link from 'next/link'

const CategoryCard = ({ item }: any) => {
  const featued_image = item?.categoryInfo?.catImage?.mediaItemUrl;
  return (
    <div className='bg-red-300 relative group overflow-hidden'>
      <Link href={`/category/${item.slug}`} ><Image src={featued_image} alt="image" width={700} height={700} className='w-full object-cover h-[420px] transition-all duration-200 ease-in-out group-hover:scale-105' />
        <div className='bg-gradient-to-t from-primary absolute inset-0 p-6 flex flex-col justify-end font-metapro to-black/0'>
          <h4 className='text-white text-2xl font-semibold tracking-wide'>{item.name}</h4>
          <p className='text-orange font-medium text-lg'>{item.count} Shows</p>
        </div>
      </Link>
    </div>
  )
}
export default CategoryCard