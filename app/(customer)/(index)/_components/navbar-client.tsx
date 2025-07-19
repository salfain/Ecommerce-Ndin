'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { NavbarClientProps } from '@/types'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog'

export default function NavbarClient({ session, user }: NavbarClientProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [showDialog, setShowDialog] = useState(false)

    const navItems = [
        { label: 'Beranda', href: '/' },
        { label: 'Katalog', href: '/catalogs' },
        {
            label: 'Pesanan Saya',
            href: '/orders',
            protected: true, // custom field
        },
    ]

    const isActive = (href: string) => pathname === href

    const handleNavClick = (item: typeof navItems[0]) => {
        if (item.protected && !session) {
            setShowDialog(true)
        } else {
            router.push(item.href)
        }
    }

    return (
        <React.Fragment>
            <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-2 rounded-3xl">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0" aria-label="Home">
                    <Image
                        src="/assets/logos/logo.png"
                        alt="Site Logo"
                        width={100}
                        height={70}
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* Navigation Links */}
                <ul className="flex items-center gap-[30px]">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <button
                                onClick={() => handleNavClick(item)}
                                className={`transition-all duration-300 font-bold ${isActive(item.href)
                                    ? 'text-[#FFC736]'
                                    : 'text-white hover:font-bold hover:text-[#FFC736]'
                                    }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Cart Icon */}
                    <Link href="/carts" className="w-12 h-12 flex-shrink-0" aria-label="Cart">
                        <Image
                            src="/assets/icons/cart.svg"
                            alt="Cart Icon"
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </Link>

                    {/* Auth State */}
                    {session && user?.role === 'customer' ? (
                        <div className="flex items-center gap-3">
                            <p className="text-white hidden sm:block">Hi, {user.name}</p>
                            <div className="w-12 h-12 rounded-full border border-[#E5E5E5] overflow-hidden">
                                <Image
                                    src="/assets/photos/p4.png"
                                    alt="User Profile"
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link href="/sign-in" className="px-5 py-3 bg-white rounded-full font-semibold">
                                Sign In
                            </Link>
                            <Link href="/sign-up" className="px-5 py-3 bg-white rounded-full font-semibold">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Alert Dialog for unauthenticated access */}
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Anda belum login</AlertDialogTitle>
                        <p className="text-sm text-muted-foreground">
                            Silakan masuk terlebih dahulu untuk melihat pesanan Anda.
                        </p>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>Tutup</AlertDialogCancel>
                        <button
                            onClick={() => router.push('/sign-in')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Login Sekarang
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </React.Fragment>
    )
}
