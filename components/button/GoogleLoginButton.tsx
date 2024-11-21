'use client'

import React, { useEffect, useState, useRef, useContext } from 'react'
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import Image from "next/image"
import Cookies from "js-cookie"
import { Toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import LayoutContext from "@/layouts/context/layoutContext"
import { firebaseConfig, UrlConfig } from '@/util/config'
import { setTokensInCookies } from "@/util/Cookies"
import { getCsrfTokenDirect } from "@/util/csrf"

const setCookieWithExpiry = (name: string, value: string, days: number, secure = true, sameSite = 'Strict') => {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  Cookies.set(name, value, {
    expires: date,
    secure: secure,
    sameSite: sameSite
  })
}

const verifyUserInfo = async (firebaseInfoUser: any, setIsLoggedIn: (value: boolean) => void, toast: any, setUser: (user: any) => void) => {
  try {
    const csrfToken = getCsrfTokenDirect()
    const response = await fetch(`${UrlConfig.apiBaseUrl}/api/accounts/client/loginwithemail/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ email: firebaseInfoUser.email }),
    })

    const data = await response.json()

    if (response.status !== 200) {
      const errorMessage = response.status === 404
        ? 'Email incorrect ou n\'existe pas'
        : 'Erreur de connexion'
      toast({ title: "Error", description: errorMessage })
      return
    }

    setCookieWithExpiry("csrfToken", csrfToken, 5)
    setTokensInCookies(data.refresh, data.access)

    const info = localStorage.getItem("user_register_info")
    if (info) {
      const parsedInfo = JSON.parse(info)
      setUser({
        username: data.username,
        id: data.id,
        userImage: UrlConfig.apiBaseUrl + data.profilPic,
      })
      Cookies.set("profile_user", data.profilPic, { expires: 1, secure: true, sameSite: 'Strict' })
      Cookies.set("username", parsedInfo.displayName, { expires: 1, secure: true, sameSite: 'Strict' })
    }

    localStorage.removeItem("user_register_info")

    toast({ title: "Success", description: "Connexion réussie" })
    setIsLoggedIn(true)
    setTimeout(() => {
      window.location.href = "/"
    }, 1000)
  } catch (error) {
    toast({ title: "Error", description: "Erreur de connexion" })
    console.error(error)
  }
}

export default function GoogleLoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const { user, setUser } = useContext(LayoutContext)

  const app = initializeApp(firebaseConfig)

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    const auth = getAuth(app)
    auth.languageCode = 'fr'
    provider.setCustomParameters({ 'login_hint': 'user@example.com' })

    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user
        localStorage.setItem("user_register_info", JSON.stringify(user))
        setUserInfo({
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          providerData: user.providerData
        })
      })
      .catch(error => {
        console.error("Error Code: ", error.code)
        console.error("Error Message: ", error.message)
      })
  }

  useEffect(() => {
    const info = localStorage.getItem("user_register_info")
    if (info) {
      setUserInfo(JSON.parse(info))
    }
  }, [])

  useEffect(() => {
    if (userInfo) {
      verifyUserInfo(userInfo, setIsLoggedIn, Toast, setUser)
    }
  }, [userInfo, setUser])

  return (
    <Button variant="outline" className="w-full" onClick={handleSignIn}>
      <Image width={25} height={25} alt="G" src="/images/google.png" className="mr-2" />
      Log in with Google
    </Button>
  )
}

