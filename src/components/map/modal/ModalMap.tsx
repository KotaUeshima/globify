import { zoomLevel } from '@/src/utils/constants'
import { GoogleMap, Marker } from '@react-google-maps/api'

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
  if (!userLocation) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <GoogleMap
        mapContainerClassName='mt-2 h-[20vh] globalRounded'
        center={userLocation}
        zoom={zoomLevel.SUPER_CLOSE}
        options={mapOptions}
      >
        <Marker position={userLocation} />
      </GoogleMap>
    </div>
  )
}

export default ModalMap
