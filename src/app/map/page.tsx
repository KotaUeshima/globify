'use client'
import LoadingScreen from '@/src/components/loaders/LoadingScreen'
import SelectedSongPlayer from '@/src/components/map/SelectedSongPlayer'
import AddButton from '@/src/components/map/buttons/AddButton'
import HomeButton from '@/src/components/map/buttons/HomeButton'
import LocateButton from '@/src/components/map/buttons/LocateButton'
import ShuffleButton from '@/src/components/map/buttons/ShuffleButton'
import AddSongModal from '@/src/components/map/modal/AddSongModal'
import PlacesSearchBar from '@/src/components/map/searchBar/PlacesSearchBar'
import Sidebar from '@/src/components/map/sidebar/Sidebar'
import { useAppSelector } from '@/src/redux/store'
import { BACKEND_URL, zoomLevel } from '@/src/utils/constants'
import timeout from '@/src/utils/functions/timeout'
import useAuthorization from '@/src/utils/hooks/useAuthorization'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import {
  Dispatch,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createRoot } from 'react-dom/client'

const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  disableDefaultUI: true,
  clickableIcons: false,
  minZoom: 3,
  maxZoom: 18,
}

const libraries: any = ['marker', 'places']

const center: MapLocation = { lat: 20, lng: 0 }

type CallBackType = (map: google.maps.Map | null) => void

function Map() {
  useAuthorization()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  })

  const user: UserInterface = useAppSelector(state => state.user)
  const isLoggedIn: boolean = user.email !== ''

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [songs, setSongs] = useState<Song[]>([])
  const [userLocation, setUserLocation] = useState<MapLocation | null>(
    null
  )
  const [selectedMarker, setSelectedMarker] = useState<Song | null>(null)

  // retrieve all songs and data of user's location
  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch(`${BACKEND_URL}/songs`)
      const data: Song[] = await response.json()
      setSongs(data)
    }

    const findUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat: number = position.coords.latitude
          const lng: number = position.coords.longitude
          setUserLocation({ lat, lng })
        },
        () => null
      )
    }

    getSongs()
    findUserLocation()
  }, [])

  // useRef allows you to persist values between renders
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null)
  const onLoad = useCallback<CallBackType>(map => {
    setMapRef(map)
  }, [])

  // load page once songs, location, and map have all been intialized
  const loading = useMemo<boolean>(() => {
    return !isLoaded || songs.length === 0 || userLocation === null
  }, [isLoaded, songs, userLocation])

  const changeCenter = async (newCenter: MapLocation, newZoom: number) => {
    if (mapRef) {
      const currentZoom = mapRef.getZoom()!
      const currentCenter = mapRef.getCenter()
      let currentLat = currentCenter?.lat()!
      let currentLng = currentCenter?.lng()!
      const newLat = newCenter.lat
      const newLng = newCenter.lng

      console.log('Current Lat >>>', currentLat)
      console.log('Current Lng >>>', currentLng)
      console.log('New Lat >>>', newLat)
      console.log('New Lng >>>', newLng)

      const latDiff = newLat - currentLat
      const lngDiff = newLng - currentLng
      let zoomDiff = Math.abs(currentZoom - newZoom)

      console.log('Old Zoom >>>', currentZoom)
      console.log('New Zoom >>>', newZoom)
      console.log('Zoom Diff >>>', zoomDiff)
      // if no zooming assign to arbitrary value
      if (zoomDiff === 0) zoomDiff = 6
      const latIncrement = latDiff / (zoomDiff + 1)
      const lngIncrement = lngDiff / (zoomDiff + 1)

      // zooming in
      if (currentZoom < newZoom) {
        for (let i = currentZoom; i <= newZoom; i++) {
          await timeout(25)
          currentLat += latIncrement
          currentLng += lngIncrement
          console.log('currentLat >>>', currentLat)
          console.log('currentLng >>>', currentLng)
          mapRef.panTo({ lat: currentLat, lng: currentLng })
        }
        for (let i = currentZoom; i <= newZoom; i++) {
          await timeout(50)
          console.log('zoom >>>', i)
          mapRef.setZoom(i)
        }
        mapRef.setZoom(newZoom)
      }
      // zooming out
      else if (currentZoom > newZoom) {
        for (let i = currentZoom; i >= newZoom; i--) {
          await timeout(50)
          console.log('zoom >>>', i)
          mapRef.setZoom(i)
        }
        mapRef.setZoom(newZoom)
        for (let i = currentZoom; i >= newZoom; i--) {
          await timeout(25)
          currentLat += latIncrement
          currentLng += lngIncrement
          console.log('currentLat >>>', currentLat)
          console.log('currentLng >>>', currentLng)
          mapRef.panTo({ lat: currentLat, lng: currentLng })
        }
      }
      // no zooming
      else {
        for (let i = 0; i < zoomDiff; i++) {
          await timeout(25)
          currentLat += latIncrement
          currentLng += lngIncrement
          mapRef.panTo({ lat: currentLat, lng: currentLng })
        }
      }
    }
  }

  return (
    <div className='h-[90vh] w-screen'>
      {/* Loading Screen */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className='flex flex-row'>
          {/* Main Menu */}
          <div className='bg-secondary h-[700px] w-[500px] flex flex-col overflow-auto'>
            {/* Search Bar */}
            <div className='h-[10%] w-full flex justify-center items-center'>
              <PlacesSearchBar changeCenter={changeCenter} />
            </div>
            {/* Button Group */}
            <div className='h-1/4 w-3/4 mx-auto flex flex-col'>
              <div className='h-full w-full flex flex-row justify-center items-end space-x-2'>
                <HomeButton center={center} changeCenter={changeCenter} />
                <LocateButton
                  changeCenter={changeCenter}
                  userLocation={userLocation}
                />
              </div>
              <div className='h-full w-full flex flex-row justify-center items-center space-x-2'>
                <ShuffleButton />
                <AddButton setModalOpen={setModalOpen} />
              </div>
            </div>
            {/* Modal for Adding Song */}
            {modalOpen && (
              <AddSongModal
                setModalOpen={setModalOpen}
                userLocation={userLocation}
              />
            )}
            {/* Selected Song */}
            <div className='mt-10 h-1/2 w-full flex justify-center'>
              <SelectedSongPlayer selectedMarker={selectedMarker} />
            </div>
          </div>
          {/* Side Bar for User */}
          {isLoggedIn && <Sidebar changeCenter={changeCenter} />}
          {/* Actual Map */}
          <GoogleMap
            mapContainerClassName='h-[90vh] w-full'
            center={center}
            zoom={zoomLevel.HOME}
            onLoad={onLoad}
            options={mapOptions}
          >
            <AdvancedMarkers
              map={mapRef}
              songs={songs}
              setSelectedMarker={setSelectedMarker}
              changeCenter={changeCenter}
            />
          </GoogleMap>
        </div>
      )}
    </div>
  )
}

export default Map

interface AdvancedMarkersProps extends ChangeCenterProps {
  map: google.maps.Map | null | undefined
  songs: Song[]
  setSelectedMarker: Dispatch<Song>
}

function AdvancedMarkers({
  map,
  songs,
  setSelectedMarker,
  changeCenter,
}: AdvancedMarkersProps) {
  const [highlight, setHighlight] = useState<number>(0)

  return (
    <>
      {songs.map(song => {
        return (
          <Marker
            key={song.id}
            map={map}
            position={{ lat: song.lat, lng: song.lng }}
          >
            <div
              className={`bg-secondary flex flex-row globalRounded globalTransition ${
                highlight === song.id ? 'scale-110' : 'scale-100'
              }`}
              onMouseEnter={() => setHighlight(song.id)}
              onMouseLeave={() => setHighlight(0)}
              onClick={() => {
                setSelectedMarker(song)
                changeCenter(
                  { lat: song.lat, lng: song.lng },
                  zoomLevel.CLOSE
                )
              }}
            >
              <img
                src={song.image_url}
                alt='album-cover'
                className='w-12 p-1 globalRounded'
              />
              <p className='text-xs text-gray-300 p-1 h-10 w-10 overflow-hidden'>
                {song.title}
              </p>
            </div>
          </Marker>
        )
      })}
    </>
  )
}

function Marker({ map, children, position }: any) {
  const rootRef = useRef<any>()
  const markerRef = useRef<any>()

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement('div')
      rootRef.current = createRoot(container)

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: container,
        collisionBehavior:
          google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
      })
      markerRef.current.addListener('click', () => {})
    }
  }, [])

  useEffect(() => {
    rootRef.current.render(children)
    markerRef.current.position = position
    markerRef.current.map = map
  }, [map, children, position])

  return <></>
}
