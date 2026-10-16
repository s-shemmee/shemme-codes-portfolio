'use client';

import React, { useRef } from 'react';
import ScrollMouse from '@/components/widgets/ScrollMouse';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import Image from 'next/image';

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1 + i * 0.2,
      duration: 0.7,
      ease: 'easeInOut',
    },
  }),
};

const handWaveVariants = (reduceMotion: boolean): Variants => ({
  hidden: { rotate: 0 },
  visible: {
    rotate: reduceMotion ? [0] : [0, 10, -10, 10, -10, 0],
    transition: {
      repeat: reduceMotion ? 0 : Infinity,
      duration: reduceMotion ? 0.01 : 1,
      ease: 'easeInOut',
    },
  },
});

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { hasBeenInView } = useInView(heroRef, { threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section ref={heroRef} className="w-full px-4 py-6 sm:px-6 lg:px-12">
      <header className="max-w-custom mx-auto mt-24 py-12 text-center sm:mt-32 sm:py-16 lg:mt-48 lg:py-24">
        <motion.h1
          className="font-serif text-base sm:text-xl lg:text-[1.75rem] font-normal text-bluebellText dark:text-bluebellTextDark mb-3 sm:mb-8"
          initial="hidden"
          animate={hasBeenInView ? 'visible' : 'hidden'}
          custom={0}
          variants={textVariants}
        >
          Hey there!
          <motion.span
            className="ml-2 inline-block"
            variants={handWaveVariants(shouldReduceMotion)}
            initial="hidden"
            animate={hasBeenInView ? 'visible' : 'hidden'}
          >
            <Image
              src="/images/waving-hand.png"
              alt="Waving Hand"
              width={32}
              height={32}
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 inline-block scale-x-[-1]"
            />
          </motion.span>
        </motion.h1>
        <motion.h1
          className="font-sans text-[2.2rem] leading-[0.95] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-lavenderRoseText dark:text-softLilac m-0"
          initial="hidden"
          animate={hasBeenInView ? 'visible' : 'hidden'}
          custom={1}
          variants={textVariants}
        >
          I&apos;m Shemmee
        </motion.h1>
        <motion.p
          className="font-serif text-base sm:text-lg lg:text-[1.25rem] font-normal text-bluebellText dark:text-bluebellTextDark mt-2 mb-2"
          initial="hidden"
          animate={hasBeenInView ? 'visible' : 'hidden'}
          custom={2}
          variants={textVariants}
        >
          &
        </motion.p>
        <motion.h2
          className="font-sans text-[2.2rem] leading-[0.95] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 dark:text-gray-50 m-0"
          initial="hidden"
          animate={hasBeenInView ? 'visible' : 'hidden'}
          custom={3}
          variants={textVariants}
        >
          I build stuff for the web.
        </motion.h2>
        <motion.div
          initial="hidden"
          animate={hasBeenInView ? 'visible' : 'hidden'}
          custom={4}
          variants={textVariants}
        >
          <ScrollMouse />
        </motion.div>
      </header>
    </section>
  );
};

export default Hero;
