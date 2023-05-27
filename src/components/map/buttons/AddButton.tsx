import { PlusIcon } from '@heroicons/react/24/solid'
import { Dispatch } from 'react'

interface AddButtonProps {
  setModalOpen: Dispatch<boolean>
}

function AddButton({ setModalOpen }: AddButtonProps) {
  return (
    <button className='mapButton' onClick={() => setModalOpen(true)}>
      <PlusIcon className='mapButtonIcon' />
    </button>
  )
}

export default AddButton
