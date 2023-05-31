import { zoomLevel } from '@/src/utils/constants'
import { HomeIcon } from '@heroicons/react/24/solid'

function HomeButton({ changeCenter, center }: ChangeCenterProps) {
  const goHome = () => {
    // make sure center is not optional
    if (center) {
      changeCenter(center, zoomLevel.HOME)
    }
  }

  return (
    <button className='mapButton' onClick={goHome}>
      <HomeIcon className='mapButtonIcon' />
      <p className='mapButtonText'>Home</p>
    </button>
  )
}

export default HomeButton
