import { Sphere, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, type ElementRef } from "react"

export const Planet = ({
   radius,
   orbitRadius,
   speed,
   paused = false,
   texture,
}: {
   radius: number
   orbitRadius: number
   speed: number
   paused?: boolean
   texture: string
}) => {
   useFrame(({ clock }) => {
      const planet = ref.current
      if (!planet || paused) return

      const elapsed = clock.getElapsedTime()
      const { sin, cos } = Math

      const newXPos = orbitRadius * cos(elapsed * speed)
      const newZPos = orbitRadius * sin(elapsed * speed)
      planet.position.set(newXPos, 0.5, newZPos)
   })

   const ref = useRef<ElementRef<typeof Sphere>>(null)
   const map = useTexture(texture)

   return (
      <Sphere args={[radius / 8]} position={[orbitRadius, 0.5, orbitRadius]} ref={ref}>
         <meshBasicMaterial map={map} />
      </Sphere>
   )
}
