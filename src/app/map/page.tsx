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
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  disableDefaultUI: true,
  clickableIcons: false,
  minZoom: 3,
  maxZoom: 18,
}
const libraries: any = ['places', 'marker']

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  })

  const user: UserInterface = useAppSelector(state => state.user)
  const isLoggedIn: boolean = user.username !== ''

  // should find type for map, there is a library for types
  type CallBackType = (map: any) => void

  // useMemo only reruns based on dependencies
  const center = useMemo<MapLocation>(
    () => ({ lat: 39.8283, lng: -98.5795 }),
    []
  )
  // useRef allows you to persist values between renders
  const mapRef = useRef<any>(/** @type google.maps.GoogleMap */)
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
        // infoWindow.setPosition(position)
        // infoWindow.setContent(`
        //   <div className="flex flex-col">
        //     <div class="p-4 flex flex-row globalRounded bg-secondary">
        //       <img src=${song.image_url} alt="song-picture" class="w-16 globalRounded" />
        //       <div class='ml-4 flex flex-col mr-4'>
        //         <h2 class='text-xl font-thin'>${song.title}</h2>
        //         <p class='text-base text-gray-400'>by ${song.artist}</p>
        //       </div>
        //     </div>
        //     <iframe src=${song.spotify_url} width="100%" height="30%" title="spotify-song" allowfullscreen='true'
        //     allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' >
        //     </iframe>
        //   </div>
        // `)
        // infoWindow.open({ map })
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
            <div className='h-1/4 w-3/4 mx-auto flex flex-col justify-center items-center'>
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
          ></GoogleMap>
        </div>
      )}
    </div>
  )
}

export default Map
