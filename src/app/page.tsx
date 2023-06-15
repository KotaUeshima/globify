'use client'
import { routeNames } from '@/src/utils/constants'
import Link from 'next/link'
import heroImage from '../../public/assets/heroImage2.png'
import Leaderboard from '../components/home/Leaderboard'
import useAuthorization from '../utils/hooks/useAuthorization'

export default function Home() {
  // check if user is authorized
  useAuthorization()

  return (
    <main className='min-h-screen w-[1000px] xl:w-[85vw] mx-auto flex flex-col'>
      <div className='h-[750px] xl:h-[90vh] w-full flex flex-row'>
        {/* Left Side */}
        <div className='h-full w-1/2 flex flex-col justify-center items-center'>
          <div className='flex flex-col text-left w-3/4'>
            <h2 className='text-5xl lg:text-6xl leading-normal font-bold tracking-wider'>
              Discover music from around the world.
            </h2>
            <p className='mt-4 text-base lg:text-lg font-light tracking-wider'>
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
      <div className='h-[750px] xl:h-[100vh] w-full flex flex-row'>
        <div className='h-full w-1/2 flex justify-center items-center'>
          <Leaderboard />
        </div>
        <div className='h-full w-1/2 flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold'>
            Check out Our Global Charts
          </h1>
          <p className='mt-4 text-base lg:text-lg font-light tracking-wider'>
            See what are the most popular songs today!
          </p>
        </div>
      </div>
    </main>
  )
}
