'use client'
import PlacesSearchBar from '@/components/map/searchBar/PlacesSearchBar'
import AddButton from '@/components/map/buttons/AddButton'
import HomeButton from '@/components/map/buttons/HomeButton'
import LocateButton from '@/components/map/buttons/LocateButton'
import ShuffleButton from '@/components/map/buttons/ShuffleButton'
import AddSongModal from '@/components/map/modal/AddSongModal'
import { Location } from '@/utils/globalInterfaces'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { useCallback, useMemo, useRef, useState } from 'react'

function page() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })

  // should find type for map, there is a library for types
  type CallBackType = (map: any) => void

  // useMemo optimizes performance, returns memoized value, only reruns based on dependencies
  const center = useMemo<Location>(
    () => ({ lat: 39.8283, lng: -98.5795 }),
    []
  )

  // useRef allows you to persist values between renders
  // useCallback returns memoized function
  const mapRef = useRef<any>(/** @type google.maps.GoogleMap */)
  const onLoad = useCallback<CallBackType>(
    map => (mapRef.current = map),
    []
  )

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const changeCenter = (newCenter: Location, zoom: number) => {
    mapRef.current?.panTo(newCenter)
    mapRef.current?.setZoom(zoom)
  }

  return (
    <div className='App'>
      {/* Loading Screen */}
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {/* Button Group */}
          <div className='z-10 absolute top-20 left-5 flex flex-row space-x-2'>
            <HomeButton center={center} changeCenter={changeCenter} />
            <LocateButton changeCenter={changeCenter} />
            <ShuffleButton />
            <AddButton setModalOpen={setModalOpen} />
            {modalOpen && <AddSongModal setModalOpen={setModalOpen} />}
          </div>
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
            options={{
              mapId: '2f1759f08238137f',
              disableDefaultUI: true,
              clickableIcons: false,
              minZoom: 3,
              maxZoom: 18,
            }}
          ></GoogleMap>
        </>
      )}
    </div>
  )
}

export default page
