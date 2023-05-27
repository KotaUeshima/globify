import { routeNames } from '@/src/utils/constants'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='h-[8vh] w-[90vw] mx-auto flex justify-between items-center'>
      <div className='flex flex-row space-x-10'>
        <h2 className='font-thin'>Globify</h2>
        <Link href={routeNames.HOME}>Home</Link>
        <Link href={routeNames.MAP}>Map</Link>
      </div>
      <Link
        href={routeNames.LOGIN}
        className='border-[0.5px] px-3 py-1 globalRounded text-gray-600 hover:text-white ease-in-out duration-700'
      >
        Login
      </Link>
    </div>
  )
}

export default Navbar
