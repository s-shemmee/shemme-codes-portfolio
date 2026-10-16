'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import GitHubIcon from '@/components/icons/GithubIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import XIcon from '@/components/icons/XIcon';
import BehanceIcon from '@/components/icons/BehanceIcon';
import useInView from '@/hooks/useInView';
import { config } from '@/config/config';

const Sides: React.FC = () => {
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  const { hasBeenInView: leftSideInView } = useInView(leftSideRef, {
    threshold: 0.1,
  });
  const { hasBeenInView: rightSideInView } = useInView(rightSideRef, {
    threshold: 0.1,
  });

  const heroAnimationDuration = 2;
  const sideAnimationDelay = heroAnimationDuration + 0.5;

  const socialLinkStyles =
    'focus-ring-sm inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700 transition-colors duration-300 hover:text-bluebellText dark:text-gray-300 dark:hover:text-bluebellTextDark';

  const socialMediaLinks = [
    {
      href: config.urls.githubProfile,
      icon: <GitHubIcon />,
      label: 'GitHub',
    },
    {
      href: config.urls.behanceProfile,
      icon: <BehanceIcon />,
      label: 'Behance',
    },
    {
      href: config.urls.XProfile,
      icon: <XIcon />,
      label: 'X',
    },
    {
      href: config.urls.linkedinProfile,
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
    },
  ];

  return (
    <div className="hidden min-[1300px]:block">
      <motion.div
        ref={leftSideRef}
        className="fixed bottom-0 left-3 min-[1300px]:left-12 w-10 z-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: leftSideInView ? 1 : 0,
          y: leftSideInView ? 0 : 20,
        }}
        transition={{ duration: 0.5, delay: sideAnimationDelay }}
      >
        <div className="flex flex-col items-center">
          <motion.ul
            className="space-y-3 mb-6 list-none p-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: leftSideInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {socialMediaLinks.map((link) => (
              <motion.li
                key={link.href}
                className="transition-transform hover:-translate-y-1"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialLinkStyles}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            className="w-px h-24 bg-gray-900 dark:bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: leftSideInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </motion.div>
      <motion.div
        ref={rightSideRef}
        className="fixed bottom-0 right-3 min-[1300px]:right-12 w-10 z-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: rightSideInView ? 1 : 0,
          y: rightSideInView ? 0 : 20,
        }}
        transition={{ duration: 0.5, delay: sideAnimationDelay }}
      >
        <div className="flex flex-col items-center">
          <motion.a
            href={`mailto:${config.urls.email}`}
            className="focus-ring-sm mb-6 inline-flex items-center justify-center rounded-sm px-1 font-serif text-sm font-medium tracking-widest text-gray-700 transition-transform hover:-translate-y-1 hover:text-bluebellText dark:text-gray-300 dark:hover:text-bluebellTextDark [writing-mode:vertical-lr]"
            initial={{ opacity: 0 }}
            animate={{ opacity: rightSideInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            aria-label={`Email ${config.urls.email}`}
          >
            {config.urls.email}
          </motion.a>
          <motion.div
            className="w-px h-24 bg-gray-900 dark:bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: rightSideInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sides;
