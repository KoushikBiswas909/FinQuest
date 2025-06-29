import React from 'react'
import { NavButtonProps } from './NavButton.types'
import Button from '@/components/common/Button/Button'
import Link from 'next/link'
import clsx from 'clsx'

const NavButton: React.FC<NavButtonProps> = ({ href, label, isActive }: NavButtonProps) => {
    return (
        <Button
            size="sm"
            variant="outline"
            className={clsx(
                'w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition',
                isActive ? 'bg-white/10 text-white' : 'bg-transparent'
            )}
        >
            <Link href={href}>{label}</Link>
        </Button>
    )
}

export default NavButton
