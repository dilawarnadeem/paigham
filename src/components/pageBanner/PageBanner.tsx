import Image from 'next/image'
import React from 'react'

interface IPageBanner {
  title: any,
  image: string
}

const PageBanner = ({ title, image }: IPageBanner) => {
  return (
    <section className="relative -mt-[65px] lg:-mt-[77px]">
      <Image src={image} alt={title} width={1600} height={1400} className='w-full md:h-[350px] object-cover' />
      <div className='bg-black/20 absolute inset-0 flex flex-col justify-center'>
        <h2 className='text-center text-3xl md:text-5xl font-anton tracking-widest text-secondary uppercase'>{title}</h2>
      </div>
    </section>
  )
}

export default PageBanner