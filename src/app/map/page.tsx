'use client'
import AddButton from '@/src/components/map/buttons/AddButton'
import HomeButton from '@/src/components/map/buttons/HomeButton'
import LocateButton from '@/src/components/map/buttons/LocateButton'
import ShuffleButton from '@/src/components/map/buttons/ShuffleButton'
import AddSongModal from '@/src/components/map/modal/AddSongModal'
import PlacesSearchBar from '@/src/components/map/searchBar/PlacesSearchBar'
import { BACKEND_URL } from '@/src/utils/constants'

import { GoogleMap, useLoadScript } from '@react-google-maps/api'

// import { GoogleMapsOverlay } from '@deck.gl/google-maps/typed'
// import { ScatterplotLayer } from 'deck.gl/typed'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppSelector } from '../../redux/store'

function page() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
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
  const onLoad = useCallback<CallBackType>(
    map => (mapRef.current = map),
    []
  )

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [songs, setSongs] = useState<Song[]>([])

  console.log(songs)

  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch(`${BACKEND_URL}/songs`)
      const data: Song[] = await response.json()
      setSongs(data)
    }

    getSongs()
  }, [])

  const changeCenter = (newCenter: MapLocation, zoom: number) => {
    mapRef.current?.panTo(newCenter)
    mapRef.current?.setZoom(zoom)
  }

  // function waitForElement() {
  //   if (typeof mapRef.current !== 'undefined') {
  //     constructOverlay()
  //   } else {
  //     setTimeout(waitForElement, 250)
  //   }
  // }
  // waitForElement()
  // function constructOverlay() {
  //   const scatter = () =>
  //     new ScatterplotLayer({
  //       id: 'scatter',
  //       data: songs,
  //       getPosition: d => [d.lng, d.lat],
  //       getFillColor: () => [255, 56, 92],
  //       getLineColor: () => [255, 56, 92],
  //       pickable: true,
  //       opacity: 0.8,
  //       stroked: true,
  //       filled: true,
  //       radiusUnit: 'common',
  //       radiusScale: 400,
  //       radiusMinPixels: 1,
  //       radiusMaxPixels: 15,
  //       // onClick: ({ object }) => {
  //       //   setSelectedIcon(object)
  //       // },
  //     })
  //   // const hexagon = () =>
  //   //   new HexagonLayer({
  //   //     id: "hex",
  //   //     data: songs,
  //   //     getPosition: (d) => [d.lng, d.lat],
  //   //     getElevationWeight: (d) => d.lat,
  //   //     elevationScale: 100,
  //   //   });
  //   // const heatmap = () =>
  //   //   new HeatmapLayer({
  //   //     id: "heatmap",
  //   //     data: songs,
  //   //     getPosition: (d) => [d.lng, d.lat],
  //   //     radiusPixels: 60,
  //   //   });
  //   const overlay = new GoogleMapsOverlay({
  //     layers: [scatter()],
  //   })
  //   overlay.setMap(mapRef.current)
  // }

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
              mapId: 'a13741fdb83a0364',
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
