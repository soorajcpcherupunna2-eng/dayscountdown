import { useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { GlassHeart } from './3d/GlassHeart';
import { ParticleField } from './3d/ParticleField';
import { DecemberScene } from './3d/DecemberScene';

export type Stage = 'opening' | 'countdown' | 'oneLastThing' | 'surprise';

interface ExperienceProps {
  stage: Stage;
}

function CameraController({ stage }: { stage: Stage }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 6));
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Smooth camera position based on stage
    let target: [number, number, number] = [0, 0, 6];
    if (stage === 'opening') target = [0, 0, 6];
    else if (stage === 'countdown') target = [0, 0, 8];
    else if (stage === 'oneLastThing') target = [0, 0, 12];
    else if (stage === 'surprise') target = [0, 0, 5];

    // Parallax from mouse / touch
    if (stage === 'opening' || stage === 'countdown') {
      targetPos.current.x = target[0] + state.pointer.x * 0.5;
      targetPos.current.y = target[1] + state.pointer.y * 0.3;
      targetPos.current.z = target[2];
    } else {
      targetPos.current.set(target[0], target[1], target[2]);
    }

    camera.position.lerp(targetPos.current, Math.min(delta * 2, 1));
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} color="#ff4d6d" />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ff5b80" distance={20} />
      <pointLight position={[-5, -3, 3]} intensity={1.5} color="#e8496b" distance={15} />
      <pointLight position={[0, 0, 8]} intensity={1} color="#ffffff" distance={10} />
      <spotLight
        position={[0, 8, 4]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        color="#ffb3c6"
      />
    </>
  );
}

function SceneContent({ stage }: { stage: Stage }) {
  const heartRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (heartRef.current) {
      const s = stage === 'surprise' ? 1.3 : stage === 'opening' ? 1 : 0.6;
      heartRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.05);
    }
  });

  return (
    <>
      <Lights />

      {/* Always present heart, scaled by stage */}
      <group ref={heartRef}>
        <GlassHeart scale={1} />
      </group>

      {/* Particles */}
      <ParticleField count={400} size={0.02} color="#ff5b80" radius={10} opacity={0.5} speed={1} />
      <ParticleField count={200} size={0.012} color="#ffffff" radius={6} opacity={0.3} speed={0.5} />

      {/* December scene visible during countdown */}
      <DecemberScene active={stage === 'countdown' || stage === 'oneLastThing'} />

      {/* Fog */}
      <fog attach="fog" args={['#05030a', 4, 18]} />
    </>
  );
}

export function ExperienceCanvas({ stage }: ExperienceProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent stage={stage} />
          <CameraController stage={stage} />
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              radius={0.6}
            />
            <DepthOfField
              focusDistance={0.02}
              focalLength={0.05}
              bokehScale={2.5}
            />
            <Vignette eskil={false} offset={0.3} darkness={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

export function useStageManager() {
  const [stage, setStage] = useState<Stage>('opening');

  const goToStage = useCallback((s: Stage) => {
    setStage(s);
  }, []);

  return { stage, goToStage };
}
