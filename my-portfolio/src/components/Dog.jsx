import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Dog(props) {
  const { nodes, materials } = useGLTF('./models/dog/dog.glb');
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.circle001.geometry} material={materials.mat15} />
      <mesh geometry={nodes['circle000-Mesh'].geometry} material={materials.mat7} />
      <mesh geometry={nodes['circle000-Mesh_1'].geometry} material={materials.mat15} />
      <mesh geometry={nodes['circle000-Mesh_2'].geometry} material={materials.mat23} />
      <mesh geometry={nodes['circle000-Mesh_3'].geometry} material={materials.mat21} />
      <mesh geometry={nodes['circle000-Mesh_4'].geometry} material={materials.mat19} />
    </group>
  )
}

useGLTF.preload('./models/dog/dog.glb')




// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import React, { useRef } from "react";

// const HELIX_SPEED = 1;

// export function Dog(props) {
//   const { nodes, materials } = useGLTF("./models/dog/dog.glb");

//   const helix = useRef();

//   useFrame((_state, delta) => {
//     helix.current.rotation.x += delta * HELIX_SPEED;
//   });

//   return (
//     <group {...props} dispose={null}>
//       <mesh geometry={nodes.circle000.geometry}>
//         <meshStandardMaterial color="white"/>
//       </mesh>
//       <mesh
//         ref={helix}
//         geometry={nodes.circle001.geometry}
//         material={materials.plane}
//         position={[1.09, 0.23, 0]}
//       >
//         <meshStandardMaterial color="white"/>
//       </mesh>
//     </group>
//   );
// }

// useGLTF.preload("./models/dog/dog.glb");