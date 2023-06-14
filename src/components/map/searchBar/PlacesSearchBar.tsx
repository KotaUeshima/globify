import { zoomLevel } from '@/src/utils/constants'
import { usePlacesWidget } from 'react-google-autocomplete'

function PlacesSearchBar({ changeCenter }: ChangeCenterProps) {
  const { ref }: { ref: any } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    onPlaceSelected: place => {
      const lat = place?.geometry?.location?.lat()
      const lng = place?.geometry?.location?.lng()
      console.log('Finding place')
      // check to make sure lat and lng are not undefined
      if (lat && lng) {
        changeCenter({ lat, lng }, zoomLevel.CLOSE)
      }
    },
  })

  return (
    // <Autocomplete
    //   apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
    //   onPlaceSelected={place => {
    //     const lat = place?.geometry?.location?.lat()
    //     const lng = place?.geometry?.location?.lng()
    //     console.log('Lat', lat)
    //     console.log('Lng', lng)
    //     // check to make sure lat and lng are not undefined
    //     if (lat && lng) {
    //       changeCenter({ lat, lng }, zoomLevel.CLOSE)
    //     }
    //   }}
    //   options={{
    //     types: ['(regions)'],
    //   }}
    //   className='py-2 w-3/4 md:px-6 lg:px-8 bg-primary border-2 text-large font-light tracking-wider text-secondary placeholder:text-secondary globalRounded focus:outline-none'
    // />
    <input
      ref={ref}
      className='py-2 w-3/4 md:px-6 lg:px-8 bg-primary border-2 text-large font-light tracking-wider text-secondary placeholder:text-secondary globalRounded focus:outline-none'
    />
  )
}

export default PlacesSearchBar
