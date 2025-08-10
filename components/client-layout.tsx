"use client"

import type React from "react"

import Header from "@/components/header"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
