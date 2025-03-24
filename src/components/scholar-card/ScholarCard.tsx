import React from 'react'
import Link from 'next/link'

const ScholarCard = ({ item }: any) => {
  // console.log(item);
  return (
    <div className='bg-red-300 relative group overflow-hidden'>
      <Link href={`/scholars/${item.slug}?id=${item.databaseId}`}>
        <img src={item?.featuredImage?.node?.mediaItemUrl} alt="image" width={300} height={300} className='w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-105' />
        <div className='bg-gradient-to-t from-black absolute inset-0 p-6 flex flex-col justify-end font-metapro to-black/0'>
          <h4 className='text-white text-xl font-medium tracking-wide'>{item.title}</h4>
        </div>
      </Link>
    </div>
  )
}

export default ScholarCard