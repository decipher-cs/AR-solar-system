import { XR, createXRStore, XROrigin } from "@react-three/xr"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Environment, OrbitControls, Text } from "@react-three/drei"
import { solarSystemData } from "./solarSystem"
import { Orbit } from "./components/Orbit"
import { Planet } from "./components/Planet"
import type { Experience } from "./App"

export const store = createXRStore({
   emulate: true,
   depthSensing: true,
   bounded: false,
   domOverlay: true,
})

export const Scene = ({ mode = "browser" }: { mode?: Experience | null }) => {
   if (!mode) return null
   return (
      <Canvas className="">
         <XR store={store}>
            <Suspense
               fallback={
                  <Text color="black" anchorX="center" anchorY="middle" scale={0.5}>
                     Loading... Please wait
                  </Text>
               }
            >
               {mode === "browser" && <Environment background preset="night" />}
               <group>
                  {solarSystemData.map(({ planet, orbitRadius, planetRadius, orbitSpeed, texture }) => (
                     <group key={planet}>
                        <Text color={"black"} position={[orbitRadius, 11, 0]} fontSize={0.1}>
                           {planet}
                        </Text>
                        <Orbit radius={orbitRadius} />
                        <Planet radius={planetRadius} orbitRadius={orbitRadius} speed={orbitSpeed} texture={texture} />
                     </group>
                  ))}
               </group>

               <group position={[0, 0, 0]}>
                  <XROrigin />
               </group>

               <OrbitControls />

               {import.meta.env.DEV && <axesHelper scale={100} />}
            </Suspense>
         </XR>
      </Canvas>
   )
}
