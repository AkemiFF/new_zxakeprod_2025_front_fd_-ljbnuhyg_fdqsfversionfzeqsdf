'use client'

import React, { useRef } from "react"
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Toast } from "@/components/ui/toast"
import { getCsrfTokenDirect } from "@/util/csrf"
import { UrlConfig, firebaseConfig } from "@/util/config"

const GoogleSignupButton = () => {
  const app = initializeApp(firebaseConfig)

  const checkEmailExists = async (email: string) => {
    const csrfToken = getCsrfTokenDirect()

    try {
      const response = await fetch(`${UrlConfig.apiBaseUrl}/api/accounts/client/check-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok.")
      }

      const result = await response.json()

      if (result.exists) {
        Toast({
          title: "Info",
          description: (
            <>
              Email already exists. <Link href="/users/login">Login here</Link>.
            </>
          ),
        })
      } else {
        window.location.href = "/users/register/create-password"
      }
    } catch (error) {
      Toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
      })
      console.log(error)
    }
  }

  const handleSignUp = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
    const auth = getAuth(app)
    auth.languageCode = "fr"
    provider.setCustomParameters({
      login_hint: "user@example.com",
    })

    try {
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (credential) {
        const token = credential.accessToken
      }

      const user = result.user
      localStorage.setItem("user_register_info", JSON.stringify(user))

      await checkEmailExists(user.email || '')
    } catch (error: any) {
      console.error("Error Code: ", error.code)
      console.error("Error Message: ", error.message)
      console.error("Email: ", error.customData?.email)
      console.error("Credential: ", GoogleAuthProvider.credentialFromError(error))
    }
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleSignUp}>
      <Image
        width={25}
        height={25}
        alt="G"
        src="/images/google.png"
        className="mr-2"
      />
      Signup with Google
    </Button>
  )
}

export default GoogleSignupButton

