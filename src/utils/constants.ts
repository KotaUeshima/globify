export const routeNames = {
  HOME: '/',
  LOGIN: '/login',
  MAP: '/map',
  SIGNUP: '/signup',
}

export const zoomLevel = {
  SUPER_CLOSE: 18,
  CLOSE: 14,
  HOME: 5,
}

let BACKEND_URL: string
// local endpoint
if (process.env.NODE_ENV === 'development') {
  BACKEND_URL = 'http://127.0.0.1:3000'
}
// production endpoint
else {
  BACKEND_URL = 'https://globify-backend.onrender.com'
}

export { BACKEND_URL }
