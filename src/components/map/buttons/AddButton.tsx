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
      disabled={user.username === '' ? true : false}
      className={`mapButton ${
        user.username === '' ? 'bg-primary/50 hover:bg-primary/50' : ''
      }`}
      onClick={() => setModalOpen(true)}
    >
      <PlusIcon className='mapButtonIcon' />
    </button>
  )
}

export default AddButton
