"use client"

import { useRouter } from "next/navigation";
const auth = localStorage.getItem('user');
const user = JSON.parse(String(auth));


export default function checkAuthentication() {
    const router = useRouter();

    if (user) {
        router.push('/auth')
    };
    return;
}