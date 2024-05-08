import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
      <Link href="/" className=''>
        <Image src="/images/logomain.png" alt="logo" width={440} height={440} className='z-10 w-14 md:w-[120px] lg:w-[160px] relative'/>
    </Link>
  )
}

export default Logo