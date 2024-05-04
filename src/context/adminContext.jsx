'use client'
import CreateUserForm from '@/components/student-management/createUserForm'
import Wrapper from '@/components/wrapper'
import React, { createContext, useRef, useState } from 'react'

export const adminContext = createContext()

const AdminProvider = ({ children }) => {
    const [visibleCreateUserForm, setVisibleCreateUserForm] = useState(false)
    const [visibleWrapper, setVisibleWrapper] = useState(false)

    const showWrapper = () => {
        setVisibleWrapper(true)
    }

    const hiddenWrapper = () => {
        setVisibleWrapper(false)
    }

    const showCreateUserForm = () => {
        showWrapper();
        setVisibleCreateUserForm(true)
    }

    const hiddenCreateUserForm = () => {
        hiddenWrapper();
        setVisibleCreateUserForm(false)
    }

    const adminData = {

    }

    const adminHandler = {
        hiddenCreateUserForm,
        showCreateUserForm
    }

    return (
        <adminContext.Provider value={{ adminData, adminHandler }}>
            {children}
            <Wrapper onClick={() => {
                hiddenCreateUserForm()
            }} visible={visibleWrapper} />
            <CreateUserForm visible={visibleCreateUserForm} />
        </adminContext.Provider>
    )
}

export default AdminProvider