import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingNumberProps {
  text: string;
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}

function FloatingNumber({ text, position, scale = 1, color = '#ff5b80', speed = 1 }: FloatingNumberProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.3;
      ref.current.rotation.z = Math.sin(t * 0.3 * speed + position[2]) * 0.1;
      ref.current.rotation.y = t * 0.1 * speed;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <Text
        fontSize={1}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={color}
        outlineOpacity={0.3}
        material-transparent
        material-opacity={0.7}
      >
        {text}
      </Text>
    </group>
  );
}

interface DecemberSceneProps {
  active: boolean;
}

export function DecemberScene({ active }: DecemberSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  const numbers = useMemo(() => {
    const items: { text: string; position: [number, number, number]; scale: number; speed: number }[] = [];
    const labels = ['12', '25', '31', '01', 'DEC', '12', '25', '01', '31', 'XII'];
    for (let i = 0; i < labels.length; i++) {
      const angle = (i / labels.length) * Math.PI * 2;
      const r = 4 + Math.random() * 2;
      items.push({
        text: labels[i],
        position: [
          Math.cos(angle) * r,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * r - 2,
        ],
        scale: 0.3 + Math.random() * 0.3,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} visible={active}>
      {numbers.map((n, i) => (
        <FloatingNumber
          key={i}
          text={n.text}
          position={n.position}
          scale={n.scale}
          speed={n.speed}
          color={i % 3 === 0 ? '#ff5b80' : '#ffb3c6'}
        />
      ))}
    </group>
  );
}
