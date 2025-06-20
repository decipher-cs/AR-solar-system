import { Canvas } from "@react-three/fiber"
import { XR, createXRStore, XROrigin } from "@react-three/xr"
import { Suspense } from "react"
import { OrbitControls, Text } from "@react-three/drei"
import { solarSystemData } from "./solarSystem"
import { Orbit } from "./components/Orbit"
import { Planet } from "./components/Planet"

const store = createXRStore({
   emulate: true,
   depthSensing: true,
   bounded: false,
   domOverlay: true,
})

function App() {
   return (
      <div className="absolute inset-0 flex flex-col bg-white">
         <Canvas className="">
            <XR store={store}>
               <Suspense
                  fallback={
                     <Text color="black" anchorX="center" anchorY="middle">
                        Loading your scene. Please wait.
                     </Text>
                  }
               >
                  <group>
                     {solarSystemData.map(({ planet, orbitRadius, planetRadius, orbitSpeed, texture }) => (
                        <group key={planet}>
                           <Text color={"black"} position={[orbitRadius, 11, 0]} fontSize={0.1}>
                              {planet}
                           </Text>
                           <Orbit radius={orbitRadius} />
                           <Planet
                              radius={planetRadius}
                              orbitRadius={orbitRadius}
                              speed={orbitSpeed}
                              texture={texture}
                           />
                        </group>
                     ))}
                  </group>

                  <group position={[0, 0, 0]}>
                     <XROrigin />
                  </group>

                  <OrbitControls />
                  <axesHelper scale={100} />
               </Suspense>
            </XR>
         </Canvas>
         <button onClick={() => store.enterAR()}>Enter AR</button>
      </div>
   )
}

export default App
