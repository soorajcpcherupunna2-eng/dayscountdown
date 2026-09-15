import { useCallback, useEffect } from 'react';
import { ExperienceCanvas, useStageManager, type Stage } from '@/components/ExperienceCanvas';
import { OpeningStage } from '@/components/stages/OpeningStage';
import { CountdownStage } from '@/components/stages/CountdownStage';
import { OneLastThingStage } from '@/components/stages/OneLastThingStage';

function StageTransition({ stage }: { stage: Stage }) {
  // This component renders a brief radial overlay flash during transitions
  if (stage === 'opening') return null;
  return null;
}

export default function App() {
  const { stage, goToStage } = useStageManager();

  const handleBegin = useCallback(() => {
    goToStage('countdown');
  }, [goToStage]);

  const handleContinue = useCallback(() => {
    goToStage('oneLastThing');
  }, [goToStage]);

  const handleOneLastThingComplete = useCallback(() => {
    goToStage('surprise');
  }, [goToStage]);

  // Prevent scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#05030a] overflow-hidden">
      {/* Radial gradient background overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(232,73,107,0.08) 0%, rgba(5,3,10,0) 60%)',
        }}
      />

      {/* 3D Canvas - always rendered */}
      <ExperienceCanvas stage={stage} />

      {/* Stage UIs - all mounted, visibility controlled by framer-motion */}
      <OpeningStage onBegin={handleBegin} visible={stage === 'opening'} />
      <CountdownStage visible={stage === 'countdown'} onContinue={handleContinue} />
      <OneLastThingStage
        visible={stage === 'oneLastThing' || stage === 'surprise'}
        onComplete={handleOneLastThingComplete}
      />

      <StageTransition stage={stage} />

      {/* Vignette overlay for cinematic feel */}
      <div
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,3,10,0.4) 100%)',
        }}
      />
    </div>
  );
}
