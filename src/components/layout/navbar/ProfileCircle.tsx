import { addUserToStore } from '@/src/features/users/userSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/store'
import { routeNames } from '@/src/utils/constants'
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SettingsModal from './SettingsModal'

function ProfileCircle() {
  const user: UserInterface = useAppSelector(state => state.user)
  const isLoggedIn: boolean = user.email !== ''
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [openSettingsModal, setOpenSettingsModal] =
    useState<boolean>(false)

  let initials: string = 'G'
  let fullName: string = 'Guest'
  let email: string = 'Guest@guest.com'
  if (isLoggedIn) {
    initials =
      user.firstName.substring(0, 1) + user.lastName.substring(0, 1)
    fullName = user.firstName + ' ' + user.lastName
    email = user.email
  }

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(
      addUserToStore({
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
      })
    )
    router.push(routeNames.HOME)
  }

  const ref = useRef<any>()
  // If clicked outside of the menu then close the menu
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (openMenu && ref.current && !ref.current.contains(e.target)) {
        setOpenMenu(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [openMenu])

  return (
    <>
      <button
        onClick={() => {
          setOpenMenu(!openMenu)
        }}
        className='font-medium text-sm text-secondary h-12 w-12 rounded-full bg-primary hover:ring-secondary hover:ring-1 hover:ring-inset globalTransition'
      >
        {initials}
      </button>
      {openMenu && (
        <div
          ref={ref}
          className='z-20 absolute top-[76px] right-[5vw] h-[275px] w-[300px] bg-gray-200 globalRounded flex justify-center items-center'
        >
          <div className='m-4 bg-white h-4/5 w-full globalRounded flex flex-col items-center'>
            <div className='mt-2 h-16 w-16 bg-primary text-secondary rounded-full flex justify-center items-center'>
              {initials}
            </div>
            <h2 className='mt-2 text-primary text-xl font-medium'>
              {fullName}
            </h2>
            <h2 className='text-gray-500 text-sm font-normal'>{email}</h2>
            <div className='mt-8 flex flex-row space-x-2'>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setOpenSettingsModal(true)
                      setOpenMenu(false)
                    }}
                    className='profileCircleButton'
                  >
                    <Cog6ToothIcon className='h-6 w-6 text-gray-500 space-x-2' />
                    <p>Settings</p>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout()
                      setOpenMenu(false)
                    }}
                    className='profileCircleButton'
                  >
                    <ArrowLeftOnRectangleIcon className='h-6 w-6 text-gray-500' />
                    <p>Sign Out</p>
                  </button>
                </>
              ) : (
                <Link
                  onClick={() => setOpenMenu(false)}
                  href={routeNames.LOGIN}
                  className='profileCircleButton'
                >
                  <ArrowRightOnRectangleIcon className='h-6 w-6 text-gray-500' />
                  <p>Login</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      {openSettingsModal && (
        <SettingsModal setOpenSettingsModal={setOpenSettingsModal} />
      )}
    </>
  )
}

export default ProfileCircle
