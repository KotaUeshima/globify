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

interface UserInterface {
  id: number
  email: string
  firstName: string
  lastName: string
}

interface BackendResponseUser {
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
  }
  jwt: string
}

interface LoginUser {
  email: string
  password: string
}

interface LoginError {
  email: string
  password: string
}

interface LoginBackendError {
  error: string
}

interface SignUpUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface SignUpError {
  firstName: string[]
  lastName: string[]
  email: string[]
  password: string[]
}

interface SignUpBackendError {
  errors: string[]
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
