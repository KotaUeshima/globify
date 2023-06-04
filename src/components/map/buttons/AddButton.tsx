import { useAppSelector } from '@/src/redux/store'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Dispatch } from 'react'

interface AddButtonProps {
  setModalOpen: Dispatch<boolean>
}

function AddButton({ setModalOpen }: AddButtonProps) {
  const user: UserInterface = useAppSelector(state => state.user)

  return (
    <button
      disabled={user.email === '' ? true : false}
      className={`mapButton ${
        user.email === '' ? 'bg-gray-500 hover:bg-gray-500' : ''
      }`}
      onClick={() => setModalOpen(true)}
    >
      <PlusIcon className='mapButtonIcon' />
      <p className='mapButtonText'>Add</p>
    </button>
  )
}

export default AddButton
