'use client'
import { routeNames } from '@/src/utils/constants'
import { MapIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import globifyLogo from '../../../../public/assets/globifyLogo.png'
import ProfileCircle from './ProfileCircle'

function Navbar() {
  const pathname = usePathname()

  return (
    <div className='w-[90vw] mx-auto'>
      <div className='h-20 flex justify-between items-center'>
        <div className='flex flex-row space-x-10 items-center'>
          <Link href={routeNames.HOME} className='font-thin'>
            <img
              src={globifyLogo.src}
              alt='globify-icon'
              className='h-20 w-24 object-contain text-white'
            />
          </Link>
          <Link
            href={routeNames.MAP}
            className={`${
              pathname === routeNames.MAP
                ? 'text-white bg-primary'
                : 'text-primary hover:text-primary/50 '
            } p-3 font-medium globalRounded globalTransition flex flex-row space-x-2`}
          >
            <MapIcon className='h-6 w-6' />
            <h2>Map</h2>
          </Link>
        </div>
        <ProfileCircle />
      </div>
    </div>
  )
}

export default Navbar
