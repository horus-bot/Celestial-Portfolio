"use client";

import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line, Text, Html, Stars, useTexture } from "@react-three/drei";
import Planet from "./planets";
import type { Group } from "three";
import { useRouter } from "next/navigation";
import * as THREE from 'three';

type PlanetData = {
  label: string;
  path: string;
  description: string;
  textureFile: string;
  size: number;
  material: { metalness: number; roughness: number };
  angle: number;
  speed: number;
  radius: number;
};

const planets: PlanetData[] = [
  { label: "ABOUT ME", path: "/about", description: "Learn more about my journey, skills, and passion for creative technology.", textureFile: "/textures/mercury.jpg", size: 1.5, material: { metalness: 0.2, roughness: 0.8 }, angle: 0, speed: 0.25, radius: 9 },
  { label: "PROJECTS", path: "/projects", description: "A curated gallery of my 3D models, animations, and interactive projects.", textureFile: "/textures/venus.jpg", size: 1.8, material: { metalness: 0.1, roughness: 0.5 }, angle: Math.PI / 3, speed: 0.20, radius: 12.5 },
  { label: "CONTACT", path: "/contact", description: "Let's connect! Find my contact details and social media links here.", textureFile: "/textures/earth_day.jpeg", size: 1.2, material: { metalness: 0.3, roughness: 0.4 }, angle: Math.PI / 2, speed: 0.17, radius: 16 },
  { label: "GALLERY", path: "/gallery", description: "A collection of my artistic explorations and visual experiments.", textureFile: "/textures/mars.webp", size: 1.4, material: { metalness: 0.2, roughness: 0.5 }, angle: Math.PI / 4, speed: 0.14, radius: 19.5 },
  { label: "EXPERIENCE", path: "/experience", description: "Details about my professional experience and technical background.", textureFile: "/textures/jupiter1.jpeg", size: 1.3, material: { metalness: 0.9, roughness: 0.2 }, angle: Math.PI, speed: 0.12, radius: 23 },
  { label: "BLOG", path: "/blog", description: "Thoughts on 3D, technology, and the creative process.", textureFile: "/textures/saturn1.jpg", size: 1.3, material: { metalness: 0.1, roughness: 0.6 }, angle: (3 * Math.PI) / 2, speed: 0.10, radius: 26.5 },
];

const orbitRadii = planets.map((p) => p.radius);
const initialCameraPosition = new THREE.Vector3(0, 30, 35);

// --- UPDATED BACKGROUND COMPONENT ---

function SceneBackground() {
  const texture = useTexture('/textures/space4.jpg');
  const bgRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // This creates the slow, subtle rotation of the background
    if (bgRef.current) {
      bgRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <mesh ref={bgRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}


// --- CORE COMPONENTS ---

// This is the component for the Sun model
function Sun({ setFocusedPlanet }: { setFocusedPlanet: (label: string | null) => void; }) {
  const sunRef = useRef<THREE.Mesh>(null!);
  const [sunTexture, glowTexture] = useTexture([
    '/textures/sun.jpg',
    '/textures/glow5.jpeg'
  ]);

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      <mesh
        ref={sunRef}
        onClick={() => setFocusedPlanet(null)}
        onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
        onPointerOut={(e) => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>
      <sprite scale={[10, 10, 1]}>
        <spriteMaterial 
            map={glowTexture} 
            blending={THREE.AdditiveBlending} 
            transparent 
            opacity={0.5}
            depthWrite={false}
        />
      </sprite>
      <Text 
        position={[0, 3.5, 0]} 
        fontSize={1.1} 
        color="#fff" 
        anchorX="center" 
        anchorY="middle" 
        outlineColor="#000" 
        outlineWidth={0.05}
        material-depthTest={false} // <-- ADDED THIS
      >
        HOME
      </Text>
    </group>
  );
}


function OrbitingPlanet({ planet, focusedPlanet, setFocusedPlanet }: { planet: PlanetData; focusedPlanet: string | null; setFocusedPlanet: (label: string | null) => void; }): JSX.Element {
  const groupRef = useRef<Group | null>(null);
  const router = useRouter();

  useFrame(({ clock }) => {
    if (focusedPlanet !== planet.label) {
      const t = clock.getElapsedTime();
      const theta = planet.angle + t * planet.speed;
      const x = Math.cos(theta) * planet.radius;
      const z = Math.sin(theta) * planet.radius;
      if (groupRef.current) {
        groupRef.current.position.set(x, 0, z);
      }
    }
    if (groupRef.current && groupRef.current.children[0]) {
      groupRef.current.children[0].rotation.y += 0.005;
    }
  });

  return (
    <group 
      ref={groupRef}
      name={planet.label}
      onClick={(e) => { e.stopPropagation(); setFocusedPlanet(planet.label); }}
      onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
      onPointerOut={(e) => (document.body.style.cursor = 'auto')}
    >
      <Planet
        textureFile={planet.textureFile}
        size={planet.size}
        position={[0, 0, 0]}
        metalness={planet.material.metalness}
        roughness={planet.material.roughness}
      />
      <Text
        position={[0, planet.size + 0.7, 0]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineColor="#000"
        outlineWidth={0.03}
        visible={focusedPlanet !== planet.label}
        material-depthTest={false} // <-- ADDED THIS
      >
        {planet.label}
      </Text>
      {focusedPlanet === planet.label && (
        <Html position={[0, planet.size + 1.5, 0]}>
          <div
            onPointerDown={(e) => e.stopPropagation()}
            className="relative text-white w-80 rounded-2xl p-6 bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl font-bold mb-3 tracking-wide">{planet.label}</h2>
              <p className="text-sm text-slate-300 mb-6">{planet.description}</p>
              <button
                onClick={() => router.push(planet.path)}
                className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                Explore
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function CameraController({ focusedPlanet, controls, isAnimating, setIsAnimating }: { focusedPlanet: string | null, controls: React.RefObject<any>, isAnimating: boolean, setIsAnimating: (isAnimating: boolean) => void }) {
  const { scene, camera } = useThree();
  useFrame(() => {
    if (!controls.current || !isAnimating) return;
    const targetPosition = new THREE.Vector3();
    const cameraPosition = new THREE.Vector3();
    if (focusedPlanet) {
      const planetObject = scene.getObjectByName(focusedPlanet);
      if (planetObject) {
        const planetData = planets.find(p => p.label === focusedPlanet)!;
        const worldPosition = new THREE.Vector3();
        planetObject.getWorldPosition(worldPosition);
        targetPosition.copy(worldPosition);
        cameraPosition.set(worldPosition.x + planetData.size * 3, worldPosition.y + planetData.size * 2, worldPosition.z + planetData.size * 3);
      }
    } else {
      targetPosition.set(0, 0, 0);
      cameraPosition.copy(initialCameraPosition);
    }
    const speed = 0.05;
    controls.current.target.lerp(targetPosition, speed);
    camera.position.lerp(cameraPosition, speed);
    controls.current.update();
    if (camera.position.distanceTo(cameraPosition) < 0.1) {
      setIsAnimating(false);
    }
  });
  return null;
}

function createOrbitPoints(radius: number, segments = 128): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(theta) * radius, 0, Math.sin(theta) * radius]);
  }
  return pts;
}

export default function SolarSystem(): JSX.Element {
  const [focusedPlanet, setFocusedPlanet] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const controlsRef = useRef<any>();

  useEffect(() => { setIsAnimating(true); }, [focusedPlanet]);
  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      const handleStart = () => { setIsAnimating(false); if (focusedPlanet) { setFocusedPlanet(null); } };
      controls.addEventListener('start', handleStart);
      return () => { controls.removeEventListener('start', handleStart); };
    }
  }, [focusedPlanet]);

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <pointLight position={[0, 0, 0]} intensity={1.5} />

          <SceneBackground />
          <Stars radius={300} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          
          {orbitRadii.map((r, i) => (
            <Line key={`orbit-${i}`} points={createOrbitPoints(r)} color="#888" lineWidth={0.5} dashed dashSize={0.15} gapSize={0.1} />
          ))}

          <Sun setFocusedPlanet={setFocusedPlanet} />

          {planets.map((p) => (
            <OrbitingPlanet key={p.label} planet={p} focusedPlanet={focusedPlanet} setFocusedPlanet={setFocusedPlanet} />
          ))}
          
          <CameraController focusedPlanet={focusedPlanet} controls={controlsRef} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
        </Suspense>
        
        <OrbitControls 
            ref={controlsRef} 
            enableZoom={true} 
            enablePan={true} 
            minDistance={15} 
            maxDistance={50} 
            autoRotate={!focusedPlanet && !isAnimating} 
            autoRotateSpeed={0.1}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={3 * Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}

