'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import AsciiTextParticles from '@/components/AsciiTextParticles';

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold text-bluebellText dark:text-bluebellTextDark">
    {children}
  </span>
);

const About: React.FC = () => {
  const aboutRef = useRef(null);
  const { hasBeenInView } = useInView(aboutRef, { threshold: 0.1 });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <div
      ref={aboutRef}
      className="w-full px-4 py-12 sm:px-6 md:p-6 lg:px-12"
      id="about"
    >
      <div className="max-w-custom mx-auto py-6 sm:py-12 md:py-20 lg:py-28">
        <motion.h2
          className="text-2xl sm:text-[1.75rem] text-gray-900 font-sans font-semibold dark:text-gray-50 flex items-center mb-8 sm:mb-10"
          initial="hidden"
          animate={hasBeenInView ? 'visible' : 'hidden'}
          variants={textVariants}
          custom={0}
        >
          <span
            className="text-xl text-bluebellText dark:text-bluebellTextDark font-serif"
            style={{ transform: 'translateY(-0.15em)' }}
          >
            01.
          </span>
          <span className="ml-4">About Me</span>
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700 ml-4 max-w-xs"></span>
        </motion.h2>
        <div className="flex flex-col md:flex-row md:gap-12">
          <motion.div
            className="w-full md:flex-[2]"
            initial="hidden"
            animate={hasBeenInView ? 'visible' : 'hidden'}
            variants={textVariants}
            custom={1}
          >
            {[
              <>
                I&apos;m Shemmee, a frontend engineer based in Morocco, working
                mostly with React, Next.js, and TypeScript. I care about the
                details that make an interface{' '}
                <Highlight>work for everyone</Highlight>: the spacing, the
                motion, how a page responds however you use it.
              </>,
              <>
                I&apos;m self-taught, and I{' '}
                <Highlight>learn by building</Highlight>: make something, get it
                wrong, make it better. That curiosity eventually led me to the
                back end, because I want to understand what happens after the
                click as much as before it.
              </>,
              <>
                I treat design and code as one job, so I usually{' '}
                <Highlight>sketch the interface first</Highlight>, then build it
                to behave the way the sketch promised. Off the keyboard,
                I&apos;m gaming or being supervised by my cats.
              </>,
            ].map((content, index) => (
              <motion.p
                key={index}
                className="text-gray-700 text-sm sm:text-base font-sans dark:text-gray-300 mt-4 leading-relaxed sm:leading-loose"
                custom={index + 2}
                variants={textVariants}
              >
                {content}
              </motion.p>
            ))}
          </motion.div>
          <motion.div
            className="flex justify-center md:justify-end md:flex-[1] relative mt-8 md:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: hasBeenInView ? 1 : 0,
              x: hasBeenInView ? 0 : 20,
            }}
            transition={{
              duration: 0.5,
              delay: hasBeenInView ? 0.2 : 0,
            }}
          >
            <div className="w-full max-w-[300px] overflow-hidden rounded-lg border-2 border-bluebell bg-slate-100 shadow-[10px_10px_0_0_rgba(106,113,250,0.18)] dark:bg-slate-900">
              <AsciiTextParticles
                src="/ascii/portrait.txt"
                alt="ASCII Portrait of Shemmee, three-quarter view"
                aspect={4 / 5}
                maxWidth={300}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
