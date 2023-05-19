export interface Location {
  lat: number
  lng: number
}

export interface ChangeCenterProps {
  changeCenter: (newCenter: Location, zoom: number) => void
  center?: Location
}
