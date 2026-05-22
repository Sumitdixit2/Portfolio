'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line, Sphere } from '@react-three/drei';
import { GeographyTopology } from './geography-topology';

// Helper to convert Lat/Lng to Cartesian 3D coordinates on a sphere
function latLongToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

export function GeoObservatoryGlobe() {
  const globeGroup = useRef<THREE.Group>(null);
  const markerGroup = useRef<THREE.Group>(null);
  
  const GLOBE_RADIUS = 2;
  const DELHI_LAT = 28.6139;
  const DELHI_LNG = 77.2090;

  // Compute Delhi position
  const delhiPos = useMemo(() => latLongToVector3(DELHI_LAT, DELHI_LNG, GLOBE_RADIUS), []);
  // A point slightly above surface for the rail
  const railEndPos = useMemo(() => latLongToVector3(DELHI_LAT, DELHI_LNG, GLOBE_RADIUS + 0.5), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Extremely slow autonomous rotation
    if (globeGroup.current) {
      globeGroup.current.rotation.y = time * 0.015;
    }

    // Pulse the marker ring
    if (markerGroup.current) {
      const pulseScale = 1 + Math.sin(time * 2) * 0.15;
      markerGroup.current.scale.setScalar(pulseScale);
      markerGroup.current.rotation.z = time * 0.5;
    }
  });

  return (
    <group>
      {/* Container for everything that rotates with the globe */}
      <group ref={globeGroup}>
        {/* Solid Dark Core */}
        <Sphere args={[GLOBE_RADIUS, 64, 64]}>
          <meshBasicMaterial color="#020617" />
        </Sphere>

        {/* Abstracted World Borders */}
        <GeographyTopology 
          radius={GLOBE_RADIUS + 0.002} 
          color="#4a7fa5" 
          opacity={0.32} 
        />

        {/* Sparse lat/long wireframe — restrained topology */}
        <Sphere args={[GLOBE_RADIUS + 0.005, 24, 12]}>
          <meshBasicMaterial 
            color="#1e3a5f" 
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </Sphere>

        {/* Equator Ring — teal accent */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[GLOBE_RADIUS + 0.01, GLOBE_RADIUS + 0.018, 64]} />
          <meshBasicMaterial color="#64FFDA" transparent opacity={0.25} side={THREE.DoubleSide} />
        </mesh>

        {/* Prime Meridian Ring */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <ringGeometry args={[GLOBE_RADIUS + 0.01, GLOBE_RADIUS + 0.018, 64]} />
          <meshBasicMaterial color="#4a7fa5" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>

        {/* 30° Tropic rings — subtle structural reference */}
        <mesh rotation={[Math.PI / 2 - 0.524, 0, 0]}>
          <ringGeometry args={[GLOBE_RADIUS + 0.008, GLOBE_RADIUS + 0.012, 64]} />
          <meshBasicMaterial color="#4a7fa5" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 2 + 0.524, 0, 0]}>
          <ringGeometry args={[GLOBE_RADIUS + 0.008, GLOBE_RADIUS + 0.012, 64]} />
          <meshBasicMaterial color="#4a7fa5" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>

        {/* Delhi Deployment Node */}
        <group position={delhiPos}>
          {/* Ensure marker is rotated to face out from center */}
          <group lookAt={new THREE.Vector3(0,0,0).copy(delhiPos).multiplyScalar(2)}>
            {/* Core Beacon */}
            <mesh>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshBasicMaterial color="#64FFDA" />
            </mesh>
            
            {/* Calibration Pulse Ring */}
            <group ref={markerGroup}>
              <mesh>
                <ringGeometry args={[0.06, 0.065, 32]} />
                <meshBasicMaterial color="#64FFDA" transparent opacity={0.6} side={THREE.DoubleSide} />
              </mesh>
              {/* Secondary faint outer ring */}
              <mesh>
                <ringGeometry args={[0.1, 0.102, 32]} />
                <meshBasicMaterial color="#64FFDA" transparent opacity={0.2} side={THREE.DoubleSide} />
              </mesh>
            </group>
          </group>
        </group>

        {/* Annotation Rail pointing away from Delhi */}
        <Line
          points={[delhiPos, railEndPos]}
          color="#64FFDA"
          lineWidth={1}
          transparent
          opacity={0.4}
        />
        {/* Cap point at the end of the rail */}
        <mesh position={railEndPos}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#64FFDA" transparent opacity={0.8} />
        </mesh>

      </group>

      {/* Static Observatory Drafting Elements — equatorial bracket */}
      <group>
        {/* Outer targeting ring — teal, very low opacity */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[GLOBE_RADIUS + 0.35, GLOBE_RADIUS + 0.358, 64]} />
          <meshBasicMaterial color="#64FFDA" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
        {/* Orthographic calibration arc — segmented */}
        <mesh rotation={[0.3, 0.5, 0]}>
          <ringGeometry args={[GLOBE_RADIUS + 0.55, GLOBE_RADIUS + 0.553, 64, 1, 0, Math.PI * 0.6]} />
          <meshBasicMaterial color="#8892B0" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-0.3, 1.8, 0]}>
          <ringGeometry args={[GLOBE_RADIUS + 0.55, GLOBE_RADIUS + 0.553, 64, 1, 0, Math.PI * 0.4]} />
          <meshBasicMaterial color="#8892B0" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
