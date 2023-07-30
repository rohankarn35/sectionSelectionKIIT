import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './Provider'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KIIT-CONNECT | Section Swap',
  description: 'Welcome to Kiit Connect - Your one-stop website for B.Tech students at KIIT University! Access comprehensive study materials tailored for your academic success. Stay updated with the latest placements and events happening on campus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-800">
        <Providers>
        <div className='w-full bg-gray-800 min-h-screen h-auto  max-w-screen-2xl mx-auto flex relative flex-col'>
          <Navbar/>

        {children}
        </div>
        </Providers>
        </body>
    </html>
  )
}
