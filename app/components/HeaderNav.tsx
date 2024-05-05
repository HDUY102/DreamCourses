import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/app/img/logo.png'
import { FaHeart } from "react-icons/fa6";

const HeaderNav = () => {
  return (
    <div>
        {/* Page Header BEGIN */}
        <header className='flex items-center justify-between bg-emerald-600 h-16'>
            <nav className=' flex items-center gap-8 text-white font-semibold'>
                <Link href={'/'}>
                  <Image src={logo} width={76} height={15} className="p-2 ml-5 rounded-full" alt="LOGO"></Image>        
                </Link>
                <Link className="p-2 hover:bg-white hover:text-black rounded-full px-6" data-tip="Home" href="/">Khóa học</Link>
                <Link className="p-2 hover:bg-white hover:text-black rounded-full px-6" data-tip="Category" href={'/category'}>Kho bài giảng</Link>
                <Link className="p-2 hover:bg-white hover:text-black rounded-full px-6" data-tip="Kho học tập" href={"/news"}>Quá trình học tập</Link>
                <Link className="p-2 hover:bg-white hover:text-black rounded-full px-6" data-tip="About" href={'/about'}>Giới thiệu</Link>
            </nav>
            <nav className='flex items-center gap-6 text-gray-500 font-semibold'>
                <Link className="text-white hover:text-red-500 mr-8" href={'/favourite'} data-tip="Favourite">
                  <FaHeart/>  
                </Link>
                <Link className="p-2 text-white hover:bg-white hover:text-black rounded-full px-6" data-tip="News" href={"/login"}>Đăng nhập</Link>  
            </nav>
        </header>
        {/* Page Header END */}
    </div>
  )
}

export default HeaderNav