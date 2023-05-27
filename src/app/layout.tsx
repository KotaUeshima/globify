import Navbar from '@/src/components/layout/Navbar'
import { Inter } from 'next/font/google'
import { Providers } from '../redux/provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Globify',
  description: 'Discover what everyone else is listening to',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
