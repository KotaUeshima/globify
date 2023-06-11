'use client'
import { routeNames } from '@/src/utils/constants'
import Link from 'next/link'
import heroImage from '../../public/assets/heroImage2.png'
import useAuthorization from '../utils/hooks/useAuthorization'

export default function Home() {
  // check if user is authorized
  useAuthorization()

  return (
    <main className='min-h-screen w-[85vw] mx-auto flex flex-col'>
      <div className='h-[90vh] w-full flex flex-row'>
        {/* Left Side */}
        <div className='h-full w-1/2 flex flex-col justify-center items-center'>
          <div className='z-20 flex flex-col text-left w-3/4'>
            <h2 className='text-lg sm:text-4xl md:text-5xl lg:text-6xl lg:leading-normal font-bold tracking-wider'>
              Discover music from around the world.
            </h2>
            <p className='mt-4 text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-wider'>
              Use our interactive map to explore what people from across
              the world are listening to. Share your music from anywhere!
            </p>
            <div className='mt-12 flex flex-row justify-start items-center space-x-10'>
              <Link href={routeNames.MAP} className='landingPageButton'>
                Get Started
              </Link>
              <Link href={routeNames.LOGIN} className='landingPageButton'>
                Login
              </Link>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className='h-full w-1/2 flex'>
          <img
            src={heroImage.src}
            alt='hero-image'
            className='h-full w-full object-contain'
          />
        </div>
      </div>
      <div className='h-screen w-full flex flex-row'>
        <div className='h-full w-1/2'></div>
        <div className='h-full w-1/2 flex flex-col items-center'>
          <h1 className='text-4xl font-bold'>
            Check out Globify's Charts
          </h1>
          <p></p>
        </div>
      </div>
    </main>
  )
}
