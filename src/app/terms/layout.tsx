import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navigation'
import React from 'react'

export default function TermsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <Navbar />
            {children}
            <CallToAction />
            <Footer />
        </>
    );
}