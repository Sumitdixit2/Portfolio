'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GeoObservatoryGlobe } from './geo-observatory-globe';
import { Suspense } from 'react';

export function GeospatialScene() {
  return (
    <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1.2, 6.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          {/* Primary edge-sculpting light */}
          <directionalLight position={[4, 3, 4]} intensity={0.6} color="#8892B0" />
          {/* Restrained teal counter-light */}
          <directionalLight position={[-4, -2, -3]} intensity={0.25} color="#64FFDA" />
          
          <GeoObservatoryGlobe />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.02} // Heavy inertia
            rotateSpeed={0.3} // Deliberate, slow rotation
            minPolarAngle={Math.PI / 3} // Restrict vertical rotation
            maxPolarAngle={Math.PI / 1.5}
            // Auto rotate very slowly to keep the globe feeling "alive" when idle
            autoRotate={false} // Handled custom in useFrame for better control
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
