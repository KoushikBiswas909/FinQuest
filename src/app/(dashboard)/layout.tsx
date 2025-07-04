import Header from '@/components/header/Header';
import Providers from '@/lib/tanstackQueryProvider/providers';
import React from 'react'

type Props = {
    children: React.ReactNode;
};

// This component needs to render children so we are making props
const DashboardLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main>
                <Providers>
                    {children}
                </Providers>
            </main>
        </>
    )
}

export default DashboardLayout
