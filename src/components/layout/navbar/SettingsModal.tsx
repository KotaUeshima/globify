import { addUserToStore } from '@/src/features/users/userSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/store'
import { BACKEND_URL } from '@/src/utils/constants'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Dispatch, useState } from 'react'

interface SettingsModalProps {
  setOpenSettingsModal: Dispatch<boolean>
}

function SettingsModal({ setOpenSettingsModal }: SettingsModalProps) {
  const user: UserInterface = useAppSelector(state => state.user)

  interface UpdatedUser {
    firstName: string
    lastName: string
    email: string
  }

  const defaultUpdatedUser: UpdatedUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  }

  const [updatedUser, setUpdatedUser] =
    useState<UpdatedUser>(defaultUpdatedUser)
  const [error, setError] = useState<string>('')
  const [updateActive, setUpdateActive] = useState<boolean>(true)

  const dispatch = useAppDispatch()

  const updateUserObject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copyUpdatedUser = {
      ...updatedUser,
      [e.target.name]: e.target.value,
    }
    setUpdatedUser(copyUpdatedUser)
    // update update button UI
    setUpdateActive(
      copyUpdatedUser.firstName !== '' &&
        copyUpdatedUser.lastName !== '' &&
        copyUpdatedUser.email !== ''
    )
  }

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(user.id)
    try {
      const response = await fetch(`${BACKEND_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: updatedUser }),
      })
      // successful login
      if (response.ok) {
        const data: { user: UserInterface } = await response.json()
        dispatch(addUserToStore(data.user))
        setOpenSettingsModal(false)
      }
      // error with login
      else {
        const data = await response.json()
        setError(data.errors[0])
      }
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <div className='z-30 h-full w-screen fixed inset-0 modalBackground flex justify-center items-center'>
      {/* Actual Modal */}
      <div className='z-30 h-[75vh] w-3/4 md:w-[500px] flex flex-col bg-secondary px-4 pb-4 globalRounded overflow-y-auto'>
        {/* Navigation Bar */}
        <div className='h-10 py-2 flex justify-end items-center'>
          <XMarkIcon
            onClick={() => setOpenSettingsModal(false)}
            className='basicIconSize rounded-full hover:bg-white hover:text-secondary globalTransition cursor-pointer'
          />
        </div>
        {/* User Circle */}
        <div className='w-full flex justify-center'>
          <div className='h-32 w-32 text-3xl bg-primary text-secondary rounded-full flex justify-center items-center'>
            {user.firstName.substring(0, 1) +
              user.lastName.substring(0, 1)}
          </div>
        </div>
        {/* Update User Form */}
        <div className='w-full'>
          <form
            onSubmit={updateUser}
            className='mt-6 w-3/4 mx-auto flex flex-col'
          >
            <label htmlFor='email' className='lightFormLabel'>
              First Name
            </label>
            <input
              type='text'
              name='firstName'
              className='loginFormInput'
              value={updatedUser.firstName}
              onChange={updateUserObject}
            />
            <label htmlFor='email' className='lightFormLabel'>
              Last Name
            </label>
            <input
              type='text'
              name='lastName'
              className='loginFormInput'
              value={updatedUser.lastName}
              onChange={updateUserObject}
            />
            <div className='flex justify-between'>
              <label htmlFor='email' className='lightFormLabel'>
                Email
              </label>
              {error !== '' && <p className='loginErrorLabel'>{error}</p>}
            </div>
            <input
              type='text'
              name='email'
              className='loginFormInput'
              value={updatedUser.email}
              onChange={updateUserObject}
            />
            <button
              className={`${
                updateActive ? 'bg-primary' : 'bg-primary/20'
              } mt-4 rounded-md p-3 text-white`}
              disabled={!updateActive}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
