import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

const ACCENT = '#64FFDA';
const MUTED = '#8892B0';
const SURFACE = '#112240';

export function AnnotationRail({ position, label, value }: { position: [number, number, number], label: string, value: string }) {
  return (
    <Html position={position} center className="pointer-events-none">
      <div className="flex flex-col gap-1 w-32 border-l-2 border-accent/30 pl-2 bg-background/80 backdrop-blur-sm drafting-border p-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted border-b border-border/50 pb-1 mb-0.5 inline-block">
          [{label}]
        </span>
        <span className="font-mono text-[10px] text-foreground">
          {value}
        </span>
      </div>
    </Html>
  );
}

export function RuntimeCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current && outerRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      outerRef.current.rotation.y = -state.clock.elapsedTime * 0.05;
      outerRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh ref={outerRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color={MUTED} wireframe transparent opacity={0.15} />
      </mesh>
      <AnnotationRail position={[1.8, 1.2, 0]} label="RUNTIME_CORE" value="NODE.JS / BUN" />
    </group>
  );
}

export function ApiLayer({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshBasicMaterial color={SURFACE} transparent opacity={0.7} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.2} />
      </mesh>
      <AnnotationRail position={[-1.2, 1, 0]} label="API_GATEWAY" value="EXPRESS.JS" />
    </group>
  );
}

export function DataLayer({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[0, (i - 1) * 0.6, 0]}>
          <mesh>
            <cylinderGeometry args={[1, 1, 0.4, 16]} />
            <meshBasicMaterial color={SURFACE} transparent opacity={0.8} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[1, 1, 0.4, 16]} />
            <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      ))}
      <AnnotationRail position={[1.5, 1, 0]} label="DATA_STORE" value="POSTGRES / REDIS" />
    </group>
  );
}

export function InfraLayer({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <torusGeometry args={[1.5, 0.05, 8, 24]} />
        <meshBasicMaterial color={MUTED} wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial color={SURFACE} wireframe transparent opacity={0.3} />
      </mesh>
      <AnnotationRail position={[-1.5, -1, 0]} label="INFRA_ORCH" value="DOCKER / NGINX" />
    </group>
  );
}

export function CiCdRelay({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[[-1, 0, 0], [0, 0, 0], [1, 0, 0]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.5} />
        </mesh>
      ))}
      <AnnotationRail position={[0, -0.8, 0]} label="CI_CD_PIPELINE" value="ACTIONS" />
    </group>
  );
}

export function DataTraces() {
  const trace1 = useMemo(() => [new THREE.Vector3(-4, 2, -3), new THREE.Vector3(-1.5, 0, 0)], []);
  const trace2 = useMemo(() => [new THREE.Vector3(4, -2, -2), new THREE.Vector3(1.5, 0, 0)], []);
  const trace3 = useMemo(() => [new THREE.Vector3(-3, -3, 3), new THREE.Vector3(0, -1.5, 0)], []);
  const trace4 = useMemo(() => [new THREE.Vector3(3, 3, 2), new THREE.Vector3(0, 1.5, 0)], []);

  return (
    <group>
      <Line points={trace1} color={ACCENT} opacity={0.15} transparent lineWidth={1} dashed dashScale={10} dashSize={1} dashOffset={0} />
      <Line points={trace2} color={ACCENT} opacity={0.15} transparent lineWidth={1} dashed dashScale={10} dashSize={1} dashOffset={0} />
      <Line points={trace3} color={ACCENT} opacity={0.15} transparent lineWidth={1} dashed dashScale={10} dashSize={1} dashOffset={0} />
      <Line points={trace4} color={ACCENT} opacity={0.15} transparent lineWidth={1} dashed dashScale={10} dashSize={1} dashOffset={0} />
    </group>
  );
}

export function EngineAssembly() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Extremely slow axial drift
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.02) * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={[0.8, 0.8, 0.8]}>
      <RuntimeCore />
      <ApiLayer position={[-4, 2, -3]} />
      <DataLayer position={[4, -2, -2]} />
      <InfraLayer position={[-3, -3, 3]} />
      <CiCdRelay position={[3, 3, 2]} />
      <DataTraces />
    </group>
  );
}
