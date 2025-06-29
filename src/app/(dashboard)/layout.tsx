import Header from '@/components/header/Header';
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
                {children}
            </main>
        </>
    )
}

export default DashboardLayout
