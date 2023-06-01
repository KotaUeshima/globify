'use client'
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
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer'
import { Wrapper } from '@googlemaps/react-wrapper'
import { useLoadScript, GoogleMap } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  disableDefaultUI: true,
  clickableIcons: false,
  minZoom: 3,
  maxZoom: 18,
}

const libraries: any = ['places', 'marker']

type CallBackType = (map: google.maps.Map | null) => void

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  })

  const user: UserInterface = useAppSelector(state => state.user)
  const isLoggedIn: boolean = user.username !== ''

  // useMemo only reruns based on dependencies
  const center = useMemo<MapLocation>(
    () => ({ lat: 39.8283, lng: -98.5795 }),
    []
  )
  // useRef allows you to persist values between renders
  const mapRef = useRef<google.maps.Map | null>()
  // useCallback is same as useMemo but for functions
  const onLoad = useCallback<CallBackType>(map => {
    mapRef.current = map
  }, [])

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

  // add markers after songs have been intiialized from backend
  useEffect(() => {
    if (songs.length > 0) {
      addMarkers(mapRef.current)
    }
  }, [songs])

  const changeCenter = (newCenter: MapLocation, zoom: number) => {
    mapRef.current?.panTo(newCenter)
    mapRef.current?.setZoom(zoom)
  }

  const addMarkers = (map: any) => {
    const infoWindow = new google.maps.InfoWindow()

    const markers = songs.map(song => {
      const marker = new google.maps.Marker({
        position: { lat: song.lat, lng: song.lng },
      })
      marker.addListener('click', () => {
        const position = new google.maps.LatLng(song.lat, song.lng)
        setSelectedMarker(song)
        changeCenter({ lat: song.lat, lng: song.lng }, zoomLevel.CLOSE)
      })
      return marker
    })

    new MarkerClusterer({
      markers,
      map,
      algorithm: new SuperClusterAlgorithm({ radius: 200 }),
    })
  }

  return (
    <div className='h-full w-screen'>
      {/* Loading Screen */}
      {!isLoaded ? (
        <h1>Loading...</h1>
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
            <AdvancedMarkers mapRef={mapRef} />
          </GoogleMap>
          {/* <Wrapper
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            version='beta'
            libraries={['places', 'marker']}
          ></Wrapper> */}
        </div>
      )}
    </div>
  )
}

export default Map

function MyMap() {}

const testData = [
  {
    id: 1,
    lat: 24,
    lng: 36,
  },
  {
    id: 2,
    lat: 34,
    lng: 36,
  },
  {
    id: 3,
    lat: 55,
    lng: 36,
  },
]

function AdvancedMarkers({ mapRef }: any) {
  return (
    <>
      {testData.map(({ id, lat, lng }) => {
        return (
          <Marker
            key={id}
            mapRef={mapRef}
            position={{ lat: lat, lng: lng }}
          >
            <div className='h-32 w-32 bg-pink-500'>
              <h2>Hello Test</h2>
            </div>
          </Marker>
        )
      })}
    </>
  )
}

function Marker({ mapRef, children, position }: any) {
  const markerRef = useRef<any>()
  const rootRef = useRef<any>()

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement('div')
      rootRef.current = createRoot(container)

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: container,
      })
    }
  }, [])

  useEffect(() => {
    rootRef.current.render(children)
    markerRef.current.position = position
    mapRef.current.map = mapRef
  }, [mapRef, children, position])

  return <div></div>
}
