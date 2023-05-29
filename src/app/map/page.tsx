'use client'
import AddButton from '@/src/components/map/buttons/AddButton'
import HomeButton from '@/src/components/map/buttons/HomeButton'
import LocateButton from '@/src/components/map/buttons/LocateButton'
import ShuffleButton from '@/src/components/map/buttons/ShuffleButton'
import AddSongModal from '@/src/components/map/modal/AddSongModal'
import PlacesSearchBar from '@/src/components/map/searchBar/PlacesSearchBar'
import { BACKEND_URL } from '@/src/utils/constants'
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppSelector } from '../../redux/store'

const mapOptions = {
  mapId: 'a13741fdb83a0364',
  disableDefaultUI: true,
  clickableIcons: false,
  minZoom: 3,
  maxZoom: 18,
}
const libraries: any = ['places']

function page() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  })

  const user = useAppSelector(state => state.user)
  console.log(user)

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
        infoWindow.setPosition(position)
        infoWindow.setContent(`
          <div className="flex flex-col">
            <div class="p-4 flex flex-row globalRounded bg-secondary">
              <img src=${song.image_url} alt="song-picture" class="w-16 globalRounded" />
              <div class='ml-4 flex flex-col mr-4'>
                <h2 class='text-xl font-thin'>${song.title}</h2>
                <p class='text-base text-gray-400'>by ${song.artist}</p>
              </div>
            </div>
            <iframe src=${song.spotify_url} width="100%" height="30%" title="spotify-song" allowfullscreen='true'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' >
            </iframe>
          </div>
        `)
        infoWindow.open({ map })
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
    <div className=''>
      {/* Loading Screen */}
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {/* Button Group */}
          <div className='z-10 absolute top-20 left-5 flex flex-row space-x-2'>
            <HomeButton center={center} changeCenter={changeCenter} />
            <LocateButton
              changeCenter={changeCenter}
              userLocation={userLocation}
            />
            <ShuffleButton />
            <AddButton setModalOpen={setModalOpen} />
          </div>
          {/* Modal for Adding Song */}
          {modalOpen && (
            <AddSongModal
              setModalOpen={setModalOpen}
              userLocation={userLocation}
            />
          )}
          {/* Search Bar */}
          <div className='z-10 absolute top-20 left-[40vw]'>
            <PlacesSearchBar changeCenter={changeCenter} />
          </div>
          {/* Actual Map */}
          <GoogleMap
            mapContainerClassName='h-screen w-screen'
            center={center}
            zoom={5}
            onLoad={onLoad}
            options={mapOptions}
          ></GoogleMap>
        </>
      )}
    </div>
  )
}

export default page
