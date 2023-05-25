import { ChangeCenterProps } from '@/utils/globalInterfaces'
import Autocomplete from 'react-google-autocomplete'

function PlacesSearchBar({ changeCenter }: ChangeCenterProps) {
  return (
    <div>
      <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        onPlaceSelected={place => {
          const lat = place?.geometry?.location?.lat()
          const lng = place?.geometry?.location?.lng()
          // check to make sure lat and lng are not undefined
          if (lat && lng) {
            changeCenter({ lat, lng }, 14)
          }
        }}
        className='py-2 px-6 text-black border-2 text-large focus:outline-none'
      />
    </div>
  )
}

export default PlacesSearchBar
