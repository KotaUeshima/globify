import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const libraries: any = ['places']
const mapOptions = {
  mapId: 'a13741fdb83a0364',
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
          zoom={18}
          options={mapOptions}
        >
          <Marker position={userLocation} />
        </GoogleMap>
      )}
    </div>
  )
}

export default ModalMap
