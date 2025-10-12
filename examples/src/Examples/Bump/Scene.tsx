import {
  Bounds,
  Environment,
  OrbitControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useControls } from "leva";

import { useMemo } from "react";
import { MeshStandardMaterial } from "three";
import CSM from "three-custom-shader-material";
import { useShader } from "../../pages/Root";

export function Scene() {
  const { nodes } = useGLTF("Bump/LeePerrySmith.glb") as any;
  const map = useTexture(import.meta.env.BASE_URL + "Bump/bumpMap.jpg");
  const { vs, fs } = useShader();

  const uniforms = useMemo(
    () => ({
      uBumpMap: { value: map },
      uBumpScale: { value: 30 },
    }),
    []
  );

  useControls({
    bumpScale: {
      value: 30,
      min: 0,
      max: 100,
      step: 0.01,
      onChange: (v) => (uniforms.uBumpScale.value = v),
    },
  });

  return (
    <>
      <OrbitControls />
      <Environment preset="city" />

      <Bounds fit clip observe margin={1.2}>
        <mesh castShadow receiveShadow geometry={nodes.LeePerrySmith.geometry}>
          <CSM
            baseMaterial={MeshStandardMaterial}
            vertexShader={vs}
            fragmentShader={fs}
            uniforms={uniforms}
          />
        </mesh>
      </Bounds>
    </>
  );
}
