import { PlusIcon } from '@heroicons/react/24/solid'

function AddButton() {
  const addSong = () => {}

  return (
    <button className='mapButton' onClick={addSong}>
      <PlusIcon className='mapButtonIcon' />
    </button>
  )
}

export default AddButton
