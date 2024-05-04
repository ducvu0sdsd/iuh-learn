'use client'
import Header from '@/components/header'
import Navbar from '@/components/menu/navbar'
import ListUser from '@/components/student-management/listUser'
import { adminContext } from '@/context/adminContext'
import React, { useContext } from 'react'

const StudentManagement = () => {
    const { adminData, adminHandler } = useContext(adminContext)
    return (
        <section className='h-screen w-full flex z-0'>
            <Navbar />
            <div className='w-full h-screen relative px-[20px] pb-[10px] flex flex-col gap-3'>
                <Header image={'/calendar.png'} text={'Quản Lý Sinh Viên'} />
                <ListUser />
                <button onClick={() => adminHandler.showCreateUserForm()} className='absolute px-4 py-1 rounded-md top-4 right-3 text-[14px] bg-[green] text-[white]'>+ Thêm Sinh Viên</button>
            </div>
        </section>
    )
}

export default StudentManagement