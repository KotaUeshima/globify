import { MapPinIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

function LocateButton({ changeCenter }: ChangeCenterProps) {
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false)

  const findUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat: number = position.coords.latitude
        const lng: number = position.coords.longitude
        changeCenter({ lat, lng }, 14)
      },
      () => null
    )
  }

  return (
    <button className='mapButton' onClick={findUserLocation}>
      <MapPinIcon className='mapButtonIcon' />
    </button>
  )
}

export default LocateButton
