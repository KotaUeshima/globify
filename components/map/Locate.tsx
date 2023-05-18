import { MapPinIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

function Locate() {
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false)

  const findUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat: number = position.coords.latitude
        const lng: number = position.coords.longitude
      },
      () => null
    )
  }

  return (
    <button
      className='absolute top-20 left-5 z-10 px-3 py-2 bg-primary globalRounded'
      onClick={findUserLocation}
    >
      <MapPinIcon className='h-6 w-6 text-white' />
    </button>
  )
}

export default Locate
