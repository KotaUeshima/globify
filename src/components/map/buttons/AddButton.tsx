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
        user.email === '' ? ' bg-gray-100 hover:bg-gray-100' : ''
      }`}
      onClick={() => setModalOpen(true)}
    >
      <PlusIcon
        className={`mapButtonIcon ${
          user.email === '' ? 'text-primary/30' : ''
        }`}
      />
    </button>
  )
}

export default AddButton
