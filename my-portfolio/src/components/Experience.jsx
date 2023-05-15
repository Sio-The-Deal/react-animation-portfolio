import { Float, OrbitControls, PerspectiveCamera, useScroll } from "@react-three/drei";
import { Background } from "./Background";
import { Dogfly } from "./Dogfly";
import { Asteroid } from "./Asteroid";
import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { Euler, Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";





const LINE_NB_POINTS = 28000;

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

  const cameraGroup = useRef();
  const scroll = useScroll(); //declare scroll to useScroll to get the current scroll data

  // get the current point on the line we are based on the score percentage we use mat.round
  // to get the closest index then we attach our camera group position to the point
  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    )
    const curPoint = linePoints[curPointIndex];

    //slightly rotate our plane and camera based on curve
    const pointAhead = linePoints[Math.min(curPointIndex + 1), linePoints.length - 1];

    // calculate the difference between the x value from our position 
    // to the next position this way we can determine if we go to the left or right
    // math.pi / 2 rotation is left and  -Math.PI / 2 is Right
    const xDisplacement = (pointAhead.x - curPoint.x) * 20;

    const angleRotation = (xDisplacement < 0 ? 1 : -1) * 50;
    //checks if xDisplacement is less than 0. If it is true, it assigns a value of 1, indicating a left rotation. If it is false, it assigns a value of -1, indicating a right rotation.
    Math.min(Math.abs(xDisplacement), Math.PI / 4); //we dont want Math.abs to be left or right so we set /3

    const targetObjectQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        dogfly.current.rotation.x,
        dogfly.current.rotation.y,
        angleRotation,
      )
    )
    dogfly.current.quaternion.slerp(targetObjectQuaternion, delta * 2);
    cameraGroup.current.quaternion.slerp(targetObjectQuaternion, delta * 2);

    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });
  // By adjusting the scaling factor (80) and the maximum rotation angle (Math.PI / 3),
 //  you can control the intensity and range of the rotation effect based on the displacement between points.
  const dogfly = useRef();

  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        {/* <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}> */}
        <group ref={dogfly}>
        <Float floatIntensity={3} speed={1.3} rotationIntensity={0.8}>

          <Dogfly
            rotation-y={Math.PI / 2}
            scale={[0.4, 0.4, 0.4]}
            position-y={0.1}
          />
        </Float>
        </group>
      </group>

      {/* use drei library to add text */}
      <group position={[-3, 0, -20]}>
        <Text
        color="white"
        anchorX={"left"}
        anchorY={"middle"}
        fontSize={0.28}
        maxWidth={2.5}
        >
          My name is Sio Chang{"\n"}
          Welcome to my portfolio website. {"\n"}
          My dog Bob will be our pilot.{"\n"}
          Let's go for ride!
        </Text>
      </group>




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