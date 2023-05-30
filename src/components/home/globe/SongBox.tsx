import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Mesh } from 'three'

function SongBox() {
  // ref.current is defined when we acces it
  const ref = useRef<Mesh>(null!)

  const [hovered, setHover] = useState(false)

  // useFrame(({ clock }) => {
  //   const elapsedTime = clock.getElapsedTime()
  //   ref.current.rotation.x = elapsedTime
  // })

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color='red' position={[0, 0, 5]} />
      <mesh
        ref={ref}
        scale={1}
        onClick={() => {}}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[6, 2, 2]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    </>
  )
}

export default SongBox
