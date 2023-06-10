interface MapLocation {
  lat: number
  lng: number
}

interface ChangeCenterProps {
  changeCenter: (newCenter: MapLocation, zoom: number) => void
  center?: MapLocation
}
