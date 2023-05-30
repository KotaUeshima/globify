'use client'
import { routeNames } from '@/src/utils/constants'
import Link from 'next/link'
import HomeTrackCard from '../components/home/HomeTrackCard'
import GlobeCanvas from '../components/home/globe/GlobeCanvas'
import useAuthorization from '../utils/useAuthorization'

export default function Home() {
  // check if user is authorized
  useAuthorization()

  return (
    <main className='min-h-screen w-[95vw] mx-auto flex flex-col'>
      <div className='h-full w-full flex flex-row'>
        {/* Left Side */}
        <div className='h-[90vh] w-2/3 flex flex-col justify-center items-center'>
          <div className='z-20 flex flex-col text-left w-3/4 space-y-6'>
            <h2 className='text-lg sm:text-4xl md:text-5xl lg:text-7xl lg:leading-normal font-bold tracking-wider'>
              Discover <span className='text-primary'>Global</span> Music
            </h2>
            <p className='text-lg font-thin w-1/2'>
              Explore what people from all across the world are listening
              to and share with the world what you are listening to with
              our global interactive map.
            </p>
            <div className='flex flex-row justify-start items-center space-x-10'>
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
        <div className='h-[90vh] w-1/3 flex flex-col'>
          <div className='h-1/3 flex items-center justify-start'>
            <HomeTrackCard />
          </div>
          <div className='h-1/3 flex items-center justify-center'>
            <HomeTrackCard />
          </div>
        </div>
        {/* Globe */}
        <div className='-z-10 absolute top-0 left-0 flex justify-center items-center'>
          <div className='h-screen w-screen'>
            <GlobeCanvas />
          </div>
        </div>
      </div>
      <div className='min-h-screen bg-white w-full flex justify-center items-center'>
        {/* <Canvas>
          <SongBox />
        </Canvas> */}
      </div>
    </main>
  )
}
