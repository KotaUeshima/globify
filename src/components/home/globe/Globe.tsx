import EarthSpecularMap from '@/public/assets/specularMap.jpg'
// import { OrbitControls } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { TextureLoader } from 'three'

function Globe() {
  const [specularMap] = useLoader(TextureLoader, [EarthSpecularMap.src])
  const earthRef = useRef<any | undefined>()

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    earthRef.current.rotation.y = elapsedTime / 6
  })

  return (
    <>
      <ambientLight intensity={1} />
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial map={specularMap} normalMap={specularMap} />
        {/* <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          panSpeed={0.5}
          rotateSpeed={0.4}
        /> */}
      </mesh>
    </>
  )
}

export default Globe
