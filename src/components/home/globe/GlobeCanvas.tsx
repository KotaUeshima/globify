import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import GlobeLoader from '../../loaders/GlobeLoader'
import Globe from './Globe'

function GlobeCanvas() {
  return (
    // <Suspense fallback={<GlobeLoader />}>
    <Canvas>
      <Globe />
    </Canvas>
    // </Suspense>
  )
}

export default GlobeCanvas
