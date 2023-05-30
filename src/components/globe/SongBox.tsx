import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

function SongBox() {
  const mesh = useRef<any | undefined>()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => (mesh.current.rotation.x += delta))

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color='red' position={[0, 0, 5]} />
      <mesh
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={event => setActive(!active)}
        onPointerOver={event => setHover(true)}
        onPointerOut={event => setHover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    </>
  )
}

export default SongBox
