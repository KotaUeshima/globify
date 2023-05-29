'use client'
import { addUserToStore } from '@/src/features/users/userSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/store'
import { routeNames } from '@/src/utils/constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Navbar() {
  const user: UserInterface = useAppSelector(state => state.user)
  const isLoggedIn: boolean = user.username !== ''

  const router = useRouter()
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
    <div className='h-[8vh] w-[80vw] mx-auto flex justify-between items-center'>
      <div className='flex flex-row space-x-10'>
        <Link href={routeNames.HOME} className='font-thin'>
          Globify
        </Link>
        <Link href={routeNames.MAP} className='navLink'>
          Map
        </Link>
      </div>
      {isLoggedIn ? (
        <button onClick={handleLogout} className='navLoginButton'>
          Logout
        </button>
      ) : (
        <Link href={routeNames.LOGIN} className='navLoginButton'>
          Login
        </Link>
      )}
    </div>
  )
}

export default Navbar
