'use client'
import Globe from '@/components/globe/Globe'
import { routeNames } from '@/utils/constants'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='min-h-screen w-full flex flex-row'>
      {/* Left Side */}
      <div className='min-h-screen w-1/2 flex flex-col justify-center items-center'>
        <h1 className='absolute top-20 left-10 text-[20vh] font-extrabold text-gray-300'>
          Globify
        </h1>
        <div className='flex flex-col text-left w-2/3 space-y-4'>
          <h2 className='ml-1 text-lg sm:text-3xl md:text-4xl lg:text-5xl tracking-wider'>
            Find out what everybody else is listening to
          </h2>
          <div className='ml-1 flex flex-row justify-start items-center space-x-6'>
            <Link href={routeNames.MAP} className='landingPageButtons'>
              See Map!
            </Link>
            <Link href={routeNames.LOGIN} className='landingPageButtons'>
              Login
            </Link>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className='min-h-screen w-1/2 flex justify-center items-center'>
        <Globe />
      </div>
    </main>
  )
}
