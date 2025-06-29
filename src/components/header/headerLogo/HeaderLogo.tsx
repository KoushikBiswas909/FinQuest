import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeaderLogo = () => {
  return (
    <Link href="/" className="hidden lg:flex items-center space-x-2">
      <Image src="/finquestLogo.svg" alt="finquestLogo" height={60} width={60} className="object-contain" />
      <p className="font-semibold text-white text-3xl ml-2.5">
        FinQuest
      </p>
    </Link>
  )
}

export default HeaderLogo
