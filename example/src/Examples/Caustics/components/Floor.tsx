import { useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

export function Floor({ size = 30, ...props }) {
  const textureRepeat = size / 2 / 2;
  const tex = useTexture(
    "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@latest/prototype/light/texture_08.png",
    (t) => {
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(textureRepeat, textureRepeat);
    }
  );

  const [Albedo, AO, Displacement, Normal, Roughness] = useTexture([
    "/Caustics/pooltiles/tlfmffydy_4K_Albedo.jpg",
    "/Caustics/pooltiles/tlfmffydy_4K_AO.jpg",
    "/Caustics/pooltiles/tlfmffydy_4K_Displacement.jpg",
    "/Caustics/pooltiles/tlfmffydy_4K_Normal.jpg",
    "/Caustics/pooltiles/tlfmffydy_4K_Roughness.jpg",
  ]);

  return (
    <mesh castShadow receiveShadow {...props}>
      <planeGeometry args={[size, size, 256, 256]} />
      <meshPhysicalMaterial
        map={Albedo}
        aoMap={AO}
        // displacementMap={Displacement}
        normalMap={Normal}
        roughness={0.0}
        roughnessMap={Roughness}
      />
    </mesh>
  );
}
