import Link from 'next/link'
import React from 'react'

const DonateNow = () => {
  return (
    <section className='bg-[url("/images/donate-now.jpg")] bg-cover bg-no-repeat py-32'>
       <div className='container mx-auto px-4'>
       <h2 className='font-metapro text-white text-4xl md:text-5xl max-w-[600px] md:leading-[60px] tracking-widest font-semibold'>The Easy Way To Donate To Good Causes</h2>
        <p className="text-white max-w-[500px] mt-2 font-metapro tracking-wider mb-10">Make one-off or monthly donations. Every penny goes direct to your favorite's charities.</p>
        <Link href="#" className="bg-secondary px-10 py-4 font-metapro font-semibold tracking-wider hover:bg-orange">DONATE NOW</Link>
       </div>
    </section>
  )
}

export default DonateNow 