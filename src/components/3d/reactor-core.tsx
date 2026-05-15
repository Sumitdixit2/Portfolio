'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

// --- BLUEPRINT MATERIAL PALETTE — Reactor Core ---
const MAT_CORE = new THREE.MeshStandardMaterial({
  color: '#020617',      // near-void black — primary structural mass
  roughness: 0.85,
  metalness: 0.15,
});

const MAT_ALLOY = new THREE.MeshStandardMaterial({
  color: '#07111F',      // deep navy alloy — precision groove trim
  roughness: 0.6,
  metalness: 0.35,
});

const MAT_EMISSIVE = new THREE.MeshStandardMaterial({
  color: '#64FFDA',
  emissive: '#64FFDA',
  emissiveIntensity: 0.6,  // brighter than the surroundings — makes nodes pop from darkness
  roughness: 0.1,
  metalness: 0.9,
});

export function ReactorCore({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const coreGroup = useRef<THREE.Group>(null);
  const upperPlates = useRef<THREE.Group>(null);
  const lowerPlates = useRef<THREE.Group>(null);

  useFrame((state) => {
    const rawP = scrollProgress.get();
    const t = state.clock.elapsedTime;
    // Core separates last, deepest — 0.42→0.57 of scroll (~210vh at 1400vh total)
    const p = Math.max(0, Math.min(1, (rawP - 0.42) * 6.667));

    // ── Nucleus: rotation speed modulates on a slow calibration cycle ──
    if (coreGroup.current) {
      // Base rotation + slow sinusoidal speed variation (feels like active balancing)
      const speedMod = 0.08 + Math.sin(t * 0.3) * 0.04;
      coreGroup.current.rotation.y += speedMod * (1 / 60);
      // Tiny pitch oscillation — mechanical stabilisation nudge
      coreGroup.current.rotation.x = Math.sin(t * 0.17) * 0.015;
    }

    // ── Emissive pulse: slow operational heartbeat ──
    // Two overlapping low-freq sines → irregular but never chaotic
    const pulse = 0.45 + Math.sin(t * 0.8) * 0.12 + Math.sin(t * 0.31) * 0.06;
    MAT_EMISSIVE.emissiveIntensity = pulse;

    // ── Upper plates: separation + continuous counter-rotation calibration ──
    if (upperPlates.current) {
      upperPlates.current.position.y = p * 1.5 + Math.sin(t * 0.25) * 0.04 * p;
      // Separation yaw + slow independent calibration drift after separation
      upperPlates.current.rotation.y = p * Math.PI * 0.25 + t * 0.04 * p;
    }

    // ── Lower plates: mirror but offset phase ──
    if (lowerPlates.current) {
      lowerPlates.current.position.y = -(p * 1.5 + Math.sin(t * 0.25 + 1.2) * 0.04 * p);
      lowerPlates.current.rotation.y = -(p * Math.PI * 0.25 + t * 0.04 * p);
    }
  });

  return (
    <group ref={coreGroup}>
      {/* Central Nucleus */}
      <mesh material={MAT_CORE}>
        <cylinderGeometry args={[0.8, 0.8, 2.0, 32]} />
      </mesh>
      
      {/* Precision Grooves */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} material={MAT_ALLOY} position={[0, (i - 2.5) * 0.3, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.05, 32]} />
        </mesh>
      ))}

      {/* Emissive alignment ring */}
      <mesh material={MAT_EMISSIVE} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.02, 32]} />
      </mesh>

      {/* Upper Core Plates */}
      <group ref={upperPlates}>
        <mesh material={MAT_CORE} position={[0, 1.2, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.3, 16]} />
        </mesh>
        <mesh material={MAT_ALLOY} position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.6, 0.9, 0.2, 16]} />
        </mesh>
        {/* Detail nodes */}
        {[...Array(4)].map((_, i) => (
          <mesh key={i} material={MAT_EMISSIVE} position={[Math.sin(i * Math.PI / 2) * 0.7, 1.4, Math.cos(i * Math.PI / 2) * 0.7]}>
            <cylinderGeometry args={[0.05, 0.05, 0.25, 8]} />
          </mesh>
        ))}
      </group>

      {/* Lower Core Plates */}
      <group ref={lowerPlates}>
        <mesh material={MAT_CORE} position={[0, -1.2, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.3, 16]} />
        </mesh>
        <mesh material={MAT_ALLOY} position={[0, -1.4, 0]}>
          <cylinderGeometry args={[0.9, 0.6, 0.2, 16]} />
        </mesh>
        {/* Detail nodes */}
        {[...Array(4)].map((_, i) => (
          <mesh key={i} material={MAT_EMISSIVE} position={[Math.sin(i * Math.PI / 2) * 0.7, -1.4, Math.cos(i * Math.PI / 2) * 0.7]}>
            <cylinderGeometry args={[0.05, 0.05, 0.25, 8]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
