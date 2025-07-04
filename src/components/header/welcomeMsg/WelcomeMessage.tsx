'use client'
import { useUser } from '@clerk/nextjs';
import React from 'react'

const WelcomeMessage = () => {
    const { user, isLoaded } = useUser();
    return (
        <div className='space-y-2 mb-4'>
            <h2 className='text-2xl lg:text-4xl text-white font-medium'>
                Welcome Back{isLoaded ? ", " : " "}{user?.firstName === null ? "Koushik" : user?.firstName} 👋
            </h2>
            <p className='text-sm lg:text-base text-[#89b6fd]'>
                Powering Smarter Financial Decisions for your Organization with Precision Tech.
            </p>
        </div>
    )
}

export default WelcomeMessage
