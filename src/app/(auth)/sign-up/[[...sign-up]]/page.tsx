import { ClerkLoaded, ClerkLoading, SignIn, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
                <Image src='/finquestLogo.svg' height={500} width={500} alt='logo' />
            </div>
            <div className="h-full lg:flex flex-col items-center justify-center px-4 bg-white">
                <div className='text-center space-y-4 pt-16'>
                    <h1 className='font-bold text-3xl text-black'>
                        Welcome to FinQuest 👋
                    </h1>
                    <p className='text-base text-[#7E8CA0]' >
                        Streamlining Financial Operations for Smarter Business.
                    </p>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <ClerkLoaded>
                        <SignUp path='/sign-up' />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className='animate-spin text-blue-600' />
                    </ClerkLoading>
                </div>
            </div>
        </div>
    )
}