import Navbar from '@/src/components/layout/navbar/Navbar'
import { Lato } from 'next/font/google'
import { Providers } from '../redux/provider'
import './globals.css'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

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
      <body className={lato.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
