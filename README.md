# Globify

Current attempt of revamping my old project with Next.js

## Setup

Start project on a personal port

```
npm run dev -- -p 8000
```

## Installation

```
npm install three
npm install @react-three/fiber
npm install @react-three/drei
npm install @react-google-maps/api
npm install @heroicons/react
npm install react-google-autocomplete --save
npm install react-redux
npm install @reduxjs/toolkit
npm install @googlemaps/markerclusterer
npm install @types/google.maps
```

## Deployment

Hosted on Vercel: [Link to project]('https://globify-802il2p4c-kotaueshima.vercel.app/')

## Developer

### React-Redux

- React-Redux is used in this application to manage state throughout
- Remember React-Redux is a client side application and Next.js is by default server side
- Currently React-Redux Provider is wrapped in layout.tsx

### Third-Party APIs

**Google Map**

- Account: kota.j.ueshima@gmail.com
- Project Name: globify

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

**Spotify**

- Account: rachiko38
- Project Name: globify
