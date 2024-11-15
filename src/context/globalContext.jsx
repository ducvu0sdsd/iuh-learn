'use client'
const { createContext } = require("react");
import Notification from '@/components/notification';
import { TypeHTTP, api } from '@/utils/api';
import { ports } from '@/utils/routes';
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'
export const globalContext = createContext();

export const notifyType = {
    SUCCESS: 'success',
    FAIL: 'fail',
    WARNING: 'warning',
    LOADING: 'loading',
    NONE: 'none'
}

const GlobalProvider = ({ children }) => {
    const [student, setStudent] = useState()
    const [management, setManagement] = useState()
    const [info, setInfo] = useState({ status: notifyType.NONE, message: '' })
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (info.status !== notifyType.NONE) {
            if (info.status !== notifyType.LOADING) {
                setTimeout(() => {
                    setInfo({ status: notifyType.NONE, message: '' })
                }, 3000);
            }
        }
    }, [info.status])

    useEffect(() => {
        const accessToken = globalThis.window.localStorage.getItem('accessToken')
        const refreshToken = globalThis.window.localStorage.getItem('refreshToken')
        const role = globalThis.window.localStorage.getItem('role')
        const privateRoutes = ['/learn', '/practice', '/broad-casts', '/communicate-with-ai']
        if (accessToken && refreshToken && role) {
            api({ type: TypeHTTP.POST, path: `/auth/find-${role === 'admin' ? 'manager' : 'user'}-by-token`, sendToken: true })
                .then(res => {
                    if (role === 'admin') {
                        setManagement(res)
                        // router.push("/quan-ly-sinh-vien")
                    } else {
                        setStudent(res)
                        router.push("/thong-tin-chung")
                    }
                })
        }
    }, []);

    const notify = (status, message) => setInfo({ status, message })

    const reload = () => {
        setTimeout(() => {
            globalThis.window.location.reload()
        }, 1000);
    }

    const data = {
        student, info, management
    }

    const handler = {
        setStudent,
        notify,
        reload,
        setManagement
    }

    return (
        <globalContext.Provider value={{ globalData: data, globalHandler: handler }}>
            <div className='z-40'>
                {children}
            </div>
            <Notification status={info.status} message={info.message} setInfomation={setInfo} />
        </globalContext.Provider>
    )
}

export default GlobalProvider