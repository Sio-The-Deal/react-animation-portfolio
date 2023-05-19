/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/models/dog/dogfly.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
const HELIX_SPEED = 3

export function Dogfly(props) {
  const { nodes, materials } = useGLTF('./models/dog/dogfly.glb')
  const helix = useRef();
  useFrame((_state, delta) => {
    helix.current.rotation.x += delta * HELIX_SPEED;
  });
  return (
    <group {...props} dispose={null}>
      <group position={[0.23, 0.41, -0.02]} rotation={[0.41, -0.51, 0.11]}>
        <mesh geometry={nodes['circle000-Mesh'].geometry} material={materials['mat7.001']} />
        <mesh geometry={nodes['circle000-Mesh_1'].geometry} material={nodes['circle000-Mesh_1'].material} />
        <mesh geometry={nodes['circle000-Mesh_2'].geometry} material={materials['mat23.001']} />
        <mesh geometry={nodes['circle000-Mesh_3'].geometry} material={materials['mat21.001']} />
        <mesh geometry={nodes['circle000-Mesh_4'].geometry} material={materials['mat19.001']} />
      </group>
      <mesh ref={helix} geometry={nodes.circle001.geometry} material={materials['mat15.001']} position={[0.5, 0, 0]} rotation={[-0.32, -0.51, 0.11]} />
    </group>
  )
}

useGLTF.preload('./models/dog/dogfly.glb')