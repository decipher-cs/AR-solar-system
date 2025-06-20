import { Ring } from "@react-three/drei"

export const Orbit = ({ radius }: { radius: number }) => (
   <Ring rotation={[-Math.PI / 2, 0, 0]} args={[radius, radius + 0.01]} position={[0, 0.5, 0]}>
      <meshBasicMaterial color={"white"} />
   </Ring>
)
