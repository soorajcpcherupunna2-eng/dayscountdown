import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// ⭐ Change this date to adjust the countdown target
const DECEMBER_START = new Date('2026-12-01T00:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function AnimatedDigit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden">
        <motion.div
          key={display}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tabular-nums"
        >
          {display}
        </motion.div>
      </div>
      <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/40 mt-2">
        {label}
      </span>
    </div>
  );
}

interface CountdownStageProps {
  visible: boolean;
  onContinue: () => void;
}

export function CountdownStage({ visible, onContinue }: CountdownStageProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(DECEMBER_START));
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(DECEMBER_START));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setShowContinue(true), 3000);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="text-center max-w-3xl w-full">
        {/* Header */}
        <motion.p
          className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-rose-400/60 mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 15 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Our Month
        </motion.p>

        <motion.h2
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white mb-4"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : 20,
            filter: visible ? 'blur(0px)' : 'blur(8px)',
          }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          December <span className="text-gradient-rose">2026</span>
        </motion.h2>

        <motion.p
          className="font-sans text-xs sm:text-base text-white/40 font-light mb-10 sm:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          We don't know the exact day yet...
        </motion.p>

        {/* Countdown label */}
        <motion.p
          className="font-sans text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white/30 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          December Begins In
        </motion.p>

        {/* Big days number */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="font-serif text-7xl sm:text-9xl md:text-[10rem] font-light text-gradient leading-none">
            {timeLeft.days}
          </div>
          <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-white/40 mt-2 block">
            Days
          </span>
        </motion.div>

        {/* Time breakdown */}
        <motion.div
          className="flex items-start justify-center gap-4 sm:gap-10 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <AnimatedDigit value={timeLeft.hours} label="Hours" />
          <div className="font-serif text-3xl sm:text-5xl text-white/20 mt-1">:</div>
          <AnimatedDigit value={timeLeft.minutes} label="Min" />
          <div className="font-serif text-3xl sm:text-5xl text-white/20 mt-1">:</div>
          <AnimatedDigit value={timeLeft.seconds} label="Sec" />
        </motion.div>

        {/* Unknown day note */}
        <motion.p
          className="font-sans text-xs sm:text-sm text-rose-400/50 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          The exact day is still unknown ❤️
        </motion.p>

        {/* Continue button */}
        {showContinue && (
          <motion.button
            onClick={onContinue}
            className="mt-10 sm:mt-14 glass-button px-8 py-3 sm:px-10 sm:py-4 rounded-full font-sans text-sm sm:text-base font-light text-white/80 tracking-wide cursor-pointer block mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{ border: 'none', outline: 'none' }}
          >
            One last thing...
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export { DECEMBER_START };
