import { Canvas, useFrame } from "@react-three/fiber";
import { XR, createXRStore, XROrigin } from "@react-three/xr";
import { Suspense, useRef, useState, type ElementRef } from "react";
import {
  OrbitControls,
  Sphere,
  Text,
  Ring,
  Html,
  useTexture,
} from "@react-three/drei";
import { solarSystemData } from "./solarSystem";

const store = createXRStore({
  emulate: true,
  depthSensing: true,
  bounded: false,
});

const Orbit = ({ radius }: { radius: number }) => (
  <Ring
    rotation={[-Math.PI / 2, 0, 0]}
    args={[radius, radius + 0.01]}
    position={[0, 0.5, 0]}
  >
    <meshBasicMaterial color={"white"} />
  </Ring>
);

const Planet = ({
  radius,
  orbitRadius,
  speed,
  paused = false,
  texture,
}: {
  radius: number;
  orbitRadius: number;
  speed: number;
  paused?: boolean;
  texture: string;
}) => {
  useFrame(({ clock }) => {
    const planet = ref.current;
    if (!planet || paused) return;

    const elapsed = clock.getElapsedTime();
    const { sin, cos } = Math;

    const newXPos = orbitRadius * cos(elapsed * speed);
    const newZPos = orbitRadius * sin(elapsed * speed);
    planet.position.set(newXPos, 0.5, newZPos);
  });

  const ref = useRef<ElementRef<typeof Sphere>>(null);
  const map = useTexture(texture);

  return (
    <Sphere
      args={[radius / 8]}
      position={[orbitRadius, 0.5, orbitRadius]}
      ref={ref}
    >
      <meshBasicMaterial map={map} />
    </Sphere>
  );
};

function App() {
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [orbitSpeed, setOrbitSpeed] = useState(1);

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      <Canvas className="">
        <XR store={store}>
          <Suspense
            fallback={
              <>
                <Text color="black" anchorX="center" anchorY="middle">
                  Loading your scene. Please wait.
                </Text>
              </>
            }
          ></Suspense>

          <group>
            {solarSystemData.map(
              ({ planet, orbitRadius, planetRadius, orbitSpeed, texture }) => (
                <group key={planet}>
                  <Text
                    color={"black"}
                    position={[orbitRadius, 11, 0]}
                    fontSize={0.1}
                  >
                    {planet}
                  </Text>
                  <Orbit radius={orbitRadius} />
                  <Planet
                    radius={planetRadius}
                    orbitRadius={orbitRadius}
                    speed={orbitSpeed}
                    paused={!animationEnabled}
                    texture={texture}
                  />
                </group>
              ),
            )}
          </group>

          <group position={[0, 0, 0]}>
            <XROrigin />
          </group>

          <OrbitControls />
          <axesHelper scale={1000} />

          <Html
            as="div" // Wrapping element (default: 'div')
            distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
            // calculatePosition={(el, camera, { height, width }) => { return [width, 1, height]; }}
          >
            <form
              className="border-3 p-3 bg-white grid *:flex"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="animation">
                Enable Animation
                <input
                  type="checkbox"
                  name="animation"
                  checked={animationEnabled}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAnimationEnabled(checked);
                  }}
                />
              </label>

              <label htmlFor="speed">
                Orbit Speed
                <input
                  type="number"
                  name="speed"
                  max={100}
                  min={0}
                  value={orbitSpeed}
                  onChange={(e) => {
                    const value = e.target.value;
                    setOrbitSpeed(Number(value));
                  }}
                />
              </label>
            </form>
          </Html>
        </XR>
      </Canvas>
      <button onClick={() => store.enterAR()}>Enter AR</button>
    </div>
  );
}

export default App;
