import Information from '@/components/general-information/information'
import SectionClasses from '@/components/general-information/sectionClasses'
import Header from '@/components/header'
import Navbar from '@/components/menu/navbar'
import React from 'react'

const GeneralInformation = () => {
    return (
        <section className='h-screen w-full flex'>
            <Navbar />
            <div className='w-full h-screen px-[20px] pb-[10px] flex flex-col gap-3'>
                <Header image={'/student.png'} text={'Thông Tin Chung'} />
                <Information />
                <SectionClasses />
            </div>
        </section>
    )
}

export default GeneralInformation