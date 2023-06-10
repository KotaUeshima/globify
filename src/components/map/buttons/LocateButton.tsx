import { zoomLevel } from '@/src/utils/constants'
import { MapPinIcon } from '@heroicons/react/24/solid'

interface LocateButtonProps extends ChangeCenterProps {
  userLocation: MapLocation | null
}

function LocateButton({ changeCenter, userLocation }: LocateButtonProps) {
  const findUserLocation = () => {
    if (userLocation) {
      changeCenter(userLocation, zoomLevel.CLOSE)
    }
  }

  return (
    <button className='mapButton' onClick={findUserLocation}>
      <MapPinIcon className='mapButtonIcon' />
    </button>
  )
}

export default LocateButton
