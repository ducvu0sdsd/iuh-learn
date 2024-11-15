'use client'
import ListPhong from '@/components/admin/phong-management/listPhong'
import XemLichPhong from '@/components/admin/phong-management/XemLichPhong'
import Header from '@/components/header'
import Navbar from '@/components/menu/navbar'
import { adminContext } from '@/context/adminContext'
import { TypeHTTP, api } from '@/utils/api'
import { ports } from '@/utils/routes'
import React, { useContext, useEffect, useState } from 'react'

const PhongManagement = () => {
    const [dsPhong, setDsPhong] = useState([])
    const { adminData, adminHandler } = useContext(adminContext)
    const [currentPhong, setCurrentPhong] = useState()

    useEffect(() => {
        api({ sendToken: true, type: TypeHTTP.GET, path: '/phong/get-all' })
            .then(phongs => {
                setDsPhong(phongs)
            })
    }, [])
    return (
        <section className='h-screen w-full flex z-0'>
            <Navbar />
            <div className='w-full h-screen relative pl-[20px] pr-[200px] pb-[10px] flex flex-col gap-3'>
                <Header image={'/calendar.png'} text={'Quản Lý Phòng'} />
                <div style={{ marginLeft: `-${currentPhong ? 100 : 0}%`, transition: '0.5s' }} className='w-full flex h-[95%]'>
                    <div className='w-full flex h-[100%]'>
                        <div className='min-w-[100%] flex flex-col gap-2 h-[100%]'>
                            <ListPhong dsPhong={dsPhong} setCurrentPhong={setCurrentPhong} />
                        </div>
                        <XemLichPhong currentPhong={currentPhong} setCurrentPhong={setCurrentPhong} />
                    </div>
                </div>
                <button onClick={() => adminHandler.showCreatePhongForm()} className='fixed px-4 py-1 rounded-md top-4 right-3 text-[14px] bg-[green] text-[white]'>+ Thêm Phòng Học</button>
            </div>
        </section>
    )
}

export default PhongManagement