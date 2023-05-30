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
    <div className='h-[10vh] w-[80vw] mx-auto flex justify-between items-center'>
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
      <div className='flex flex-row'>
        {isLoggedIn ? (
          <>
            <div className='flex flex-col text-right mr-2'>
              <h2 className='text-sm'>Welcome</h2>
              <h2 className='text-sm font-thin'>{user.username}</h2>
            </div>
            <button onClick={handleLogout} className='navLoginButton'>
              Logout
            </button>
          </>
        ) : (
          <>
            <div className='flex flex-col text-right mr-2'>
              <h2 className='text-sm'>Welcome</h2>
              <h2 className='text-sm font-thin'>Guest</h2>
            </div>
            <Link href={routeNames.LOGIN} className='navLoginButton'>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
