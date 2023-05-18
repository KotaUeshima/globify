'use client'
import Locate from '@/components/map/Locate'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { useCallback, useMemo, useRef } from 'react'

function page() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })

  interface Location {
    lat: number
    lng: number
  }

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

  const changeCenter = (newCenter: Location) => {
    mapRef.current?.panTo(newCenter)
    mapRef.current?.setZoom(14)
  }

  return (
    <div className='App'>
      {/* Loading Screen */}
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Locate />
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
