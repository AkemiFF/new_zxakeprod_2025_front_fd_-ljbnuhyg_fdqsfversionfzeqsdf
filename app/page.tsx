"use client"
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App() {

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.push("/users");
    }
  }, [router]);

  return (
    <>
    </>
  )
}