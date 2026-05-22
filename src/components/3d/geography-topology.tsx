'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import worldTopology from '../../data/world-topology.json';

// Spherical projection helper matching geo-observatory-globe.tsx
function latLongToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  // Match the coordinate handedness and coordinate-to-Cartesian mapping in the main globe component
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Deterministic coordinate-based hash to skip segments
// This creates a premium, scanned/fragmented topology look at zero runtime cost
function shouldSkipSegment(lng1: number, lat1: number, lng2: number, lat2: number, index: number): boolean {
  // Simple coordinate-based deterministic pseudo-random hash
  const val = Math.sin(lng1 * 12.9898 + lat1 * 78.233 + index * 2.0) * 43758.5453;
  const hash = val - Math.floor(val);
  
  // 12% chance of random fragmentation gaps to preserve continental continuity
  if (hash < 0.12) return true;
  
  // Structured periodic gaps (dashes) reduced for better structural legibility
  if (index % 14 >= 13) return true;
  
  return false;
}

interface GeographyTopologyProps {
  radius?: number;
  color?: string;
  opacity?: number;
}

export function GeographyTopology({
  radius = 2.002, // Marginally larger than GLOBE_RADIUS to eliminate Z-fighting
  color = '#4a7fa5', // Subdued tactical blue
  opacity = 0.32, // Set to the newly requested 0.30-0.34 range
}: GeographyTopologyProps) {
  const vertices = useMemo(() => {
    const points: number[] = [];

    // Cast JSON to array of arrays of coordinate pairs
    const topology = worldTopology as number[][][];

    topology.forEach((line) => {
      for (let i = 0; i < line.length - 1; i++) {
        const [lng1, lat1] = line[i];
        const [lng2, lat2] = line[i + 1];

        // Skip specific segments to create the tactile scanned effect
        if (shouldSkipSegment(lng1, lat1, lng2, lat2, i)) {
          continue;
        }

        const p1 = latLongToVector3(lat1, lng1, radius);
        const p2 = latLongToVector3(lat2, lng2, radius);

        points.push(p1.x, p1.y, p1.z);
        points.push(p2.x, p2.y, p2.z);
      }
    });

    return new Float32Array(points);
  }, [radius]);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[vertices, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
