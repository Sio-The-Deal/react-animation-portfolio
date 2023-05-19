import { Float, OrbitControls, PerspectiveCamera, useScroll } from "@react-three/drei";
import { Background } from "./Background";
import { Dogfly } from "./Dogfly";
// import { Asteroid } from "./Asteroid";
import * as THREE from "three";
import { useMemo, useRef, useEffect, useLayoutEffect } from "react";
import { Euler, Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { usePlay } from "../contexts/context";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { Speed } from "./Speed";
import { TextBox } from "./TextBox";
import { Cloud } from "./Cloud";





const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;
const FRICTION_DISTANCE = 42;



export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x - 3,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        title: "My Info",
        subtitle: `My dog Bob will be our captain today ;)
        I'm an Enterprise Computing graduate from Dublin City University. `,
      },

      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x + 2,
          curvePoints[2].y,
          curvePoints[2].z
        ),
        title: "My Skills",
        subtitle: ` OOP, Python, SQL, HTML, CSS, JavaScript, React, Node.js, MongoDB, Machine Learning & much more!
        `,
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x - 3,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        title: "Experience",
        subtitle: `Worked in teams to develop web apps & data analysis projects.`,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[4].x + 3.5,
          curvePoints[4].y,
          curvePoints[4].z - 12
        ),
        title: "Interests",
        subtitle: `Web development, data analysis, tech news, machine learning & artificial intelligence.`,
      },
    ];
  }, []);

  const clouds = useMemo(
    () => [
      // STARTING
      {
        position: new Vector3(-3.5, -3.2, -7),
      },
      {
        position: new Vector3(3.5, -4, -10),
      },
      {
        // scale: new Vector3(0.1, 0.1, 0.1),
        scale: new Vector3(4, 4, 4),
        position: new Vector3(-18, 0.2, -68),
        rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
      },
      {
        scale: new Vector3(2.5, 2.5, 2.5),
        // scale: new Vector3(0.05, 0.05, 0.05),
        position: new Vector3(10, -1.2, -52),
      },
      // FIRST POINT
      {
        scale: new Vector3(4, 4, 4),
        // scale: new Vector3(0.1, 0.1, 0.1),
        position: new Vector3(
          curvePoints[1].x + 10,
          curvePoints[1].y - 4,
          curvePoints[1].z + 64
        ),
      },
      {
        // scale: new Vector3(0.08, 0.08, 0.08),
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[1].x - 20,
          curvePoints[1].y + 4,
          curvePoints[1].z + 28
        ),
        rotation: new Euler(0, Math.PI / 7, 0),
      },
      {
        rotation: new Euler(0, Math.PI / 7, Math.PI / 5),
        // scale: new Vector3(0.1, 0.1, 0.1),
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[1].x - 13,
          curvePoints[1].y + 4,
          curvePoints[1].z - 62
        ),
      },
      {
        rotation: new Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
        scale: new Vector3(5, 5, 5),
        // scale: new Vector3(0.1, 0.1, 0.1),
        position: new Vector3(
          curvePoints[1].x + 54,
          curvePoints[1].y + 2,
          curvePoints[1].z - 82
        ),
      },
      {
        // scale: new Vector3(0.1, 0.1, 0.1),
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[1].x + 8,
          curvePoints[1].y - 14,
          curvePoints[1].z - 22
        ),
      },
      // SECOND POINT
      {
        // scale: new Vector3(0.07, 0.07, 0.07),
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[2].x + 6,
          curvePoints[2].y - 7,
          curvePoints[2].z + 50
        ),
      },
      {
        // scale: new Vector3(0.05, 0.05, 0.05),
        scale: new Vector3(2, 2, 2),
        position: new Vector3(
          curvePoints[2].x - 2,
          curvePoints[2].y + 4,
          curvePoints[2].z - 26
        ),
      },
      {
        // scale: new Vector3(0.08, 0.08, 0.08),
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[2].x + 12,
          curvePoints[2].y + 1,
          curvePoints[2].z - 86
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
      },
      // THIRD POINT
      {
        // scale: new Vector3(0.07, 0.07, 0.07),
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[3].x + 3,
          curvePoints[3].y - 10,
          curvePoints[3].z + 50
        ),
      },
      {
        // scale: new Vector3(0.7, 0.7, 0.7),
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[3].x - 10,
          curvePoints[3].y,
          curvePoints[3].z + 30
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        // scale: new Vector3(0.08, 0.08, 0.08),
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[3].x - 20,
          curvePoints[3].y - 5,
          curvePoints[3].z - 8
        ),
        rotation: new Euler(Math.PI, 0, Math.PI / 5),
      },
      {
        // scale: new Vector3(0.1, 0.1, 0.1),
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[3].x + 0,
          curvePoints[3].y - 5,
          curvePoints[3].z - 98
        ),
        rotation: new Euler(0, Math.PI / 3, 0),
      },
      // FOURTH POINT
      {
        // scale: new Vector3(0.05, 0.05, 0.05),
        scale: new Vector3(2, 2, 2),
        position: new Vector3(
          curvePoints[4].x + 3,
          curvePoints[4].y - 10,
          curvePoints[4].z + 2
        ),
      },
      {
        // scale: new Vector3(0.06, 0.06, 0.06),
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[4].x + 24,
          curvePoints[4].y - 6,
          curvePoints[4].z - 42
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        // scale: new Vector3(0.06, 0.06, 0.06),
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[4].x - 4,
          curvePoints[4].y + 9,
          curvePoints[4].z - 62
        ),
        rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
      },
      // FINAL
      {
        // scale: new Vector3(0.06, 0.06, 0.06),
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[7].x + 12,
          curvePoints[7].y - 5,
          curvePoints[7].z + 60
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        // scale: new Vector3(0.06, 0.06, 0.06),
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[7].x - 12,
          curvePoints[7].y + 5,
          curvePoints[7].z + 120
        ),
        rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
      },
    ],
    []
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const camera = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { play, setHasScroll, end, setEnd } = usePlay();

  useFrame((_state, delta) => {
    if (window.innerWidth > window.innerHeight) {
      // LANDSCAPE
      camera.current.fov = 30;
      camera.current.position.z = 5;
    } else {
      // PORTRAIT
      camera.current.fov = 80;
      camera.current.position.z = 2;
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    if (play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta
      );
    }

    lineMaterialRef.current.opacity = sceneOpacity.current;

    if (end) {
      return;
    }

    const scrollOffset = Math.max(0, scroll.offset);

    let friction = 1;
    let resetCameraRail = true;
    // LOOK TO CLOSE TEXT SECTIONS
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      );

      if (distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
        const targetCameraRailPosition = new Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        );
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;
      }
    });
    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    // CALCULATE LERPED SCROLL OFFSET
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );
    // PROTECT BELOW 0 AND ABOVE 1
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;
    tl.current.seek(lerpedScrollOffset * tl.current.duration());

    const curPoint = curve.getPoint(lerpedScrollOffset);

    // Follow the curve points
    cameraGroup.current.position.lerp(curPoint, delta * 24);

    // Make the group look ahead on the curve

    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

    // Dogfly rotation

    const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_AIRPLANE);

    const nonLerpLookAt = new Group();
    nonLerpLookAt.position.copy(curPoint);
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

    tangent.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -nonLerpLookAt.rotation.y
    );

    let angle = Math.atan2(-tangent.z, tangent.x);
    angle = -Math.PI / 2 + angle;

    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4; // stronger angle

    // LIMIT PLANE ANGLE
    if (angleDegrees < 0) {
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    }
    if (angleDegrees > 0) {
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    }

    // SET BACK ANGLE
    angle = (angleDegrees * Math.PI) / 180;

    const targetDogflyQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        dogfly.current.rotation.x,
        dogfly.current.rotation.y,
        angle
      )
    );
    dogfly.current.quaternion.slerp(targetDogflyQuaternion, delta * 2);

    if (
      cameraGroup.current.position.z <
      curvePoints[curvePoints.length - 1].z + 100
    ) {
      setEnd(true);
      planeOutTl.current.play();
    }
  });

  const dogfly = useRef();

  const tl = useRef();
  const backgroundColors = useRef({
    // colorA: "#3535cc",
    // colorB: "#abaadd",
    colorA: "#CF5104",
    colorB: "#ffde59",
  });

  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#6f35cc",
      colorB: "#ffad30",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#424242",
      colorB: "#ffcc00",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      // colorA: "#81318b",
      colorA: "#CF5104",
      colorB: "#55ab8f",
    });

    tl.current.pause();

    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    planeInTl.current.from(dogfly.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();

    planeOutTl.current.to(
      dogfly.current.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    );
    planeOutTl.current.to(
      cameraRail.current.position,
      {
        duration: 8,
        y: 12,
      },
      0
    );
    planeOutTl.current.to(dogfly.current.position, {
      duration: 1,
      z: -1000,
    });
  }, []);

  useEffect(() => {
    if (play) {
      planeInTl.current.play();
    }
  }, [play]);

  return useMemo(
    () => (
      <>
        <directionalLight position={[0, 3, 1]} intensity={0.1} />
        <group ref={cameraGroup}>
          <Speed />
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          </group>
          <group ref={dogfly}>
            <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
              <Dogfly
                rotation-y={Math.PI / 2}
                scale={[0.2, 0.2, 0.2]}
                position-y={0.1}
              />
            </Float>
          </group>
        </group>
        {/* TEXT */}
        {textSections.map((textSection, index) => (
          <TextBox {...textSection} key={index} />
        ))}

        {/* LINE */}
        <group position-y={-2}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />
            <meshStandardMaterial
              color={"white"}
              ref={lineMaterialRef}
              transparent
              envMapIntensity={2}
              onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group>

        {/* Asteroids */}
        {/* {asteroids.map((asteroid, index) => (
          <Asteroid sceneOpacity={sceneOpacity} {...asteroid} key={index} />
        ))} */}
        {clouds.map((cloud, index) => (
          <Cloud sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
      </>
    ),
    []
  );
};










// export const Experience = () => {
  
//   const curve = useMemo(() => {
//     return new THREE.CatmullRomCurve3([
//       new THREE.Vector3(0, 0, 0),
//       new THREE.Vector3(0, 0, -10),
//       new THREE.Vector3(-2, 0, -20),
//       new THREE.Vector3(-3, 0, -30),
//       new THREE.Vector3(0, 0, -40),
//       new THREE.Vector3(5, 0, -50),
//       new THREE.Vector3(7, 0, -60),
//       new THREE.Vector3(5, 0, -70),
//       new THREE.Vector3(0, 0, -80),
//       new THREE.Vector3(0, 0, -90),
//       new THREE.Vector3(0, 0, -100),

//     ],
//     false,
//     "chordal",
//     0.5)
//   })
  
//   const linePoints = useMemo(() => {
//     return curve.getPoints(LINE_NB_POINTS);
//   },[curve]);



//   // generate a plane based on the curve
//   const shape = useMemo(() => {
//     const shape = new THREE.Shape();
//     shape.moveTo(0, -0.2);
//     shape.lineTo(0, 0.2);

//     return shape ;
//   }, [curve]);

//   const cameraGroup = useRef();
//   const scroll = useScroll(); //declare scroll to useScroll to get the current scroll data

//   // get the current point on the line we are based on the score percentage we use mat.round
//   // to get the closest index then we attach our camera group position to the point
//   useFrame((_state, delta) => {
//     const curPointIndex = Math.min(
//       Math.round(scroll.offset * linePoints.length),
//       linePoints.length - 1
//     )
//     const curPoint = linePoints[curPointIndex];

//     //slightly rotate our plane and camera based on curve
//     const pointAhead = linePoints[Math.min(curPointIndex + 1), linePoints.length - 1];

//     // calculate the difference between the x value from our position 
//     // to the next position this way we can determine if we go to the left or right
//     // math.pi / 2 rotation is left and  -Math.PI / 2 is Right
//     const xDisplacement = (pointAhead.x - curPoint.x) * 20;

//     const angleRotation = (xDisplacement < 0 ? 1 : -1) * 50;
//     //checks if xDisplacement is less than 0. If it is true, it assigns a value of 1, indicating a left rotation. If it is false, it assigns a value of -1, indicating a right rotation.
//     Math.min(Math.abs(xDisplacement), Math.PI / 4); //we dont want Math.abs to be left or right so we set /3

//     const targetObjectQuaternion = new THREE.Quaternion().setFromEuler(
//       new THREE.Euler(
//         dogfly.current.rotation.x,
//         dogfly.current.rotation.y,
//         angleRotation,
//       )
//     )
//     dogfly.current.quaternion.slerp(targetObjectQuaternion, delta * 2);
//     cameraGroup.current.quaternion.slerp(targetObjectQuaternion, delta * 2);

//     cameraGroup.current.position.lerp(curPoint, delta * 24);
//   });
//   // By adjusting the scaling factor (80) and the maximum rotation angle (Math.PI / 3),
//  //  you can control the intensity and range of the rotation effect based on the displacement between points.
//   const dogfly = useRef();

//   return (
//     <>
//       {/* <OrbitControls enableZoom={false} /> */}
//       <group ref={cameraGroup}>
//         <Background />
//         <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
//         {/* <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}> */}
//         <group ref={dogfly}>
//         <Float floatIntensity={3} speed={1.3} rotationIntensity={0.8}>

//           <Dogfly
//             rotation-y={Math.PI / 2}
//             scale={[0.4, 0.4, 0.4]}
//             position-y={0.1}
//           />
//         </Float>
//         </group>
//       </group>

//       {/* use drei library to add text */}
//       <group position={[-3, 0, -20]}>
//         <Text
//         color="white"
//         anchorX={"left"}
//         anchorY={"middle"}
//         fontSize={0.28}
//         maxWidth={2.5}
//         >
//           My name is Sio Chang{"\n"}
//           Welcome to my portfolio website. {"\n"}
//           My dog Bob will be our pilot.{"\n"}
//           Let's go for ride!
//         </Text>
//       </group>




//       <group position-y={-2}>
//         {/* <Line
//           points={linePoints}
//           color={"white"}
//           opacity={0.7}
//           transparentlineqorth={16}
//         /> */}
//         <mesh>
//           <extrudeGeometry
//           args={[
//             shape,
//             {
//               steps: LINE_NB_POINTS,
//               bevelEnabled: false,
//               extrudePath: curve,
//             },
//           ]} />
//           <meshStandardMaterial color={"white"} opacity={0.7} transparent/>
//         </mesh>
//       </group>
//       {/* see doc https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry */}

//       <Asteroid opacity={0.5} scale={[0.1, 0.1, 0.2]} position-y={[-2, 1, -3]} />
//       <Asteroid opacity={0.5} scale={[0.1, 0.1, 0.1]} position-y={[1.5, -0.5, -2]} />
//       <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.025]} rotation-y={Math.PI / 9} position={[2, -0.2, -2]} />
//       <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.05]} rotation-y={Math.PI / 9} position={[1, -0.2, -12]} />
//       <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.1]} position={[0, 1, -53]} />
//       <Asteroid opacity={0.2} scale={[0.1, 0.1, 0.1]} position={[0, 1, -100]} />

//     </>
//   );
// };