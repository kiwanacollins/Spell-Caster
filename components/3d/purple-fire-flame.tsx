'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function PurpleFireFlame() {
  const flameRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/purple-fire-flame.glb');

  // Clone the scene to avoid reusing the same instance
  const clonedScene = scene.clone();

  // Gentle flickering and floating animation
  useFrame((state) => {
    if (flameRef.current) {
      // Gentle rotation
      flameRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Flickering effect - subtle up and down movement
      flameRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.15;
      
      // Slight scale pulsing for flame effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
      flameRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <primitive
      ref={flameRef}
      object={clonedScene}
      scale={3}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial 
        color="#9966CC" 
        opacity={0.3} 
        transparent 
        emissive="#9966CC"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export function PurpleFireFlameScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 2]}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting setup for mystical purple flame */}
          <ambientLight intensity={0.5} color="#9966CC" />
          <pointLight 
            position={[0, 2, 2]} 
            intensity={2} 
            color="#CC66FF"
            distance={15}
            decay={2}
          />
          <pointLight 
            position={[0, -1, 2]} 
            intensity={1.2} 
            color="#6633CC"
            distance={10}
            decay={2}
          />
          <directionalLight
            position={[3, 3, 5]}
            intensity={0.6}
            color="#9966FF"
          />

          {/* The purple fire flame */}
          <PurpleFireFlame />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/3d/purple-fire-flame.glb');
