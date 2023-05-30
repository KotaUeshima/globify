'use client'
import Globe from '@/src/components/globe/Globe'
import { routeNames } from '@/src/utils/constants'
import { Canvas } from '@react-three/fiber'
import Link from 'next/link'
import SongBox from '../components/globe/SongBox'
import authorization from '../utils/authorization'

export default function Home() {
  // check if user is authorized
  authorization()

  return (
    <main className='min-h-screen w-full flex flex-col'>
      <div className='h-full w-full flex flex-row'>
        {/* Left Side */}
        <div className='h-[90vh] w-2/3 flex flex-col justify-center items-center'>
          <div className='flex flex-col text-left w-3/4 space-y-10'>
            <h2 className='text-lg sm:text-4xl md:text-5xl lg:text-7xl lg:leading-normal font-bold tracking-wider'>
              Discover True Global Music
            </h2>
            <p className='text-lg font-thin w-3/4'>
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
        <div className='min-h-screen w-1/3 flex flex-col'>
          <div className='w-full flex justify-start'>
            <div className='p-4 flex flex-row bg-gray-300 globalRounded'>
              <img
                src='https://i.scdn.co/image/ab67616d0000b27351f311c2fb06ad2789e3ff91'
                alt='album-cover'
                className='w-10 rounded-md'
              />
              <div className='ml-4 flex flex-col mr-4'>
                <h2 className='text-sm font-thin text-black'>
                  Have You Ever Seen The Rain
                </h2>
                <p className='text-xs text-black'>
                  by Creedence Clearwater Revivals
                </p>
              </div>
            </div>
          </div>
          <div className='h-full w-full'>
            <Globe />
          </div>
        </div>
      </div>
      <div className='min-h-screen bg-white w-full flex justify-center items-center'>
        <Canvas>
          <SongBox />
        </Canvas>
      </div>
    </main>
  )
}
