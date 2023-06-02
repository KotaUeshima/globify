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

const center: MapLocation = { lat: 39.8283, lng: -98.5795 }

type CallBackType = (map: google.maps.Map | null) => void

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  })

  const user: UserInterface = useAppSelector(state => state.user)
  const isLoggedIn: boolean = user.username !== ''

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

  const changeCenter = (newCenter: MapLocation, zoom: number) => {
    mapRef?.panTo(newCenter)
    mapRef?.setZoom(zoom)
  }

  return (
    <div className='h-full w-screen'>
      {/* Loading Screen */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className='flex flex-row'>
          {/* Main Menu */}
          <div className='h-[90vh] w-1/4 flex flex-col'>
            {/* Search Bar */}
            <div className='h-1/6 w-full flex justify-center items-center'>
              <PlacesSearchBar changeCenter={changeCenter} />
            </div>
            {/* Button Group */}
            <div className='h-1/4 w-3/4 mx-auto flex flex-col'>
              <div className='h-full w-full flex flex-row justify-center items-center space-x-2'>
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
            mapContainerClassName='h-[90vh] w-3/4'
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

  console.log('Advanced Markers Map >>>', map)

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
              className={`bg-secondary globalRounded ${
                highlight === song.id
                  ? 'scale-150 globalTransition'
                  : 'scale-100 globalTransition'
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
                className='w-10 globalRounded'
              />
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
