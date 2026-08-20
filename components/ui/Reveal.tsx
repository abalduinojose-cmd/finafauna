"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  atraso?: number; // segundos
};

// Wrapper de animação on-scroll: sobe suavemente ao entrar na viewport.
// O <MotionConfig reducedMotion="user"> no provider desativa o deslocamento
// para quem prefere menos movimento (fica só um fade), sem quebrar a hidratação.
export default function Reveal({ children, className, atraso = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, delay: atraso, ease: [0.21, 0.65, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
