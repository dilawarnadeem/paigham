import React, { useContext, useEffect, useState } from 'react'
import { HiMenu } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import Logo from '../logo/Logo';
import Link from 'next/link';
import { RiMenu5Fill } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import { SettingsContext } from '@/context/setting-context';
import SearchModelBox from '../model-box/searchModelBox';
import { useRouter } from 'next/router';
import VideoModelBox from '../model-box/VideoModelBox';
import { LeftSideBar } from './leftSideBar';
import { Socials } from '../footer';
import TopBar from './topBar';
import useWindowScroll from '@/hooks/useWindowScroll'
import useWindowScreen from '@/hooks/useWindowScreen'
import { MdLanguage } from 'react-icons/md'

const Header = () => {
  const [isMobileNav, setIsMobileNav] = useState(false)
  const [leftSidebar, setLeftSideBar] = useState(false)
  const { isScrolled } = useWindowScroll()
  const { dimensions } = useWindowScreen()
  const [openLang, setOpenLang] = useState(false)

  const router = useRouter();
  const { SearchModalIsOpen, setSearchModalIsOpen, modalIsOpen,
    setModelIsOpen, documentDirection, setDocumentDirection,
    language, setLanguage } = useContext(SettingsContext)

  const OpenSearch = () => {
    setSearchModalIsOpen(true)
  }

  const NavController = (path: any) => {
    router.push(path)
    if (dimensions?.width < 1024) {
      setIsMobileNav(!isMobileNav)
    }
  }

  const toggleLanguageAndDirection = (l:string) => {
    const d = l === 'en' ? 'ltr' : l === 'ur' ? 'rtl' : 'rtl'
    sessionStorage.setItem('direction', d)
    sessionStorage.setItem('language', l)
    if(l === 'en'){
      setDocumentDirection('ltr')
      setLanguage('en')
    }else if(l === 'ur'){
      setDocumentDirection('rtl')
      setLanguage('ur')
    }else{
      setDocumentDirection('rtl')
      setLanguage('ar')
    }
    document.documentElement.dir = d;
    document.documentElement.lang = l;
    setOpenLang(false)
  };

  useEffect(() => {
    // Update the document's direction and language when the state changes
    const d = sessionStorage.getItem('direction')
    const l = sessionStorage.getItem('language')
    if (d !== null) {
      document.documentElement.dir = d;
    }
    if (l !== null) {
      document.documentElement.lang = l;
    }
  }, [documentDirection, language]);



  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-[50]">
        {/* main nav   */}
        <nav className={`flex justify-between items-center py-4 px-6 z-50 bg-gradient-to-l  from-blue via-blue to-[#0F275E] ${isScrolled && 'bg-gradient-to-l  from-blue via-blue to-[#0F275E]'}`}>
          <div className='text-pure flex items-center space-x-4'>
            <div className='absolute top-2 left-4 rtl:left-auto rtl:right-4'>
              <Logo />
            </div>
          </div>
          <div className='text-white flex items-center gap-4 z-10'>
            <button className='lg:hidden w-[33px] flex justify-center items-center h-[33px]' onClick={() => setIsMobileNav(!isMobileNav)}>
              {
                isMobileNav ? <RxCross1 size={30} className='text-white' /> : <RiMenu5Fill size={32} className='text-white' />
              }
            </button>
            <i className='lg:hidden relative'>
              <MdLanguage size={28} onClick={()=>(setOpenLang(!openLang))} className={openLang ? 'text-orange' : 'text-white'} />
              {
                  openLang && <div className="absolute pt-5 -right-[43px]">
                  <div className=' flex relative bg-gradient-to-l from-orange to-secondary flex-col '>
                    <button className="p-2 text-lg hover:bg-primary px-7 border-b-[1px] border-orange" onClick={()=>toggleLanguageAndDirection('en')}>English</button>
                    <button className="p-2 text-lg hover:bg-primary px-7 border-b-[1px] border-orange" onClick={()=>toggleLanguageAndDirection('ur')}>اردو</button>
                    <button className="p-2 text-lg hover:bg-primary px-7" onClick={()=>toggleLanguageAndDirection('ar')}>عربی</button>
                    <div className='p-2 bg-gradient-to-l from-orange to-secondary absolute right-1/2 transform -top-2 rotate-45 z-[-1] translate-x-1/2'/>
                  </div>
                </div>
                }
            </i>
            <i className='lg:hidden'><FiSearch size={24} onClick={() => OpenSearch()} /></i>
          </div>
          <div className={`lg:flex items-center lg:space-x-3 ${isMobileNav ? 'block absolute top-[0px] p-6 pt-20 md:pt-40 pb-10 left-0 right-0 z-[1] bg-primary' : 'hidden'}`}>
            <ul className='lg:flex items-center text-white gap-8'>
              {
                navList.map((item, idx) => (
                  <li key={idx} className='font-metapro flex items-center gap-2 hover:text-secondary cursor-pointer py-3 md:py-0 tracking-wide font-semibold capitalize text-lg text-pure' onClick={() => NavController(item.link)}>
                    {item.name}
                    {item?.icon && <img src={item?.icon} alt="TV Pashto" className="w-[32px]"/>}
                  </li>
                ))
              }
              <li className="hidden cursor-pointer md:block"><HiMenu size={28} onClick={() => setLeftSideBar(true)} /></li>
              {/* <li className="hidden relative cursor-pointer md:block">
                <MdLanguage size={28} onClick={()=>(setOpenLang(!openLang))} className={openLang ? 'text-orange' : 'text-white'} />
                {
                  openLang && <div className="absolute pt-5 -right-[43px]">
                  <div className=' flex relative bg-gradient-to-l from-orange to-secondary flex-col '>
                    <button className="p-2 text-lg hover:bg-primary px-7 border-b-[1px] border-orange" onClick={()=>toggleLanguageAndDirection('en')}>English</button>
                    <button className="p-2 text-lg hover:bg-primary px-7 border-b-[1px] border-orange" onClick={()=>toggleLanguageAndDirection('ur')}>اردو</button>
                    <button className="p-2 text-lg hover:bg-primary px-7" onClick={()=>toggleLanguageAndDirection('ar')}>عربی</button>
                    <div className='p-2 bg-gradient-to-l from-orange to-secondary absolute right-1/2 transform -top-2 rotate-45 z-[-1] translate-x-1/2'/>
                  </div>
                </div>
                }
                
              </li> */}
              <li className={`hidden cursor-pointer md:block pr-4 rtl:pr-0 ${documentDirection === 'rtl' && 'pl-4'}`}><i className=''><FiSearch size={24} onClick={() => OpenSearch()} /></i></li>
            </ul>
            <Link href="/donate-us" className='uppercase mt-5 lg:mt-0 text-base w-[200px] lg:w-auto hover:bg-orange inline-block text-center active:scale:105 hover:border-orange text-pure border px-5 py-[9.5px] font-anton tracking-widest border-pure'>Donate us</Link>
            <div className='text-white mt-5 lg:mt-0'>
              <Socials />
            </div>
          </div>
        </nav>
      </header>

      <LeftSideBar leftSidebar={leftSidebar} setLeftSideBar={setLeftSideBar} />
      {SearchModalIsOpen && <SearchModelBox setSearchModalIsOpen={setSearchModalIsOpen} />}
      {modalIsOpen && <VideoModelBox setModelIsOpen={setModelIsOpen} />}
    </>
  )
}

export default Header

const navList = [
  {
    name: 'Scholars',
    link: '/scholars'
  },

  {
    name: 'Shows',
    link: '/series'
  },
  {
    name: 'TV Guide',
    link: '/tv-guide'
  },
  {
    name: 'Live TV',
    link: '/live',
    icon: "/images/live.png"
  }
]
