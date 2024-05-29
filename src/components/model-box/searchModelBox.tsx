import { SettingsContext } from '@/context/setting-context';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const SearchModelBox = ({ setSearchModalIsOpen }: any) => {
     function closeModal() {
          setSearchModalIsOpen(false);
     }
     const [openCategory, setOpenCategory] = useState(false)
     const {SetctedCategory, setCategory} = useContext(SettingsContext)
     const [searchValue, setSearchValue] = useState()
     const router = useRouter()

     const handleSearch =()=>{
          router.push(`/search?q=${searchValue}`)
          closeModal()
     }

     const handleKeyDown = (event:any) => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        };

     return (
          <div className='bg-black/90 fixed inset-0 z-50'>
               <div className='relative w-full h-full'>
                    <button className="absolute top-6 right-6" onClick={closeModal}><MdOutlineClose size={35} color="white" /></button>
                    <div className='max-w-[850px] mx-auto h-full flex px-4 flex-col pt-32 '>
                         <div className='bg-white md:flex item-center md:rounded-full p-1'>
                              {/* <div className='relative p-3 font-metapro text-lg text-gray-600'>
                                   <button className='flex md:border-r-[2px] w-full border-gray-300 md:pr-6 items-center space-x-4 md:w-[150px] justify-between' onClick={() => setOpenCategory(!openCategory)}>
                                        {SetctedCategory}
                                        {openCategory ? <SlArrowUp /> : <SlArrowDown />}
                                   </button>
                                   {openCategory && <SelectFilter setCategory={setCategory} setOpenCategory={setOpenCategory}/>}
                              </div> */}
                              <div className='flex item-center w-full'>
                                   <input type="text" value={searchValue} onKeyDown={handleKeyDown} onChange={(e:any)=>setSearchValue(e.target.value)} placeholder="Search here..." className='bg-transparent font-metapro text-lg p-3 px-6 outline-none w-full' />
                                   <button onClick={handleSearch} className="bg-secondary text-2xl px-3.5 hover:bg-black hover:text-secondary rounded-full"><FiSearch /></button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default SearchModelBox


const SelectFilter = ({setCategory, setOpenCategory}:any) => {
     return (
          <div className='rounded-2xl overflow-hidden outline-none p-4 w-full md:w-[160px] absolute top-16 left-0 right-0 bg-white shadow-lg'>
               <button className='block py-1 border-b-[1px] border-gray-100 w-full text-left hover:text-secondary cursor-pointer' onClick={()=>{setCategory("Ramadan"); setOpenCategory(false)}} value="Ramadan">Ramadan</button>
               <button className='block py-1 border-b-[1px] border-gray-100 w-full text-left hover:text-secondary cursor-pointer' onClick={()=>{setCategory("Islamic"); setOpenCategory(false)}} value="Islamic">Islamic</button>
               <button className='block py-1 border-b-[1px] border-gray-100 w-full text-left hover:text-secondary cursor-pointer' onClick={()=>{setCategory("Sisters"); setOpenCategory(false)}} value="Sisters">Sisters</button>
               <button className='block py-1 border-b-[1px] border-gray-100 w-full text-left hover:text-secondary cursor-pointer' onClick={()=>{setCategory("Quran"); setOpenCategory(false)}} value="Quran">Quran</button>
          </div>
     )
}