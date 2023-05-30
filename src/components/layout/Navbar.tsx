'use client'
import { addUserToStore } from '@/src/features/users/userSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/store'
import { routeNames } from '@/src/utils/constants'
import { MapIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

function Navbar() {
  const user: UserInterface = useAppSelector(state => state.user)
  const isLoggedIn: boolean = user.username !== ''

  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(
      addUserToStore({
        userId: 0,
        username: '',
      })
    )
    router.push(routeNames.HOME)
  }

  return (
    <div className='w-[85vw] mx-auto'>
      <div className='h-[10vh] flex justify-between items-center'>
        <div className='flex flex-row space-x-10'>
          <Link href={routeNames.HOME} className='font-thin'>
            Globify
          </Link>
          <Link
            href={routeNames.MAP}
            className={`${
              pathname === routeNames.MAP
                ? 'text-white'
                : 'text-gray-400 hover:text-white '
            } globalTransition flex flex-row space-x-2`}
          >
            <MapIcon className='h-6 w-6' />
            <h2>Map</h2>
          </Link>
        </div>
        {/* Welcome Message + Login/Logout Button*/}
        <div className='flex flex-row items-center space-x-10'>
          {isLoggedIn ? (
            <>
              <h2 className='text-base font-thin'>Hi {user.username}</h2>
              <button onClick={handleLogout} className='navLoginButton'>
                Logout
              </button>
            </>
          ) : (
            <>
              <h2 className='text-base font-thin'>Hi Guest</h2>
              <Link href={routeNames.LOGIN} className='navLoginButton'>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <hr className='h-[0.5px] bg-white border-none ' />
    </div>
  )
}

export default Navbar
