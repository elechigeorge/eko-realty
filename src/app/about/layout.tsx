import Footer from '@/components/Footer'
import Navbar from '@/components/Navigation'
import React from 'react'

export default function AboutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}