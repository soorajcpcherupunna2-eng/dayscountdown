import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface OpeningStageProps {
  onBegin: () => void;
  visible: boolean;
}

export function OpeningStage({ onBegin, visible }: OpeningStageProps) {
  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="text-center max-w-2xl">
        {/* Subtitle */}
        <motion.p
          className="font-sans text-sm sm:text-base tracking-[0.3em] uppercase text-white/50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          For the girl I'm waiting to meet...
        </motion.p>

        {/* Main title */}
        <motion.h1
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-light leading-tight mb-4"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 30,
            filter: visible ? 'blur(0px)' : 'blur(10px)',
          }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-gradient">Until</span>{' '}
          <span className="text-gradient-rose italic">December</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-sans text-sm sm:text-lg text-white/40 font-light tracking-wide mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          The month our distance finally ends.
        </motion.p>

        {/* Glass button */}
        <motion.button
          onClick={onBegin}
          className="glass-button pulse-glow relative px-10 py-4 sm:px-12 sm:py-5 rounded-full font-sans text-base sm:text-lg font-light text-white/90 tracking-wide inline-flex items-center gap-3 cursor-pointer"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 30,
            scale: visible ? 1 : 0.9,
          }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          style={{ border: 'none', outline: 'none' }}
        >
          <span>Begin</span>
          <Heart size={18} className="text-rose-400 fill-rose-400/50" />
        </motion.button>
      </div>

      {/* Bottom hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 0.4 : 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30">
          Best experienced with sound on
        </p>
      </motion.div>
    </motion.div>
  );
}
