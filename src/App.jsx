import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ScrollControls } from "@react-three/drei";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useMemo } from "react";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/context";

function App() {
  const { play, end } = usePlay();

  const effects = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.2} />
      </EffectComposer>
    ),
    []
  );
  return (
    <>
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls
          pages={play && !end ? 20 : 0}
          damping={0.5}
          style={{
            top: "10px",
            left: "0px",
            bottom: "10px",
            right: "10px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
            opacity: 0,
          }}
        >
          <Experience />
        </ScrollControls>
        {effects}
      </Canvas>
      <Overlay />


      {/* <Canvas camera={{
        position: [0, 0, 5],
        fov: 30,
      }}>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={5} damping={0.3}>
          <Experience />
        </ScrollControls>
      </Canvas> */}
    </>
  );
}

export default App;