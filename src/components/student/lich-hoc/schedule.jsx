"use client"
import { globalContext } from '@/context/globalContext'
import { api, TypeHTTP } from '@/utils/api'
import React, { useContext, useEffect, useState } from 'react'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const Schedule = () => {
    const { globalData } = useContext(globalContext)
    const [maHocKy, setMaHocKy] = useState('')
    const [dsHocKy, setDsHocKy] = useState([])
    const [dsHocPhan, setDsHocPhan] = useState([])
    const [student, setStudent] = useState()
    const [dsTiet, setDsTiet] = useState([])
    const valuesArraySang = [
        '1-2',
        '1-3',
        '2-3',
        '3-4',
        '4-5',
        '4-6',
        '5-6'
    ];
    const valuesArrayChieu = [
        '7-8',
        '7-9',
        '8-9',
        '10-11',
        '10-12'
    ];
    const valuesArrayToi = [
        '11-12',
        '13-14',
        '13-15'
    ];

    useEffect(() => setStudent(globalData.student), [globalData.student])

    useEffect(() => {
        api({ sendToken: true, type: TypeHTTP.GET, path: '/hocky/get-all' })
            .then(hocky => {
                setDsHocKy(hocky)
            })
    }, [])

    useEffect(() => {
        if (maHocKy !== '') {
            api({ type: TypeHTTP.POST, sendToken: true, body: { maHocKy }, path: '/hocphan/get-by-hoc-ky' })
                .then(res => {
                    const filter = res.filter(item => {
                        return [...item.tietLyThuyet[0].dsSinhVien, ...item.tietThucHanh.map(item => item.dsSinhVien).flat()].includes(student._id)
                    })
                    setDsHocPhan(filter)
                    const arr = []
                    filter.forEach(item => {
                        arr.push({
                            tenMon: item.monHoc.tenMon,
                            tenLop: item.lop.tenLop,
                            loai: 'LT',
                            thoigian: item.tietLyThuyet[0]
                        })
                        item.tietThucHanh.forEach((item1) => {
                            if (item1.dsSinhVien.includes(student._id)) {
                                arr.push({
                                    tenMon: item.monHoc.tenMon,
                                    tenLop: item.lop.tenLop,
                                    loai: 'TH',
                                    thoigian: item1
                                })
                            }
                        })
                    })
                    setDsTiet(arr)
                })
        }
    }, [maHocKy])


    return (
        <div className='flex flex-col overflow-x-auto'>
            <select value={maHocKy} onChange={e => setMaHocKy(e.target.value)} className='w-[150px] text-[14px] focus:outline-0 px-[10px] h-[35px] border-[#c1c1c1] border-[1px] rounded-md'>
                <option value=''>Học Kỳ</option>
                {dsHocKy.map((hocKy, index) => (
                    <option value={hocKy._id} key={index}>{hocKy.tenHocKy}</option>
                ))}
            </select>
            {maHocKy !== '' && (
                <div className='w-[1000px] h-screen overflow-auto'>
                    <div className='w-[1200px] justify-items-stretch grid grid-cols-8 items-stretch rounded-md overflow-hidden mt-5 ' >
                        <div className='border-[1px] font-semibold border-[#bbb] h-[70px] flex items-center justify-center'>
                            Ca Học
                        </div>
                        <div className='text-[14px] border-[1px] border-[#bbb] h-[70px] flex flex-col items-center justify-center'>
                            <span>Thứ 2</span>
                        </div>
                        <div className='text-[14px] border-[1px] border-[#bbb] h-[70px] flex flex-col items-center justify-center'>
                            <span>Thứ 3</span>
                        </div>
                        <div className='text-[14px] border-[1px] border-[#bbb] h-[70px] flex flex-col items-center justify-center'>
                            <span>Thứ 4</span>
                        </div>
                        <div className='text-[14px] border-[1px] border-[#bbb] h-[70px] flex flex-col items-center justify-center'>
                            <span>Thứ 5</span>
                        </div>
                        <div className='text-[14px] border-[1px] border-[#bbb] h-[70px] flex flex-col items-center justify-center'>
                            <span>Thứ 6</span>
                        </div>
                        <div className='text-[14px] border-[1px] border-[#bbb] h-[70px] flex flex-col items-center justify-center'>
                            <span>Thứ 7</span>
                        </div>
                        <div className='text-[14px] border-[1px] border-[#bbb] h-[70px] flex flex-col items-center justify-center'>
                            <span>Chủ Nhật</span>
                        </div>
                        <div className='border-[1px] font-semibold border-[#bbb] flex flex-col items-center justify-center'>
                            Sáng
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 2 && valuesArraySang.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 3 && valuesArraySang.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 4 && valuesArraySang.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 5 && valuesArraySang.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 6 && valuesArraySang.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 7 && valuesArraySang.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 1 && valuesArraySang.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] font-semibold border-[#bbb] flex flex-col items-center justify-center'>
                            Chiều
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 2 && valuesArrayChieu.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 3 && valuesArrayChieu.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 4 && valuesArrayChieu.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 5 && valuesArrayChieu.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 6 && valuesArrayChieu.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 7 && valuesArrayChieu.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 1 && valuesArrayChieu.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] font-semibold border-[#bbb] flex flex-col items-center justify-center'>
                            Tối
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 2 && valuesArrayToi.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 3 && valuesArrayToi.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 4 && valuesArrayToi.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 5 && valuesArrayToi.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 6 && valuesArrayToi.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 7 && valuesArrayToi.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                        <div className='border-[1px] gap-2 p-2 text-start border-[#bbb] flex flex-col items-center justify-start'>
                            {dsTiet.map((item, index) => {
                                if (item.thoigian.ngay === 1 && valuesArrayToi.includes(item.thoigian.tiet)) {
                                    return <div style={{ backgroundColor: item.loai === 'LT' ? '#f7f7f7' : '#a3e4d7' }} key={index} className='bg-[#f7f7f7] p-2 rounded-lg gap-1 flex flex-col items-center justify-center'>
                                        <span className='font-medium text-[14px] text-start w-full'>{item.tenMon}</span>
                                        <span className='text-[13px] text-start w-full'>{item.tenLop}</span>
                                        <span className='text-[13px] text-start w-full'>Tiết {item.thoigian.tiet}</span>
                                        <span className='text-[13px] text-start w-full'>Phòng {item.thoigian.phong.tenPhong}</span>
                                        <span className='text-[13px] text-start w-full'>GV: {item.thoigian.giaoVien.tenGiaoVien}</span>
                                    </div>
                                }
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Schedule