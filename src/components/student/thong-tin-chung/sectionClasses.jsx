import React from 'react'

const SectionClasses = () => {

    const semesters = [
        "KH1 (2020-2021)",
        "KH2 (2020-2021)",
        "KH3 (2020-2021)",
        "KH1 (2021-2022)",
        "KH2 (2021-2022)",
        "KH3 (2021-2022)",
        "KH1 (2022-2023)",
    ]

    const classes = [
        {
            name: 'Cấu trúc dữ liệu và giải thuật',
            code: '420003878342',
            numberOfCredits: 4
        },
        {
            name: 'Cấu trúc dữ liệu và giải thuật',
            code: '420003878342',
            numberOfCredits: 4
        },
        {
            name: 'Cấu trúc dữ liệu và giải thuật',
            code: '420003878342',
            numberOfCredits: 4
        }, {
            name: 'Cấu trúc dữ liệu và giải thuật',
            code: '420003878342',
            numberOfCredits: 4
        },
        {
            name: 'Cấu trúc dữ liệu và giải thuật',
            code: '420003878342',
            numberOfCredits: 4
        }
    ]


    return (
        <div className='border-[1px] rounded-lg px-[20px] py-[10px] flex flex-col gap-3 h-full overflow-auto'>
            <div className='w-full flex justify-between'>
                <h3 className='font-medium'>Lớp Học Phần</h3>
                <select className='text-[13px] focus:outline-none border-[1px] rounded-md px-[10px] py-[7px]'>
                    {semesters.map((semester, index) => {
                        return <option key={index}>{semester}</option>
                    })}
                </select>
            </div>
            <table className='w-full overflow-auto'>
                <thead className='text-[14px] h-[50px] font-medium text-[#373737]'>
                    <tr className='w-full'>
                        <th className='w-[80%] text-start'>Môn Học/Học Phần</th>
                        <th>Số Tín Chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem, index) => {
                        return <tr key={index} className='py-[10px] w-full h-[60px]'>
                            <td className='flex flex-col'>
                                <span className='text-[14px]'>{classItem.code}</span>
                                <span className='text-[14px]'>{classItem.name}</span>
                            </td>
                            <td className='text-center text-[14px]'>{classItem.numberOfCredits}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SectionClasses