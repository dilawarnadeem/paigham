import PageBanner from '@/components/pageBanner/PageBanner';
import SeoMeta from '@/components/seo';
import React from 'react'
import { Helmet } from 'react-helmet';


export default function Donate_us() {
    return (
        <>
            <SeoMeta title="Donate Us For Preaching The True Teachings | Paigham Tv | Paigham TV" url="/donate-us" description="DONATE US for preaching the true teachings of the Holy Quran and Sunnah " />
            <PageBanner title="Donate Us" image="/images/banner-2.jpg" />
            {/* Categories section  */}
            <section className='container mx-auto mb-28 px-4'>
                {/* heading  */}
                <div className=' justify-between items-center  mb-10  '>

                    <div className='pt-6'>
                        <p> <strong> Account Title: </strong>   Zam Zam Welfare Trus</p>
                        <p><strong>Account Number: </strong>    0709217001</p>
                        <p><strong>IBAN NO:</strong>   PK45DUIB0000000709217001</p>
                        <p> <strong>Branch Name: </strong>   Ravi Road Branch Lahore, Pakistan</p>
                        <p> <strong>Bank Name: </strong>   Dubai Islamic Bank</p>
                        <p> <strong>Branch Code: </strong>   0219</p>
                        <p> For more details plz contact with Mr. Abdul Qayyum Zaheer</p>
                        <p> <strong>Tel :</strong>   +92 333 4089688</p>
                        <p> <strong>Tel :</strong>   +92 308 4089688</p>
                        <p> <strong>Email :</strong>   aqzaheer@paigham.tv</p>
                    </div>
                </div>
            </section>



        </>
    )
}





