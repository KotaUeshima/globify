import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Earth from './Earth'

function Globe() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
    </Canvas>
  )
}

export default Globe
