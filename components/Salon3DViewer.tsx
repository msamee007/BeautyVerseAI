"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text, Float, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 0.8, 32]} />
        <meshStandardMaterial color="#eee" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Leaves */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} castShadow position={[Math.random()*0.2 - 0.1, 1 + Math.random() * 0.6, Math.random()*0.2 - 0.1]} rotation={[Math.random(), Math.random() * Math.PI, Math.random()]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#2d5a27" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function WallArt({ position, rotation, color }: { position: [number, number, number], rotation: [number, number, number], color: string }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[2.5, 3.5, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[2.3, 3.3]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}

function SalonInterior({ isMobile, category, salonName, accentColor }: { isMobile: boolean, category: string, salonName: string, accentColor: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  const isMale = category === 'male';
  const isPet = category === 'pet';

  const floorColor = isMale ? "#1a1a1a" : isPet ? "#dbeafe" : "#fdf8f6";
  const floorTileColor = isMale ? "#222" : isPet ? "#bfdbfe" : "#f3e8e0";
  const wallColor = isMale ? "#151515" : isPet ? "#eff6ff" : "#fff";
  
  // Create a highly detailed checkered floor effect procedurally
  const tiles = [];
  for (let x = -15; x < 15; x += 2) {
    for (let z = -15; z < 15; z += 2) {
      tiles.push(
        <mesh key={`${x}-${z}`} receiveShadow position={[x + 1, -1.99, z + 1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.96, 1.96]} />
          <meshStandardMaterial color={(Math.abs(x) + Math.abs(z)) % 4 === 0 ? floorColor : floorTileColor} roughness={0.1} metalness={0.3} />
        </mesh>
      );
    }
  }

  return (
    <group ref={group}>
      {/* Floor Base */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.01, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={floorColor} roughness={0.2} />
      </mesh>
      
      {tiles}

      {/* Back Wall */}
      <mesh receiveShadow position={[0, 4, -8]}>
        <boxGeometry args={[40, 12, 1]} />
        <meshStandardMaterial color={wallColor} roughness={1} />
      </mesh>

      {/* Side Walls */}
      <mesh receiveShadow position={[-15, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[40, 12, 1]} />
        <meshStandardMaterial color={wallColor} roughness={1} />
      </mesh>
      <mesh receiveShadow position={[15, 4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[40, 12, 1]} />
        <meshStandardMaterial color={wallColor} roughness={1} />
      </mesh>

      {/* Artwork */}
      <WallArt position={[-14.4, 3, -2]} rotation={[0, Math.PI / 2, 0]} color={accentColor} />
      <WallArt position={[14.4, 3, -2]} rotation={[0, -Math.PI / 2, 0]} color={accentColor} />

      {/* Plants */}
      <Plant position={[-12, -2, -5]} />
      <Plant position={[12, -2, -5]} />
      <Plant position={[-8, -2, 5]} />

      {/* Reception Desk */}
      <group position={[9, -2, 3]} rotation={[0, -Math.PI / 5, 0]}>
        <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
          <boxGeometry args={[5, 3, 1.2]} />
          <meshStandardMaterial color={isMale ? "#111" : "#f8f8f8"} metalness={0.2} roughness={0.3} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 3.1, 0]}>
          <boxGeometry args={[5.2, 0.2, 1.4]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Stations */}
      {[...Array(4)].map((_, i) => (
        <group key={i} position={[(i - 1.5) * 4.5, -2, -6.5]}>
          
          {/* Mirror / Back Panel */}
          <mesh castShadow position={[0, 4, 0]}>
            <boxGeometry args={[3, 6, 0.2]} />
            <meshStandardMaterial color={isMale ? "#0a0a0a" : "#f0f0f0"} roughness={0.7} />
          </mesh>
          
          {/* Mirror Reflection Area */}
          <mesh position={[0, 4, 0.11]}>
            <planeGeometry args={[2.8, 5.8]} />
            <meshPhysicalMaterial color="#fff" roughness={0.0} metalness={1.0} clearcoat={1} />
          </mesh>

          {/* Station Desk/Counter */}
          <mesh castShadow receiveShadow position={[0, 1.2, 1.0]}>
            <boxGeometry args={[3.2, 0.2, 1.5]} />
            <meshStandardMaterial color={isMale ? "#222" : "#fff"} metalness={0.5} roughness={0.1} />
          </mesh>
          
          {/* Desk Base/Drawers */}
          <mesh castShadow receiveShadow position={[0, 0.5, 1.0]}>
            <boxGeometry args={[3.0, 1.0, 1.3]} />
            <meshStandardMaterial color={isMale ? "#151515" : "#e5e5e5"} />
          </mesh>

          {/* Detailed Chair */}
          <group position={[0, 0.5, 3.5]}>
            {/* Base */}
            <mesh castShadow position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
              <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh castShadow position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.9, 32]} />
              <meshStandardMaterial color="#555" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Seat */}
            <RoundedBox args={[1.5, 0.25, 1.5]} radius={0.08} position={[0, 0.65, 0]} castShadow>
              <meshStandardMaterial color={isMale ? "#2a1608" : isPet ? "#3b82f6" : "#f472b6"} roughness={0.7} />
            </RoundedBox>
            {/* Backrest */}
            <RoundedBox args={[1.5, 1.4, 0.25]} radius={0.08} position={[0, 1.45, -0.6]} castShadow>
              <meshStandardMaterial color={isMale ? "#2a1608" : isPet ? "#3b82f6" : "#f472b6"} roughness={0.7} />
            </RoundedBox>
            {/* Arm rests */}
            <mesh castShadow position={[-0.8, 1.1, 0]}>
              <boxGeometry args={[0.15, 0.1, 1.2]} />
              <meshStandardMaterial color={isMale ? "#111" : "#555"} />
            </mesh>
            <mesh castShadow position={[-0.8, 0.85, -0.4]}>
              <boxGeometry args={[0.1, 0.4, 0.1]} />
              <meshStandardMaterial color="#555" metalness={0.8} />
            </mesh>
            <mesh castShadow position={[0.8, 1.1, 0]}>
              <boxGeometry args={[0.15, 0.1, 1.2]} />
              <meshStandardMaterial color={isMale ? "#111" : "#555"} />
            </mesh>
            <mesh castShadow position={[0.8, 0.85, -0.4]}>
              <boxGeometry args={[0.1, 0.4, 0.1]} />
              <meshStandardMaterial color="#555" metalness={0.8} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Floating 3D Signage */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1} position={[0, 8.5, -7.4]}>
        <Text
          fontSize={1.4}
          color={accentColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={24}
          textAlign="center"
          fontWeight="bold"
        >
          {salonName.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export function Salon3DViewer({ category = "female", salonName = "Premium Studio", accentColor = "#d4af37" }: { category?: string, salonName?: string, accentColor?: string }) {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div className="relative w-full h-[600px] bg-[#1a1a1a] rounded-3xl overflow-hidden border border-border group shadow-2xl">
      {!isInteractive && (
        <div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer hover:bg-black/50 transition-all"
          onClick={() => setIsInteractive(true)}
        >
          <span className="text-6xl mb-4">✨</span>
          <h3 className="text-3xl font-bold text-white mb-2 text-center px-4">Explore {salonName} in 3D</h3>
          <p className="text-white/80 mb-6 font-medium">Ultra-Realistic Environment</p>
          <button className="px-8 py-3 bg-white text-black font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
            Enter Virtual Space
          </button>
        </div>
      )}

      {isInteractive && (
        <div className="absolute top-6 right-6 z-10 flex gap-4">
          <div className="px-5 py-2 bg-black/60 backdrop-blur-md text-white rounded-full text-sm font-bold border border-white/20 flex items-center gap-3">
            <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: accentColor }}></div>
            {category.toUpperCase()}
          </div>
          <button 
            onClick={() => setIsInteractive(false)}
            className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-all"
          >
            Exit 3D View
          </button>
        </div>
      )}

      <Canvas shadows camera={{ position: [0, 5, 14], fov: 50 }}>
        <color attach="background" args={[category === 'male' ? "#050505" : category === 'pet' ? "#dbeafe" : "#fdf8f6"]} />
        <ambientLight intensity={0.4} />
        
        {/* Cinematic Lighting */}
        <spotLight position={[0, 20, 0]} angle={0.8} penumbra={0.8} intensity={1} castShadow shadow-mapSize={2048} />
        <spotLight position={[-10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color={accentColor} castShadow />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={0.8} color="#ffffff" />
        
        <Environment preset="city" />
        
        <SalonInterior isMobile={false} category={category} salonName={salonName} accentColor={accentColor} />
        
        <ContactShadows position={[0, -1.99, 0]} opacity={0.8} scale={40} blur={2.5} far={10} />

        {isInteractive && <OrbitControls enablePan={true} maxPolarAngle={Math.PI / 2 - 0.05} minDistance={5} maxDistance={25} target={[0, 1, -2]} />}
      </Canvas>
    </div>
  );
}
