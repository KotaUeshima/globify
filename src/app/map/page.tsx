'use client'
import LoadingScreen from '@/src/components/loaders/LoadingScreen'
import AddButton from '@/src/components/map/buttons/AddButton'
import HomeButton from '@/src/components/map/buttons/HomeButton'
import LocateButton from '@/src/components/map/buttons/LocateButton'
import ShuffleButton from '@/src/components/map/buttons/ShuffleButton'
import AddSongModal from '@/src/components/map/modal/AddSongModal'
import PlacesSearchBar from '@/src/components/map/searchBar/PlacesSearchBar'
import Sidebar from '@/src/components/map/sidebar/Sidebar'
import SelectedSongPlayer from '@/src/components/map/songplayer/SelectedSongPlayer'
import { useAppSelector } from '@/src/redux/store'
import { BACKEND_URL, zoomLevel } from '@/src/utils/constants'
import timeout from '@/src/utils/functions/timeout'
import useAuthorization from '@/src/utils/hooks/useAuthorization'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
    return !isLoaded || songs.length === 0
  }, [isLoaded, songs])

  console.log('isLoaded >>>', isLoaded)
  console.log('Song Length >>>', songs.length)

  const changeCenter = async (newCenter: MapLocation, newZoom: number) => {
    if (mapRef) {
      const currentZoom = mapRef.getZoom()!
      const currentCenter = mapRef.getCenter()
      let currentLat = currentCenter?.lat()!
      let currentLng = currentCenter?.lng()!
      const newLat = newCenter.lat
      const newLng = newCenter.lng

      const latDiff = newLat - currentLat
      const lngDiff = newLng - currentLng
      let zoomDiff = Math.abs(currentZoom - newZoom)

      // if no zooming assign to arbitrary value
      if (zoomDiff === 0) zoomDiff = 6
      const latIncrement = latDiff / (zoomDiff + 1)
      const lngIncrement = lngDiff / (zoomDiff + 1)

      // zooming in
      if (currentZoom < newZoom) {
        for (let i = currentZoom; i <= newZoom; i++) {
          await timeout(50)
          currentLat += latIncrement
          currentLng += lngIncrement
          mapRef.panTo({ lat: currentLat, lng: currentLng })
        }
        mapRef.panTo({ lat: newLat, lng: newLng })
        for (let i = currentZoom; i <= newZoom; i++) {
          await timeout(50)
          mapRef.setZoom(i)
        }
        mapRef.setZoom(newZoom)
      }
      // zooming out
      else if (currentZoom > newZoom) {
        for (let i = currentZoom; i >= newZoom; i--) {
          await timeout(50)
          mapRef.setZoom(i)
        }
        mapRef.setZoom(newZoom)
        for (let i = currentZoom; i >= newZoom; i--) {
          await timeout(50)
          currentLat += latIncrement
          currentLng += lngIncrement
          mapRef.panTo({ lat: currentLat, lng: currentLng })
        }
        mapRef.panTo({ lat: newLat, lng: newLng })
      }
      // no zooming
      else {
        for (let i = 0; i < zoomDiff; i++) {
          await timeout(50)
          currentLat += latIncrement
          currentLng += lngIncrement
          mapRef.panTo({ lat: currentLat, lng: currentLng })
        }
        mapRef.panTo({ lat: newLat, lng: newLng })
      }
    }
  }

  const addSongLocally = (song: Song) => {
    const copySongs = [...songs]
    copySongs.push(song)
    setSongs(copySongs)
  }

  const selectAndGoToSong = (song: Song) => {
    setSelectedMarker(song)
    changeCenter({ lat: song.lat, lng: song.lng }, zoomLevel.CLOSE)
  }

  return (
    <div className='h-[90vh] w-screen overflow-x-hidden'>
      {/* Loading Screen */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className='flex flex-row'>
          {/* Main Menu */}
          <div className='bg-secondary h-[700px] xl:h-[90vh] w-[500px] flex flex-col overflow-auto'>
            {/* Search Bar */}
            <div className='relative h-[10%] w-full flex items-center'>
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
                <ShuffleButton
                  songs={songs}
                  selectAndGoToSong={selectAndGoToSong}
                />
                <AddButton setModalOpen={setModalOpen} />
              </div>
            </div>
            {/* Modal for Adding Song */}
            {modalOpen && (
              <AddSongModal
                setModalOpen={setModalOpen}
                userLocation={userLocation}
                addSongLocally={addSongLocally}
              />
            )}
            {/* Selected Song */}
            <div className='mt-10 h-1/2 w-full flex justify-center'>
              <SelectedSongPlayer selectedMarker={selectedMarker} />
            </div>
          </div>
          {/* Side Bar for User */}
          {isLoggedIn && (
            <Sidebar
              setSongs={setSongs}
              songs={songs}
              selectAndGoToSong={selectAndGoToSong}
            />
          )}
          {/* Actual Map */}
          <GoogleMap
            mapContainerClassName='h-[700px] xl:h-[90vh] w-full'
            center={center}
            zoom={zoomLevel.HOME}
            onLoad={onLoad}
            options={mapOptions}
          >
            <AdvancedMarkers
              map={mapRef}
              songs={songs}
              selectAndGoToSong={selectAndGoToSong}
            />
          </GoogleMap>
        </div>
      )}
    </div>
  )
}

export default Map

interface AdvancedMarkersProps {
  map: google.maps.Map | null | undefined
  songs: Song[]
  selectAndGoToSong: (song: Song) => void
}

function AdvancedMarkers({
  map,
  songs,
  selectAndGoToSong,
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className={`h-12 w-12 globalTransition ${
                highlight === song.id ? 'scale-110' : 'scale-100'
              }`}
              onClick={() => {
                selectAndGoToSong(song)
              }}
              onMouseEnter={() => setHighlight(song.id)}
              onMouseLeave={() => setHighlight(0)}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='#242528'
                d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='#fe7925'
                d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
              />
            </svg>
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
