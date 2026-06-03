import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { logo } from "../assets";

const DURATION = 1800;
const EASE = [0.76, 0, 0.24, 1];

const PageLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const pct = Math.min(((now - start) / DURATION) * 100, 100);
      setProgress(Math.round(pct));
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setSplitting(true), 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!splitting) return;
    const t = setTimeout(() => {
      setGone(true);
      onComplete();
    }, 1080);
    return () => clearTimeout(t);
  }, [splitting, onComplete]);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[500]">
      {/* Top curtain — slides up on reveal */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-[#0a0a0a]"
        style={{ height: "50vh" }}
        animate={splitting ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 0.78, ease: EASE, delay: splitting ? 0.28 : 0 }}
      />

      {/* Bottom curtain — slides down on reveal */}
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-[#0a0a0a]"
        style={{ height: "50vh" }}
        animate={splitting ? { y: "100%" } : { y: "0%" }}
        transition={{ duration: 0.78, ease: EASE, delay: splitting ? 0.28 : 0 }}
      />

      {/* Centered content: logo + bar + counter */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-9"
        animate={splitting ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
      >
        {/* Logo with ambient glow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <div
            className="absolute rounded-full bg-white"
            style={{
              inset: "-100%",
              filter: "blur(48px)",
              opacity: 0.08,
            }}
          />
          <img
            src={logo}
            alt="DJ"
            className="w-12 h-12 object-contain relative z-10"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </motion.div>

        {/* Progress bar + counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42 }}
          className="flex flex-col items-center gap-[10px]"
        >
          {/* Track */}
          <div className="relative w-[156px]" style={{ height: "1px" }}>
            <div className="absolute inset-0 bg-white/[0.12]" />
            {/* Fill — width driven by progress state */}
            <div
              className="absolute inset-y-0 left-0 bg-white/60 transition-none"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer head */}
            {progress > 0 && progress < 100 && (
              <div
                className="absolute top-0 w-[6px] h-full"
                style={{
                  left: `${progress}%`,
                  transform: "translateX(-50%)",
                  background:
                    "radial-gradient(ellipse 6px 4px at center, rgba(255,255,255,0.95), transparent)",
                }}
              />
            )}
          </div>

          {/* 3-digit counter */}
          <span
            className="font-mono tabular-nums select-none"
            style={{
              fontSize: "11px",
              letterSpacing: "6px",
              color: "rgba(255,255,255,0.18)",
            }}
          >
            {String(progress).padStart(3, "0")}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageLoader;
