import { Float, OrbitControls } from "@react-three/drei";
import { Background } from "./Background";
import { Dog } from "./Dog";
import { Asteroid } from "./Asteroid";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Background />
      <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
        <Dog
          rotation-y={Math.PI / 2}
          scale={[0.5, 0.5, 0.5]}
          position-y={0.1}
        />
      </Float>
      <Asteroid opacity={0.5} scale={[0.1, 0.1, 0.2]} position-y={[-2, 1, -3]} />
      <Asteroid opacity={0.5} scale={[0.1, 0.1, 0.1]} position-y={[1.5, -0.5, -2]} />
      <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.025]} rotation-y={Math.PI / 9} position={[2, -0.2, -2]} />
      <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.1]} rotation-y={Math.PI / 9} position={[1, -0.2, -12]} />
      <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.1]} position={[0, 1, -53]} />
      <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.1]} position={[0, 1, -100]} />

    </>
  );
};