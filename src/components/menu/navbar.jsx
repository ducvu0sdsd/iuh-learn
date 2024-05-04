'use client'
import { globalContext, notifyType } from '@/context/globalContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const Navbar = () => {
    const { globalHandler, globalData } = useContext(globalContext)
    const router = useRouter()

    const handleSignOut = () => {
        globalHandler.notify(notifyType.LOADING, "Go Out")
        globalThis.localStorage.removeItem('accessToken')
        setTimeout(() => {
            globalHandler.notify(notifyType.NONE, "")
            router.push("/")
        }, 1000);
    }

    return (
        <div className='w-[250px] z-10 bg-[white] border-r-[1px] h-full border-[#e0e0e0] pt-[10px] flex flex-col gap-3 px-[15px] shadow-xl'>
            <div className='flex w-full items-center justify-start gap-4 mb-[15px]'>
                <img src='/logo.png' width={'45px'} />
                <span className='text-[12px] w-[200px] font-medium translate-y-[5px]'>INDUSTRIAL UNIVERSITY OF HOCHIMINH CITY</span>
            </div>
            {!globalData.student?.username.includes('admin') ?
                (<>
                    <Link href={'/general-information'}>
                        <div className='flex w-full items-center justify-start gap-2 cursor-pointer'>
                            <img src='/student.png' width={'32px'} />
                            <span className='hover:underline text-[13px] font-medium w-[200px] translate-y-[5px]'>Thông Tin Chung</span>
                        </div>
                    </Link>
                    <div className='flex w-full items-center justify-start gap-2 cursor-pointer'>
                        <img src='/signup.png' width={'32px'} />
                        <span className='hover:underline text-[13px] font-medium w-[200px] translate-y-[5px]'>Đăng Kí Học Phần</span>
                    </div>
                    <div className='flex w-full items-center justify-start gap-2 cursor-pointer'>
                        <img src='/search.png' width={'32px'} />
                        <span className='hover:underline text-[13px] font-medium w-[200px] translate-y-[5px]'>Tra Cứu Công Nợ</span>
                    </div>
                    <Link href={'/academic-calendar'}>
                        <div className='flex w-full items-center justify-start gap-2 cursor-pointer'>
                            <img src='/calendar.png' width={'32px'} />
                            <span className='hover:underline text-[13px] font-medium w-[200px] translate-y-[5px]'>Lịch</span>
                        </div>
                    </Link>
                </>)
                :
                (<>
                    <Link href={'/student-management'}>
                        <div className='flex w-full items-center justify-start gap-2 cursor-pointer'>
                            <img src='/calendar.png' width={'32px'} />
                            <span className='hover:underline text-[13px] font-medium w-[200px] translate-y-[5px]'>Quản Lý Sinh Viên</span>
                        </div>
                    </Link>
                </>)
            }
            <div onClick={() => handleSignOut()} className='flex w-full items-center justify-start gap-2 cursor-pointer'>
                <img src='/signout.png' width={'32px'} />
                <span className='hover:underline text-[13px] font-medium w-[200px] translate-y-[5px]'>Đăng Xuất</span>
            </div>
        </div>
    )
}

export default Navbar