'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  inView?: boolean;
  className?: string;
};

const Reveal: React.FC<Props> = ({
  children,
  delay = 0,
  inView = false,
  className,
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      {...(inView
        ? { whileInView: visible, viewport: { once: true, margin: '-80px' } }
        : { animate: visible })}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
