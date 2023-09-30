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
    <button
      disabled={userLocation === null}
      className={`mapButton ${
        userLocation === null ? ' bg-gray-200 hover:bg-gray-200' : ''
      }`}
      onClick={findUserLocation}
    >
      <MapPinIcon
        className={`mapButtonIcon ${
          userLocation === null ? 'text-primary/30' : ''
        }`}
      />
    </button>
  )
}

export default LocateButton
