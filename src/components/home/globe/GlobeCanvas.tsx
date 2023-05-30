import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Globe from './Globe'

function GlobeCanvas() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Globe />
      </Suspense>
    </Canvas>
  )
}

export default GlobeCanvas
