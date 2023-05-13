import { Environment, Sphere } from "@react-three/drei";
import { LayerMaterial, Gradient } from "lamina";
import * as THREE from "three";

export const Background = () => {
    return (
        <>
            <Environment preset="sunset" />
            {/* it is possible to change preset to "dawn" ,"night" or "day" */}
            <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
            {/* since we are using environment , we can set the rotation-y={Math.PI / 2} to rotate the sphere 90 degrees */}
                {/* Math.PI / 2 -> Left ,,, -Math.PI / 2 -> Right */}
                <LayerMaterial
                    lighting="physical"
                    transmission={0}
                    // {/* transmission is the opacity of the material */}
                    side={THREE.BackSide}
                >
                    <Gradient colorA={"orange"} colorB={"white"} axes={"y"} start={0} end={-0.7}/> 
                    {/* change the gradient from vertical to horizontal by changing the axes prop */}
                </LayerMaterial>
            </Sphere>
        </>
    );
};


