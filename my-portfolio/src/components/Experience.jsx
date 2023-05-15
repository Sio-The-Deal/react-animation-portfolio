import { Float, Line, OrbitControls, useAnimations } from "@react-three/drei";
import { Background } from "./Background";
import { Dogfly } from "./Dogfly";
import { Asteroid } from "./Asteroid";
import * as THREE from "three";
import { useMemo } from "react";
import { Euler, Group, Vector3 } from "three";





const LINE_NB_POINTS = 1800;

export const Experience = () => {
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(-2, 0, -20),
      new THREE.Vector3(-3, 0, -30),
      new THREE.Vector3(0, 0, -40),
      new THREE.Vector3(5, 0, -50),
      new THREE.Vector3(7, 0, -60),
      new THREE.Vector3(5, 0, -70),
      new THREE.Vector3(0, 0, -80),
      new THREE.Vector3(0, 0, -90),
      new THREE.Vector3(0, 0, -100),

    ],
    false,
    "chordal",
    0.5)
  })
  
  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  },[curve]);



  // generate a plane based on the curve
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape ;
  }, [curve]);

  return (
    <>
      <OrbitControls />
      <Background />
      {/* <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}> */}
      <Float floatIntensity={3} speed={2} rotationIntensity={2}>

        <Dogfly
          rotation-y={Math.PI / 4}
          scale={[0.5, 0.5, 0.5]}
          position-y={0.1}
        />
      </Float>
      <group position-y={-2}>
        {/* <Line
          points={linePoints}
          color={"white"}
          opacity={0.7}
          transparentlineqorth={16}
        /> */}
        <mesh>
          <extrudeGeometry
          args={[
            shape,
            {
              steps: LINE_NB_POINTS,
              bevelEnabled: false,
              extrudePath: curve,
            },
          ]} />
          <meshStandardMaterial color={"white"} opacity={0.7} transparent/>
        </mesh>
      </group>
      {/* see doc https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry */}

      <Asteroid opacity={0.5} scale={[0.1, 0.1, 0.2]} position-y={[-2, 1, -3]} />
      <Asteroid opacity={0.5} scale={[0.1, 0.1, 0.1]} position-y={[1.5, -0.5, -2]} />
      <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.025]} rotation-y={Math.PI / 9} position={[2, -0.2, -2]} />
      <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.05]} rotation-y={Math.PI / 9} position={[1, -0.2, -12]} />
      <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.1]} position={[0, 1, -53]} />
      <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.1]} position={[0, 1, -100]} />

    </>
  );
};