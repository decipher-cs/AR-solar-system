import { Canvas, useFrame } from "@react-three/fiber";
import { XR, createXRStore, XROrigin, XRDomOverlay } from "@react-three/xr";
import {
  Suspense,
  useRef,
  type ComponentProps,
  type ComponentPropsWithRef,
  type ElementRef,
  type PropsWithRef,
} from "react";
import {
  Environment,
  OrbitControls,
  Sphere,
  Text,
  Ring,
} from "@react-three/drei";

const solarSystemData = [
  {
    planet: "Mercury",
    orbitRadius: 0.39,
    planetRadius: 0.383,
    orbitSpeed: 1.607,
  },
  { planet: "Venus", orbitRadius: 0.72, planetRadius: 0.95, orbitSpeed: 1.176 },
  { planet: "Earth", orbitRadius: 1.0, planetRadius: 1.0, orbitSpeed: 1.0 },
  { planet: "Mars", orbitRadius: 1.52, planetRadius: 0.532, orbitSpeed: 0.809 },
  {
    planet: "Jupiter",
    orbitRadius: 5.2,
    planetRadius: 10.974,
    orbitSpeed: 0.439,
  },
  {
    planet: "Saturn",
    orbitRadius: 9.58,
    planetRadius: 9.14,
    orbitSpeed: 0.325,
  },
  {
    planet: "Uranus",
    orbitRadius: 19.22,
    planetRadius: 3.978,
    orbitSpeed: 0.229,
  },
  {
    planet: "Neptune",
    orbitRadius: 30.05,
    planetRadius: 3.867,
    orbitSpeed: 0.182,
  },
];

const store = createXRStore({
  emulate: true,
  depthSensing: true,
  bounded: false,
});

const Orbit = ({ radius }: { radius: number }) => (
  <Ring
    rotation={[-Math.PI / 2, 0, 0]}
    args={[radius, radius + 0.01]}
    position={[0, 1, 0]}
  >
    <meshBasicMaterial color={"white"} />
  </Ring>
);

const Planet = ({
  radius,
  orbitRadius,
  speed,
}: {
  radius: number;
  orbitRadius: number;
  speed: number;
}) => {
  useFrame(({ clock }) => {
    const planet = ref.current;
    if (!planet) return;

    const elapsed = clock.getElapsedTime();
    const { sin, cos } = Math;

    const newXPos = orbitRadius * cos(elapsed * speed);
    const newZPos = orbitRadius * sin(elapsed * speed);
    planet.position.set(newXPos, 1, newZPos);
  });

  const ref = useRef<ElementRef<typeof Sphere>>(null);

  return (
    <Sphere
      args={[radius / 10]}
      position={[orbitRadius * 1, 1, orbitRadius * 1]}
      ref={ref}
    >
      <meshBasicMaterial color={"blue"} />
    </Sphere>
  );
};

function App() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <Canvas>
        <XR store={store}>
          <ambientLight />
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
              ({ planet, orbitRadius, planetRadius, orbitSpeed }) => (
                <group>
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
                  />
                </group>
              ),
            )}
          </group>

          <group position={[0, 0, 0]}>
            <XROrigin />
            <XRDomOverlay
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ backgroundColor: "red", padding: "1rem 2rem" }}>
                Hello World
              </div>
            </XRDomOverlay>
          </group>

          <OrbitControls />
          <axesHelper scale={1000} />
        </XR>
      </Canvas>
      <button onClick={() => store.enterAR()}>Enter AR</button>
    </div>
  );
}

export default App;
