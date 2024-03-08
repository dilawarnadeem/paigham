
import React from 'react'

import { Helmet } from 'react-helmet';

import Locations from '@/components/locations/locations';
import PageBanner from '@/components/pageBanner/PageBanner';
import SeoMeta from '@/components/seo';





export default function Contact_Us() {
    return (
        <>
            <SeoMeta title="Contact Us  For Preaching The True Teachings | Paigham Tv | Paigham TV" url="/contact-us" description="Contact Us for preaching the true teachings of the Holy Quran and Sunnah " />
            <PageBanner title="Contact Us" image="/images/banner-2.jpg" />
            <section className='container mx-auto mb-28 px-4'>
                <div className=' justify-between items-center mb-10  '>
                    <section className="px-2 pt-20 pb-9">
                        <h2 className="md:text-4xl text-3xl leading-8 uppercase font-bold text-[#302E2E] text-center mb-8">
                            OUR LOCATIONS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1200px] mx-auto mb-8">
                            <Locations
                                office="Main Office"
                                address="106 Ravi Rd, Forest Colony, Lahore, Punjab"
                                phone="0092-42-37722876 "
                                email="info.paigham@gmail.com"
                            />


                            <Locations
                                office="Channel Coordinator"
                                address="Asim Hafeez"
                                phone="+92 321 7165256 "
                                email=" asimmas27@gmail.com"
                            />


                            <Locations
                                office="Feedback and Program Info"
                                address="Fakhar ul Islam"
                                phone="+92 300 9470841 "
                                email=" fakhar41@gmail.com"
                            />

                            <Locations
                                office="Feedback and Program Info"
                                address="Fakhar ul Islam"
                                phone="+92 300 9470841 "
                                email=" fakhar41@gmail.com"
                            />


                            <Locations
                                office="Program Telecast Information"
                                address="Hafiz Junaid"
                                phone="+92 321 9445731"
                                email=""
                            />






                            <Locations
                                office="Marketing Department"
                                address="106 Ravi Rd, Forest Colony, Lahore, Punjab"
                                phone="+92 336 4417000"
                                email="marketing@paigham.tv"
                            />

                            <Locations
                                office=" Web & Social Media"
                                address="Farhan Ahmad"
                                phone="+92 314 6898007"
                                email="farhan@paigham.tv"
                            />























                        </div>
                    </section>







                    <div>


                    </div>
                </div>

            </section>



        </>
    )
}





