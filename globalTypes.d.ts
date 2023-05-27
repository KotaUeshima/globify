/*
    Typing for Map
*/

interface MapLocation {
  lat: number
  lng: number
}

interface ChangeCenterProps {
  changeCenter: (newCenter: MapLocation, zoom: number) => void
  center?: MapLocation
}

/*
    Typing for User and Backend Interaction
*/

interface BackendResponseUser {
  user: {
    id: number
    username: string
  }
  jwt: string
}

interface BackendError {
  error: string
}

/*
    Typing for Songs
*/

interface Song {
  id: number
  title: string
  artist: string
  image_url: string
  lat: number
  lng: number
  spotify_url: string
  user_id: string
  user: {
    id: number
    username: string
  }
}
