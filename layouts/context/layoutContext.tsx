'use client'

import { getClientAccess } from "@/util/Cookies"
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import '../../util/i18n'
import i18n from "../../util/i18n"

export interface User {
    id: string
    name: string
    username: string
}

interface LayoutContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    lang: string
    setLang: React.Dispatch<React.SetStateAction<string>>
}

// Create context with default values
const LayoutContext = createContext<LayoutContextType>({
    user: null,
    setUser: () => null,
    lang: "en",
    setLang: () => null
})

// Custom hook for using the layout context
export const useLayout = () => useContext(LayoutContext)

interface LayoutProviderProps {
    children: ReactNode
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [lang, setLang] = useState<string>("en")

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('user')
            const savedLang = localStorage.getItem('lang')

            if (savedUser) {
                setUser(JSON.parse(savedUser))
            }

            if (savedLang) {
                setLang(savedLang)
                i18n.changeLanguage(savedLang)
            }
        }
    }, [])

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang])

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    useEffect(() => {
        const checkAccessToken = async () => {
            try {
                const token = await getClientAccess()
                if (!token) {
                    localStorage.removeItem('user')
                    setUser(null)
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                localStorage.removeItem('user')

                setUser(null)
            }
        }

        checkAccessToken()
    }, [])

    useEffect(() => {
        if (lang) {
            localStorage.setItem('lang', lang)
        }
    }, [lang])

    const value = {
        user,
        setUser,
        lang,
        setLang
    }

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    )
}

export default LayoutContext