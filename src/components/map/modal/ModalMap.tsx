import { zoomLevel } from '@/src/utils/constants'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const libraries: any = ['places']
const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  disableDefaultUI: true,
  clickableIcons: false,
  gestureHandling: 'none',
}

interface ModalMapProps {
  userLocation: MapLocation | null
}

function ModalMap({ userLocation }: ModalMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  })

  if (!userLocation) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName='mt-2 h-[20vh] globalRounded'
          center={userLocation}
          zoom={zoomLevel.SUPER_CLOSE}
          options={mapOptions}
        >
          <Marker position={userLocation} />
        </GoogleMap>
      )}
    </div>
  )
}

export default ModalMap
