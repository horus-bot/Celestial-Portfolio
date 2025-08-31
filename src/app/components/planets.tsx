"use client";

import React from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from 'three';

type PlanetProps = {
  size: number;
  position: [number, number, number];
  textureFile: string;
  metalness?: number;
  roughness?: number;
};

export default function Planet({ size, position, textureFile, metalness = 0.5, roughness = 0.5 }: PlanetProps): JSX.Element {
  // useTexture preloads the image and applies it as a texture
  const texture = useTexture(textureFile);

  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      {/* The 'map' property applies the texture to the material */}
      <meshStandardMaterial 
        map={texture} 
        metalness={metalness} 
        roughness={roughness} 
      />
    </mesh>
  );
}

