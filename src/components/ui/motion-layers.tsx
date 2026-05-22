'use client';

import dynamic from 'next/dynamic';

const CursorTrail = dynamic(() => import('./cursor-trail').then(mod => mod.CursorTrail), { ssr: false });
const AstronomicalLayer = dynamic(() => import('./astronomical-layer').then(mod => mod.AstronomicalLayer), { ssr: false });

export function MotionLayers() {
  return (
    <>
      <AstronomicalLayer />
      <CursorTrail />
    </>
  );
}
