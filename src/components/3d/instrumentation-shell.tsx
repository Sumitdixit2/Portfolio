'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

import { usePerformanceStore } from '@/lib/performance-store';

// --- BLUEPRINT MATERIAL PALETTE — Instrumentation Shell ---
const MAT_SHELL = new THREE.MeshStandardMaterial({
  color: '#020617',      // near-void — large shell body (must NOT be bright)
  roughness: 0.95,
  metalness: 0.05,
  side: THREE.DoubleSide,
});

const MAT_EDGE = new THREE.MeshStandardMaterial({
  color: '#0A192F',      // deep navy alloy — interior trim strip
  roughness: 0.5,
  metalness: 0.4,
  side: THREE.DoubleSide,
});

const MAT_WIRE = new THREE.MeshBasicMaterial({
  color: '#64FFDA',
  wireframe: true,
  transparent: true,
  opacity: 0.04,         // ghost-level — structural ghost, not dominant
});

export function InstrumentationShell({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const shellGroup = useRef<THREE.Group>(null);
  const shellParts = useRef<(THREE.Group | null)[]>([]);

  useFrame((state) => {
    const tier = usePerformanceStore.getState().fpsTier;
    const rawP = scrollProgress.get();
    // Shell opens very gradually — 0.05→0.20 of scroll (~210vh at 1400vh total)
    const p = Math.max(0, Math.min(1, (rawP - 0.05) * 6.667));
    const t = state.clock.elapsedTime;

    if (tier === 'low') {
      if (shellGroup.current) shellGroup.current.rotation.y = -(t * 0.018);
      shellParts.current.forEach((part, i) => {
        if (part) {
          const angle = i * (Math.PI / 2);
          const radiusExplode = p * 4.5;
          const yBase = (i % 2 === 0 ? 1 : -1) * p * 1.5;
          part.position.set(Math.sin(angle) * radiusExplode, yBase, Math.cos(angle) * radiusExplode);
          part.rotation.x = Math.cos(angle) * p * 0.3;
          part.rotation.z = -Math.sin(angle) * p * 0.3;
        }
      });
      return;
    }

    // ── Shell group: slow counter-rotation with subtle speed modulation ──
    if (shellGroup.current) {
      shellGroup.current.rotation.y = -(t * 0.018 + Math.sin(t * 0.12) * 0.01);
    }

    // ── Panels: explosion + per-panel micro rebalancing (4 unique phase offsets) ──
    shellParts.current.forEach((part, i) => {
      if (part) {
        const angle = i * (Math.PI / 2);
        const radiusExplode = p * 4.5;
        const yBase = (i % 2 === 0 ? 1 : -1) * p * 1.5;

        // Each panel gets a unique phase so they NEVER oscillate identically
        const phaseOffset = i * (Math.PI / 2.3); // irrational-ish multiplier
        const microRadius = Math.sin(t * 0.19 + phaseOffset) * 0.08 * p;
        const microY = Math.sin(t * 0.25 + phaseOffset) * 0.05 * p;

        // Final position = exploded base + live calibration micro-correction
        part.position.x = Math.sin(angle) * (radiusExplode + microRadius);
        part.position.z = Math.cos(angle) * (radiusExplode + microRadius);
        part.position.y = yBase + microY;

        // Tilt outward during opening + micro rotational stabilisation
        const microRotX = Math.sin(t * 0.21 + phaseOffset) * 0.01 * p;
        const microRotZ = Math.cos(t * 0.17 + phaseOffset) * 0.01 * p;
        part.rotation.x = Math.cos(angle) * p * 0.3 + microRotX;
        part.rotation.z = -Math.sin(angle) * p * 0.3 + microRotZ;
      }
    });
  });

  return (
    <group ref={shellGroup}>
      {[...Array(4)].map((_, i) => (
        <group 
          key={i} 
          ref={(el) => {
            shellParts.current[i] = el;
          }}
        >
          {/* Main Shell Panel (Quarter Sphere) */}
          <mesh material={MAT_SHELL} rotation={[0, i * (Math.PI / 2), 0]}>
            <sphereGeometry args={[2.8, 32, 32, 0.05, (Math.PI / 2) - 0.1, 0.2, Math.PI - 0.4]} />
          </mesh>
          
          {/* Inner Edge / Trim */}
          <mesh material={MAT_EDGE} rotation={[0, i * (Math.PI / 2), 0]}>
            <sphereGeometry args={[2.75, 16, 16, 0.05, (Math.PI / 2) - 0.1, 0.2, Math.PI - 0.4]} />
          </mesh>

          {/* Wireframe Hologram overlay */}
          <mesh material={MAT_WIRE} rotation={[0, i * (Math.PI / 2), 0]}>
            <sphereGeometry args={[2.85, 8, 8, 0.05, (Math.PI / 2) - 0.1, 0.2, Math.PI - 0.4]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
