import { XR, createXRStore, XROrigin, useXR, IfInSessionMode } from "@react-three/xr"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect } from "react"
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

export const Scene = ({ endHandler, mode = "undecided" }: { mode?: Experience; endHandler?: () => void }) => {
   const CustomComponent = () => {
      const session = useXR((xr) => xr.session)

      useEffect(() => {
         if (!session || !endHandler) return
         session.addEventListener("end", endHandler)
         return () => {
            session.removeEventListener("end", endHandler)
         }
      }, [])
      return null
   }

   return (
      <Canvas className="">
         <XR store={store}>
            <Suspense fallback={<Text scale={0.5}>Loading...</Text>}>
               <CustomComponent />
               <Suspense fallback={null}>{mode === "browser" && <Environment background preset="night" />}</Suspense>
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

               <IfInSessionMode deny={["immersive-vr", "immersive-ar"]}>
                  <OrbitControls />
               </IfInSessionMode>
            </Suspense>

            {import.meta.env.DEV && <axesHelper scale={100} />}
         </XR>
      </Canvas>
   )
}
