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
        const accessToken = globalThis.localStorage.getItem("accessToken")
        if (['/', '/sign-in'].includes(pathname)) {
            if (accessToken) {
                api({ sendToken: true, type: TypeHTTP.POST, path: "/authentication-token", port: ports.authServiceURL })
                    .then(res => {
                        setStudent(res)
                        if (res?.username.includes("admin")) {
                            router.push("/student-management")
                        } else {
                            router.push("/general-information")
                        }
                    })
            }
        } else {
            if (!accessToken)
                router.push("/")
            api({ sendToken: true, type: TypeHTTP.POST, path: "/authentication-token", port: ports.authServiceURL })
                .then(res => {
                    setStudent(res)
                })
                .catch(res => {
                    router.push("/")
                })
        }
    }, [pathname]);

    const notify = (status, message) => setInfo({ status, message })

    const data = {
        student, info
    }

    const handler = {
        setStudent,
        notify
    }

    return (
        <globalContext.Provider value={{ globalData: data, globalHandler: handler }}>
            <Notification status={info.status} message={info.message} setInfomation={setInfo} />
            {children}
        </globalContext.Provider>
    )
}

export default GlobalProvider