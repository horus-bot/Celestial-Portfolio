"use client";

import React from "react";
import { useTexture } from "@react-three/drei";

type PlanetProps = {
  textureFile: string;
  size: number;
  position: [number, number, number];
  metalness?: number;
  roughness?: number;
};

export default function Planet({ textureFile, size, position, metalness = 0.5, roughness = 0.5 }: PlanetProps): JSX.Element {
  const texture = useTexture(textureFile);

  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        map={texture} 
        metalness={metalness} 
        roughness={roughness} 
      />
    </mesh>
  );
}
