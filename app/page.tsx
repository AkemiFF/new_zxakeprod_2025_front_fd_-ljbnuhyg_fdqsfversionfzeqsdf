"use client"
import Loader from "@/layouts/Loader";
import { useRouter } from "next/navigation";
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
      <Loader></Loader>
    </>
  )
}