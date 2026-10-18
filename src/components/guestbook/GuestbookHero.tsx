'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.5, ease: 'easeInOut' },
  }),
};

const GuestbookHero: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const anim = (i: number) => ({
    variants: item,
    custom: i,
    initial: reduceMotion ? false : 'hidden',
    animate: 'visible',
  });

  return (
    <section
      aria-labelledby="gb-hero-title"
      className="w-full px-4 sm:px-6 lg:px-12"
    >
      <header className="max-w-custom mx-auto pb-10 pt-36 text-center sm:pt-44 lg:pb-14 lg:pt-52 2xl:pt-60">
        {' '}
        <motion.p
          {...anim(0)}
          className="mb-4 font-serif text-base text-bluebellText dark:text-bluebellTextDark sm:text-lg"
        >
          {'// a tiny corner of the internet'}
        </motion.p>
        <motion.h1
          {...anim(1)}
          id="gb-hero-title"
          className="m-0 font-sans text-[2rem] font-semibold leading-[1.05] text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <span className="text-lavenderRoseText dark:text-softLilac">
            Leave a pixel.
          </span>
          <br />
          Become part of the wall.
        </motion.h1>
        <motion.p
          {...anim(2)}
          className="mx-auto mt-5 max-w-xl font-serif text-base leading-7 text-gray-700 dark:text-gray-300 sm:text-lg"
        >
          Draw a tiny 16×16 icon and it joins the wall.
        </motion.p>
        <motion.a
          {...anim(3)}
          href="#wall"
          className="mt-4 inline-block rounded-sm font-serif text-sm text-bluebellText underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText focus-visible:ring-offset-2 dark:text-bluebellTextDark dark:focus-visible:ring-bluebellTextDark dark:focus-visible:ring-offset-slate-950"
        >
          See the wall ⤵
        </motion.a>
      </header>
    </section>
  );
};

export default GuestbookHero;
