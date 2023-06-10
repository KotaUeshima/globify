import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Globe from './Globe'

function GlobeCanvas() {
  return (
    <Suspense fallback={null}>
      <Canvas>
        <Globe />
      </Canvas>
    </Suspense>
  )
}

export default GlobeCanvas
