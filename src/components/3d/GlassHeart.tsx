import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeartProps {
  scale?: number;
  floatSpeed?: number;
}

function createHeartShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.5);
  shape.bezierCurveTo(0, 0.6, -0.1, 0.9, -0.5, 0.9);
  shape.bezierCurveTo(-1.1, 0.9, -1.1, 0.1, -1.1, 0.1);
  shape.bezierCurveTo(-1.1, -0.3, -0.6, -0.6, 0, -1.1);
  shape.bezierCurveTo(0.6, -0.6, 1.1, -0.3, 1.1, 0.1);
  shape.bezierCurveTo(1.1, 0.1, 1.1, 0.9, 0.5, 0.9);
  shape.bezierCurveTo(0.1, 0.9, 0, 0.6, 0, 0.5);
  return shape;
}

export function GlassHeart({ scale = 1, floatSpeed = 1 }: HeartProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const heartShape = useMemo(() => createHeartShape(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3 * floatSpeed;
      meshRef.current.position.y = Math.sin(t * 0.5 * floatSpeed) * 0.15;
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.03;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5 * floatSpeed;
      innerRef.current.rotation.x = t * 0.2;
    }
  });

  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelSegments: 12,
    bevelSize: 0.15,
    bevelThickness: 0.15,
    curveSegments: 64,
  };

  return (
    <group scale={scale}>
      <mesh ref={meshRef} castShadow>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshPhysicalMaterial
          color="#e8496b"
          metalness={0.3}
          roughness={0.05}
          transmission={0.85}
          thickness={1.2}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
          transparent
          opacity={0.9}
          emissive="#e8496b"
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh ref={innerRef} scale={0.45}>
        <extrudeGeometry args={[heartShape, { ...extrudeSettings, depth: 0.5 }]} />
        <meshStandardMaterial
          color="#ff5b80"
          emissive="#ff2d55"
          emissiveIntensity={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}
