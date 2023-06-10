import { ArrowPathIcon } from '@heroicons/react/24/solid'

function ShuffleButton() {
  const shuffleSong = () => {}

  return (
    <button className='mapButton' onClick={shuffleSong}>
      <ArrowPathIcon className='mapButtonIcon' />
    </button>
  )
}

export default ShuffleButton
