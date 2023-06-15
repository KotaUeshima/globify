# Developer Documentation

## Setup

Start project on a personal port

```
npm run dev -- -p 8000
```

## React-Redux

- React-Redux is used in this application to manage state throughout
- Remember React-Redux is a client side application and Next.js is by default server side
- Currently React-Redux Provider is wrapped in layout.tsx

## Third-Party APIs

**Google Map**

- Account: kota.j.ueshima@gmail.com
- Project Name: globify

**Spotify**

- Account: rachiko38
- Project Name: globify

## Alternate Map Code

**@googlemaps/react-wrapper**

```
const mapOptions = {
    mapId: process.env.NEXT_PUBLIC_MAP_ID,
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 5,
    disableDefaultUI: true,
}

<Wrapper
apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
libraries={['marker', 'places']}
>
    <MyMap />
</Wrapper>


function MyMap() {
    const [map, setMap] = useState<google.maps.Map>()
    const mapRef = useRef<any>()

    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, mapOptions))
    }, [])

    return (
        <>
        <div ref={mapRef} className='h-[90vh] w-3/4' />
        {map && <AdvancedMarkers map={map} />}
        </>
    )
}
```

**Add Normal Markers**

```
useEffect(() => {
    if (songs.length > 0) {
        addMarkers(mapRef.current)
    }
}, [songs])

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
```

**Simple Autocomplete Search Bar**

```
 <Autocomplete
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
    onPlaceSelected={place => {
    const lat = place?.geometry?.location?.lat()
    const lng = place?.geometry?.location?.lng()
    console.log('Lat', lat)
    console.log('Lng', lng)
    // check to make sure lat and lng are not undefined
    if (lat && lng) {
        changeCenter({ lat, lng }, zoomLevel.CLOSE)
    }
    }}
    options={{
    types: ['(regions)'],
    }}
    className='py-2 w-3/4 md:px-6 lg:px-8 bg-primary border-2 text-large font-light tracking-wider text-secondary placeholder:text-secondary globalRounded focus:outline-none'
/>
```
