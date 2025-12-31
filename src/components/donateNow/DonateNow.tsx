import Link from 'next/link'
import React from 'react'

const DonateNow = () => {
  return (
    <section className='bg-[url("/images/donate-now.jpg")] bg-cover bg-no-repeat py-32'>
       <div className='container mx-auto px-4'>
       <h2 className='font-metapro text-white text-4xl md:text-5xl max-w-[600px] md:leading-[60px] tracking-widest font-semibold'>The Easy Way to Donate to Good Causes.</h2>
        <p className="text-white max-w-[500px] mt-2 font-metapro tracking-wider mb-10">Make one-time or recurring donations, and watch as every penny goes directly to your favorite charities.</p>
        <Link href="/donate-us" className="bg-secondary px-10 py-4 font-metapro font-semibold tracking-wider hover:bg-orange">DONATE NOW</Link>
       </div>
    </section>
  )
}

export default DonateNow 