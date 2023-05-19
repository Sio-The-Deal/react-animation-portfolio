import { Environment, Sphere } from "@react-three/drei";
import { LayerMaterial, Gradient } from "lamina";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


export const Background = ({ backgroundColors }) => {
    const start = 0.2;
    const end = -0.5;
  
    const gradientRef = useRef();
    const gradientEnvRef = useRef();

    useFrame(() => {
        gradientRef.current.colorA = new THREE.Color(
          backgroundColors.current.colorA
        );
        gradientRef.current.colorB = new THREE.Color(
          backgroundColors.current.colorB
        );
        gradientEnvRef.current.colorA = new THREE.Color(
          backgroundColors.current.colorA
        );
        gradientEnvRef.current.colorB = new THREE.Color(
          backgroundColors.current.colorB
        );
      });
    return (
        <>
            <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
                <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
                    <Gradient ref={gradientRef} axes={"y"} start={start} end={end} />
                </LayerMaterial>
            </Sphere>
            <Environment resolution={256} frames={Infinity}>
                <Sphere
                    scale={[100, 100, 100]}
                    rotation-y={Math.PI / 2}
                    rotation-x={Math.PI}
                 >
                    <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
                        <Gradient ref={gradientEnvRef} axes={"y"} start={start} end={end} />
                    </LayerMaterial>
                </Sphere>
            </Environment>

            {/* <Environment preset="sunset" /> */}
            {/* it is possible to change preset to "dawn" ,"night" or "day" */}
            {/* <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}> */}
            {/* since we are using environment , we can set the rotation-y={Math.PI / 2} to rotate the sphere 90 degrees */}
                {/* Math.PI / 2 -> Left ,,, -Math.PI / 2 -> Right */}
                {/* <LayerMaterial
                    lighting="physical"
                    transmission={0} */}
                     {/* transmission is the opacity of the material */}
                    {/* side={THREE.BackSide}
                > */}
                    {/* <Gradient colorA={"orange"} colorB={"white"} axes={"y"} start={0} end={-0.7}/>  */}
                    {/* change the gradient from vertical to horizontal by changing the axes prop */}
                {/* </LayerMaterial>
            </Sphere> */}
        
        </> 
    );
};


