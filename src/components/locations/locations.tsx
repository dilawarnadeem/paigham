import Image from 'next/image';



export default function Locations(props: any) {
  return (
    <>
      <div className="w-full relative md:py-10 md:px-16 p-5 space-y-8 border-4 border-[#133C6D]"
      >
        <h3 className="text-[26px] text-[#302E2E] font-bold uppercase">
          {props.office}
        </h3>
        <ul className="space-y-5">
          <li className="text-[#535353] hover:text-[#ffba1b] text-base font-semibold">
            <a href="#">{props.address}</a>
          </li>
          <li className="text-[#535353] hover:text-[#ffba1b] text-base font-semibold">
            <a href="#">{props.phone}</a>
          </li>

          <li className="flex items-center space-x-2">
            <a
              href={`mailto:${props.email}`}
              className="bg-[#ffba1b] hover:bg-[#302E2E] text-white md:py-2 py-2 md:px-9 px-2 text-sm font-bold uppercase rounded"
            >
              Email Us
            </a>
            <a
              href="https://www.google.com/maps?ll=31.602321,74.300666&z=16&t=m&hl=en-US&gl=US&mapclient=embed&cid=4762474773445143068" target='_blank'
              className="bg-[#585858] hover:bg-[#302E2E] text-white py-2 px-9 text-sm font-bold uppercase rounded"
            >
              Map Location
            </a>

          </li>
        </ul>
        <figure className="absolute -bottom-[6px] right-0">
          <img
            src="/images/color-bar-light.jpg"
            alt="Location "
            className="w-[55%] absolute bottom-0 right-0"
            width={300}
            height={8}
          />
        </figure>
      </div>
    </>
  );
}
