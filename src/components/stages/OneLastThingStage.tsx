import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface OneLastThingStageProps {
  visible: boolean;
  onComplete: () => void;
}

export function OneLastThingStage({ visible, onComplete }: OneLastThingStageProps) {
  const [phase, setPhase] = useState<'text' | 'button' | 'surprise'>('text');

  useEffect(() => {
    if (!visible) {
      setPhase('text');
      return;
    }
    const t = setTimeout(() => setPhase('button'), 1800);
    return () => clearTimeout(t);
  }, [visible]);

  const handleOpen = () => {
    setPhase('surprise');
    setTimeout(onComplete, 3000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.5 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <AnimatePresence mode="wait">
        {phase === 'text' && (
          <motion.div
            key="text"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="font-serif text-4xl sm:text-6xl font-light text-white/80 italic"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              One last thing...
            </motion.h2>
          </motion.div>
        )}

        {phase === 'button' && (
          <motion.div
            key="button"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.p
              className="font-sans text-sm sm:text-base text-white/40 font-light tracking-wide mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Open this...
            </motion.p>
            <motion.button
              onClick={handleOpen}
              className="glass-button pulse-glow relative w-20 h-20 sm:w-28 sm:h-28 rounded-full inline-flex items-center justify-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              style={{ border: 'none', outline: 'none' }}
            >
              <Heart
                size={32}
                className="text-rose-400 fill-rose-500/40"
                strokeWidth={1.5}
              />
            </motion.button>
          </motion.div>
        )}

        {phase === 'surprise' && (
          <motion.div
            key="surprise"
            className="text-center max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 inline-flex"
            >
              <Heart
                size={48}
                className="text-rose-400 fill-rose-500/60"
                strokeWidth={1}
              />
            </motion.div>

            <motion.h2
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-gradient leading-tight mb-6"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              I'm counting
              <br />
              every second.
            </motion.h2>

            <motion.p
              className="font-sans text-base sm:text-xl text-white/50 font-light italic leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              Until the moment I finally hold you,
              <br />
              and the distance becomes
              <span className="text-gradient-rose"> nothing </span>
              but a memory.
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              <p className="font-serif text-2xl sm:text-3xl text-rose-400/70 italic">
                Forever yours.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
