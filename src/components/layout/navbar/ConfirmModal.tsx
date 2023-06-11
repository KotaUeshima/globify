import { addUserToStore } from '@/src/features/users/userSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/store'
import { BACKEND_URL, routeNames } from '@/src/utils/constants'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { Dispatch } from 'react'

interface ConfirmModalProps {
  setOpenConfirmModal: Dispatch<boolean>
  setOpenSettingsModal: Dispatch<boolean>
}

function ConfirmModal({
  setOpenConfirmModal,
  setOpenSettingsModal,
}: ConfirmModalProps) {
  const user: UserInterface = useAppSelector(state => state.user)
  const deleteAccount = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/${user.id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (response.ok) {
        setOpenConfirmModal(false)
        setOpenSettingsModal(false)
        handleLogout()
      }
    } catch (e: any) {
      console.error(e)
    }
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

  return (
    <div className='z-40 h-full w-screen fixed inset-0 modalBackground flex justify-center items-center'>
      <div className='h-[200px] w-[300px] flex flex-col bg-secondary px-4 pb-4 globalRounded'>
        <div className='h-10 py-2 flex justify-end items-center'>
          <XMarkIcon
            onClick={() => setOpenConfirmModal(false)}
            className='basicIconSize rounded-full hover:bg-primary hover:text-secondary globalTransition cursor-pointer'
          />
        </div>
        <h2 className='text-xl font-medium'>
          Are you sure you want to delete account?
        </h2>
        <div className='mt-6 w-3/4 mx-auto flex flex-row justify-between text-secondary'>
          <button
            onClick={deleteAccount}
            className='py-3 px-6 bg-tertiary globalRounded'
          >
            Yes
          </button>
          <button
            onClick={() => {
              setOpenConfirmModal(false)
            }}
            className='py-3 px-6 bg-primary globalRounded'
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
