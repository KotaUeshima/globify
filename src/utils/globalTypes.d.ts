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
