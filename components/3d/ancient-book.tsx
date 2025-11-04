'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function AncientBook() {
  const bookRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d/An_ancient_book_aged.glb');

  // Clone the scene to avoid reusing the same instance
  const clonedScene = scene.clone();

  // Slow rotation animation
  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      bookRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <primitive
      ref={bookRef}
      object={clonedScene}
      scale={2}
      position={[0, 0, 0]}
      rotation={[0.1, 0, 0]}
    />
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8B6F47" opacity={0.5} transparent />
    </mesh>
  );
}

export function AncientBookScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 1.5]}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting setup for mystical atmosphere */}
          <ambientLight intensity={0.4} color="#CC8800" />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.6}
            color="#F4E8D0"
          />
          <pointLight position={[-5, 3, -5]} intensity={0.3} color="#8B6F47" />

          {/* The ancient book */}
          <AncientBook />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/3d/An_ancient_book_aged.glb');
