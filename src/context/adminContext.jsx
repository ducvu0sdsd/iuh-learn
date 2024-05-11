'use client'
import CreateChuyenNganhForm from '@/components/admin/chuyen-nganh-management/createChuyenNganhFrom'
import CreateGiaoVienForm from '@/components/admin/giao-vien-management/createGiaoVienFrom'
import UpdateGiaoVienForm from '@/components/admin/giao-vien-management/updateGiaoVienForm'
import CreateHeDaoTaoForm from '@/components/admin/he-dao-tao-management/createheDaoTaoForm'
import CreateHocKyForm from '@/components/admin/hoc-ky-management/createHocKyForm'
import CreateHocPhanForm from '@/components/admin/hoc-phan-management/createHocPhanForm'
import CreateKhoaForm from '@/components/admin/khoa-management/createKhoaForm'
import UpdateKhoaForm from '@/components/admin/khoa-management/updateKhoaForm'
import UpdateUserForm from '@/components/admin/khoa-management/updateKhoaForm'
import CreateLopForm from '@/components/admin/lop-management/createLopForm'
import CreateMonHocForm from '@/components/admin/mon-hoc-management/createMonHocForm'
import CreateUserForm from '@/components/admin/student-management/createUserForm'
import Wrapper from '@/components/wrapper'
import React, { createContext, useRef, useState } from 'react'

export const adminContext = createContext()

const AdminProvider = ({ children }) => {
    const [visibleCreateUserForm, setVisibleCreateUserForm] = useState(false)
    const [visibleCreateLopForm, setVisibleCreateLopForm] = useState(false)
    const [visibleCreateKhoaForm, setVisibleCreateKhoaForm] = useState(false)
    const [visibleCreateHocKyForm, setVisibleCreateHocKyForm] = useState(false)
    const [visibleCreateHocPhanForm, setVisibleCreateHocPhanForm] = useState(false)
    const [visibleCreateMonHocForm, setVisibleCreateMonHocForm] = useState(false)
    const [visibleCreateGiaoVienForm, setVisibleCreateGiaoVienForm] = useState(false)
    const [visibleCreateHeDaoTaoForm, setVisibleCreateHeDaoTaoForm] = useState(false)
    const [visibleCreateChuyenNganhForm, setVisibleCreateChuyenNganhForm] = useState(false)
    const [visibleWrapper, setVisibleWrapper] = useState(false)

    // update
    const [dataUpdateKhoa, setDataUpdateKhoa] = useState(undefined)
    const [dataUpdateGiaoVien, setDataUpdateGiaoVien] = useState(undefined)

    const showWrapper = () => {
        setVisibleWrapper(true)
    }

    const hiddenWrapper = () => {
        setVisibleWrapper(false)
        setVisibleCreateKhoaForm(false)
        setVisibleCreateLopForm(false)
        setVisibleCreateUserForm(false)
        setVisibleCreateChuyenNganhForm(false)
        setVisibleCreateHocKyForm(false)
        setVisibleCreateMonHocForm(false)
        setVisibleCreateHocPhanForm(false)
        setVisibleCreateGiaoVienForm(false)
        setVisibleCreateHeDaoTaoForm(false)
        //update
        setDataUpdateKhoa(undefined)
        setDataUpdateGiaoVien(undefined)
    }

    const showCreateUserForm = () => {
        showWrapper();
        setVisibleCreateUserForm(true)
    }

    const showCreateKhoaForm = () => {
        showWrapper();
        setVisibleCreateKhoaForm(true)
    }

    const showCreateLopForm = () => {
        showWrapper();
        setVisibleCreateLopForm(true)
    }

    const showCreateChuyenNganhForm = () => {
        showWrapper();
        setVisibleCreateChuyenNganhForm(true)
    }

    const showCreateMonHocForm = () => {
        showWrapper();
        setVisibleCreateMonHocForm(true)
    }

    const showCreateHocKyForm = () => {
        showWrapper();
        setVisibleCreateHocKyForm(true)
    }

    const showCreateHocPhanForm = () => {
        showWrapper();
        setVisibleCreateHocPhanForm(true)
    }

    const showCreateGiaoVienForm = () => {
        showWrapper();
        setVisibleCreateGiaoVienForm(true)
    }
    const showCreateHeDaoTaoForm = () => {
        showWrapper();
        setVisibleCreateHeDaoTaoForm(true)
    }

    const showUpdateKhoaForm = (data) => {
        showWrapper();
        setDataUpdateKhoa(data)
    }
    const showUpdateGiaoVienForm = (data) => {
        showWrapper();
        setDataUpdateGiaoVien(data)
    }

    const adminData = {
        visibleCreateKhoaForm,
        visibleCreateChuyenNganhForm,
        visibleCreateLopForm,
        visibleCreateMonHocForm,
        visibleCreateHocPhanForm,
        visibleCreateGiaoVienForm,
        visibleCreateHeDaoTaoForm,
        //update
        dataUpdateKhoa,
        dataUpdateGiaoVien
    }

    const adminHandler = {
        showCreateUserForm,
        showCreateKhoaForm,
        showCreateChuyenNganhForm,
        showCreateLopForm,
        showCreateMonHocForm,
        showCreateHocKyForm,
        showCreateHocPhanForm,
        showCreateGiaoVienForm,
        showCreateHeDaoTaoForm,
        showUpdateKhoaForm,
        showUpdateGiaoVienForm,
        hiddenWrapper
    }

    return (
        <adminContext.Provider value={{ adminData, adminHandler }}>
            {children}
            <Wrapper onClick={() => hiddenWrapper()} visible={visibleWrapper} />
            <CreateUserForm visible={visibleCreateUserForm} />
            <CreateLopForm visible={visibleCreateLopForm} />
            <CreateKhoaForm visible={visibleCreateKhoaForm} />
            <CreateChuyenNganhForm visible={visibleCreateChuyenNganhForm} />
            <CreateMonHocForm visible={visibleCreateMonHocForm} />
            <CreateHocKyForm visible={visibleCreateHocKyForm} />
            <CreateHocPhanForm visible={visibleCreateHocPhanForm} />
            <CreateGiaoVienForm visible={visibleCreateGiaoVienForm} />
            <CreateHeDaoTaoForm visible={visibleCreateHeDaoTaoForm} />
            <UpdateKhoaForm data={dataUpdateKhoa} />
            <UpdateGiaoVienForm data={dataUpdateGiaoVien} />
        </adminContext.Provider>
    )
}

export default AdminProvider