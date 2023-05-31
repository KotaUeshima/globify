import { zoomLevel } from '@/src/utils/constants'
import { MapPinIcon } from '@heroicons/react/24/solid'
import Spinner from '../../LoadingSpinner'

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
      {userLocation ? (
        <>
          <MapPinIcon className='mapButtonIcon' />
          <p className='mapButtonText'>My Location</p>
        </>
      ) : (
        <Spinner />
      )}
    </button>
  )
}

export default LocateButton
