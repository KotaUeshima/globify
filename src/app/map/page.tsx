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

type testType = [string, number, number]
const test: testType[] = [
  ['Ash, green', 43.6495364521731, -79.41618733111581],
  ['Birch, white', 43.8037189558964, -79.3545349538418],
  ['Maple, Manitoba', 43.6776251576906, -79.2760802497644],
  ["Elm, American 'Valley Forge'", 43.7436916067803, -79.4252057780298],
  ['Spruce, Colorado blue', 43.733888921533, -79.3153757933933],
  ["Maple, Norway 'Schwedler'", 43.7132521970695, -79.5517852249759],
  ['Mulberry, white', 43.7582445715909, -79.37784831953951],
  ['Elm, Siberian', 43.6924692344483, -79.4792948383182],
  ['Kentucky coffee', 43.7579181701515, -79.5695018286236],
  ['Katsura, Japanese', 43.646809759809, -79.45258974840542],
  ['Elm, American', 43.73559764660771, -79.4000834768246],
  ['Maple, Norway', 43.6717940983563, -79.28312281638772],
  ['Oak, white', 43.705484262474, -79.5178284396172],
  ["Honey locust, 'Skyline'", 43.6616682848291, -79.5697277859886],
  ['Cherry', 43.6578167708639, -79.4086318314847],
  ['Maple, Norway', 43.6883787435373, -79.3893018520844],
  ['Hackberry', 43.7485008346161, -79.5058922971026],
  ['Ash, green', 43.722746664264, -79.400487544538],
  ['Mulberry, white', 43.7342135671476, -79.5968805552278],
  ['Apple, Sargents', 43.8106268773258, -79.3319713375323],
  ['Mountain ash, European', 43.712975180742006, -79.4373323647695],
  ['Oak, white', 43.664408490826204, -79.3626753680659],
  ['Tulip tree', 43.7812305314965, -79.2710871514678],
  ["Honey locust, 'Shade master'", 43.7592381597255, -79.5722863928079],
  ['Hackberry', 43.8073491130473, -79.2038222861175],
  ["Pear, 'Chanticleer'", 43.6647057558909, -79.3790627447708],
  ['Oak, red', 43.77453255105231, -79.4338931772356],
  ['Cedar, white', 43.6781738193197, -79.3864692834068],
  ['Tulip tree', 43.7148630054084, -79.4343953600155],
  ['Spruce, Colorado blue', 43.7719556872452, -79.3500218471301],
  ['Planetree, London', 43.6387637339772, -79.3995620922805],
  ['Honey locust', 43.6516904492866, -79.4093552753714],
  ["Maple, Norway 'Crimson King'", 43.5978483612791, -79.5078643384629],
  ['Ginkgo', 43.6299814906493, -79.5099558955117],
  ['Maple, red', 43.7173469217039, -79.3587743995269],
  ['Falsecypress, Japanese', 43.7200005021239, -79.2593218633868],
  ['Zelkova', 43.7962957324859, -79.329843679834],
  ['Elm', 43.7301841810056, -79.3384791801388],
  ['Maple, Norway', 43.7589777636932, -79.4152638879444],
  ['Honey locust', 43.6331388006356, -79.5649721525678],
  ['Buckeye, yellow', 43.7526866700941, -79.4655375260912],
  ['Maple, Norway', 43.78328779108201, -79.4239133862924],
  ['Maple, Manitoba', 43.6919536704695, -79.4464216981582],
  ['Oak, swamp white', 43.7619106726272, -79.5757375273133],
  ['Black locust', 43.72602704309521, -79.5855444740674],
  ['Tulip tree', 43.7942469315193, -79.3190326311135],
  ["Honey locust, 'Skyline'", 43.7428001588964, -79.23709051471421],
  ['Maple, Norway', 43.7331296117775, -79.2153660990838],
  ['Mountain ash, oak leaf', 43.7827502160707, -79.313743960998],
  ['Cedar, white', 43.6921376084812, -79.4492140695791],
  ['Tulip tree', 43.8118066365881, -79.3210677889654],
  ["Oak, English 'pyramidal'", 43.68201075237711, -79.4311325007295],
  ['Juniper', 43.7502175574651, -79.3957930283471],
  ['Ginkgo', 43.7310019351549, -79.4832404004807],
  ["Pear, 'Chanticleer'", 43.6507919422907, -79.3933534525317],
  ['Spruce, Colorado blue', 43.7918648024756, -79.3846081284106],
  ['Dogwood', 43.797754439402, -79.1786065495489],
  ['Maple, Amur', 43.6931967602928, -79.2869333076631],
  ['Apple, Sargents', 43.68230711598051, -79.3731338400423],
  ['Honey locust', 43.7963887264434, -79.2932193853298],
  ['Maple, silver', 43.7565836186769, -79.2603387690994],
  ['Pine, Eastern white', 43.6582513669203, -79.53365242523],
  ['Maple, Norway', 43.68390446318741, -79.2988437639336],
  ['Spruce, Norway', 43.7675433437387, -79.4326654232475],
  ['Spruce, Colorado blue', 43.6915075547447, -79.304846161499],
  ['Linden, Littleleaf', 43.7376347393301, -79.2077817163365],
  ['Maple, silver', 43.7023799418267, -79.2620188694816],
  ['Maple, Norway', 43.7168807691702, -79.2480485474817],
  ['Oak, black', 43.6449324276165, -79.4565831357601],
  ['Kentucky coffee', 43.6953198112604, -79.5312661858541],
  ["Maple, Norway 'Schwedler'", 43.7660683875586, -79.3921013943526],
  ['Basswood, American', 43.7000269628548, -79.383619275134],
  ['Linden, Littleleaf', 43.7585042269824, -79.2647614023704],
  ['Pine, Eastern white', 43.7357274831986, -79.3721200720674],
  ['Ginkgo', 43.7391670113917, -79.57447507723181],
  ['Serviceberry', 43.66349901093421, -79.3434769340964],
  ['Catalpa, Northern', 43.7957538895177, -79.31145845711072],
  ['Spruce, Colorado blue', 43.7289355872617, -79.4636196997321],
  ['Katsura, Japanese', 43.6890298104317, -79.414246439573],
  ['Beech, European', 43.8097307321679, -79.32539344651582],
  ["Maple, Norway 'Schwedler'", 43.7452701076119, -79.3669945521526],
  ["Pear, 'Bradford'", 43.6825253645841, -79.5628720995063],
  ['Oak, red', 43.6843923955687, -79.3102399648695],
  ['Elm', 43.699307091522805, -79.4304260872651],
  ['Oak, red', 43.6591961420628, -79.4656603389439],
  ['Basswood, Redmond', 43.7444089126836, -79.2305101826917],
  ['Honey locust', 43.7674563596111, -79.5201922121088],
  ['Honey locust', 43.6618041012042, -79.3846268719287],
  ["Maple, Freeman 'Autumn Blaze'", 43.7277662389618, -79.3961422834656],
  ['Maple, Norway', 43.7164991503838, -79.5448170660847],
  ['Juniper', 43.691733447249, -79.3164169694181],
  ['Spruce, Serbian', 43.7533420276034, -79.3901603027176],
  ['Cherry', 43.5970402769127, -79.5449521649403],
  ['Apple, Sargents', 43.7802885339011, -79.3555596514614],
  ['Ash, green', 43.6621437928584, -79.3134793798852],
  ['Hackberry', 43.6760120601242, -79.5535523218463],
  ['Ginkgo', 43.6180695814372, -79.5389025087437],
  ['Maple, silver', 43.6601912164234, -79.3702164030015],
  ["Maple, Freeman 'Autumn Blaze'", 43.6917923569989, -79.5421687628705],
  ['Catalpa, Northern', 43.7144915843843, -79.2925346667985],
  ['Basswood, Redmond', 43.7809442216744, -79.1346360912975],
  ['Linden', 43.6890051512851, -79.5458592954787],
]

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

  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch(`${BACKEND_URL}/songs`)
      const data: Song[] = await response.json()
      setSongs(data)
      addMarkers(mapRef.current)
    }

    getSongs()
  }, [])

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
          <div className="h-10 w-10 bg-blue-500">
            <h2>Test</h2>
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
            options={mapOptions}
          ></GoogleMap>
        </>
      )}
    </div>
  )
}

export default page
