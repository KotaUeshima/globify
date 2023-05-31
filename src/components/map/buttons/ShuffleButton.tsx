import { ArrowPathIcon } from '@heroicons/react/24/solid'

function ShuffleButton() {
  const shuffleSong = () => {}

  return (
    <button className='mapButton' onClick={shuffleSong}>
      <ArrowPathIcon className='mapButtonIcon' />
      <p className='mapButtonText'>Shuffle Song</p>
    </button>
  )
}

export default ShuffleButton
