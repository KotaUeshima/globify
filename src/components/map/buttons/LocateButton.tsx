import { MapPinIcon } from '@heroicons/react/24/solid'
import Spinner from '../../Spinner'

interface LocateButtonProps extends ChangeCenterProps {
  userLocation: MapLocation | null
}

function LocateButton({ changeCenter, userLocation }: LocateButtonProps) {
  const findUserLocation = () => {
    if (userLocation) {
      changeCenter(userLocation, 14)
    }
  }

  return (
    <button className='mapButton' onClick={findUserLocation}>
      {userLocation ? (
        <MapPinIcon className='mapButtonIcon' />
      ) : (
        <Spinner />
      )}
    </button>
  )
}

export default LocateButton
