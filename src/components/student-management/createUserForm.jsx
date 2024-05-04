import React from 'react'

const CreateUserForm = ({ visible }) => {
    return (
        <div style={visible ? { width: '800px', height: '500px', padding: '10px' } : { width: 0, height: 0, padding: 0 }} className='bg-[white] z-50 fixed top-[50%] left-[50%] translate-x-[-50%] transition-all translate-y-[-50%] rounded-lg overflow-hidden'>
            <div className='flex gap-2 items-center w-full py-[10px]'>
                {/* <img src={image} width={'35px'} /> */}
                <span className='text-[18px] font-medium'>Thêm Sinh Viên</span>
            </div>
        </div>
    )
}

export default CreateUserForm