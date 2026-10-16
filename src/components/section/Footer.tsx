'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import GitHubIcon from '@/components/icons/GithubIcon';
import XIcon from '@/components/icons/XIcon';
import DribbbleIcon from '@/components/icons/DribbbleIcon';
import ForkIcon from '@/components/icons/ForkIcon';
import StarIcon from '@/components/icons/StarIcon';
import useInView from '@/hooks/useInView';
import { config } from '@/config/config';
import { GitHubInfo } from '@/types/types';

const Footer: React.FC = () => {
  const [{ stars, forks }, setGitHubInfo] = useState<GitHubInfo>({
    stars: null,
    forks: null,
  });

  const year = new Date().getFullYear();
  const footerRef = useRef(null);
  const { hasBeenInView } = useInView(footerRef, { threshold: 0.1 });

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    fetch(`https://api.github.com/repos/s-shemmee/shemmee-codes-portfolio`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        const { stargazers_count, forks_count } = json;
        setGitHubInfo({ stars: stargazers_count, forks: forks_count });
      })
      .catch((e) => console.error(e));
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeInOut' },
    },
  };

  const focusRingClass =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText dark:focus-visible:ring-bluebellTextDark focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 rounded-sm';

  return (
    <footer
      ref={footerRef}
      className="w-full p-6 lg:px-12 flex flex-col items-center"
    >
      <motion.ul
        className="flex items-center xl:hidden space-x-8 mb-8"
        initial="hidden"
        animate={hasBeenInView ? 'visible' : 'hidden'}
        variants={variants}
      >
        <li>
          <a
            href={config.urls.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-700 dark:text-gray-300 hover:text-bluebellText dark:hover:text-bluebellTextDark ${focusRingClass}`}
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </li>
        <li>
          <a
            href={config.urls.behanceProfile}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-700 dark:text-gray-300 hover:text-bluebellText dark:hover:text-bluebellTextDark ${focusRingClass}`}
            aria-label="Behance"
          >
            <BehanceIcon />
          </a>
        </li>
        <li>
          <a
            href={config.urls.XProfile}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-700 dark:text-gray-300 hover:text-bluebellText dark:hover:text-bluebellTextDark ${focusRingClass}`}
            aria-label="X"
          >
            <XIcon />
          </a>
        </li>
        <li>
          <a
            href={config.urls.linkedinProfile}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-700 dark:text-gray-300 hover:text-bluebellText dark:hover:text-bluebellTextDark ${focusRingClass}`}
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </li>
        <li>
          <a
            href={config.urls.dribbbleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-bluebell dark:hover:text-bluebell focus:text-bluebell dark:focus:text-bluebell"
            aria-label="Dribbble"
          >
            <DribbbleIcon />
          </a>
        </li>
      </motion.ul>
      <motion.div
        className="font-serif font-medium text-center text-sm text-gray-700 dark:text-gray-300"
        initial="hidden"
        animate={hasBeenInView ? 'visible' : 'hidden'}
        variants={variants}
      >
        <a
          href={config.urls.portfolioRepository}
          className={`text-gray-700 dark:text-gray-300 hover:text-bluebellText dark:hover:text-bluebellTextDark ${focusRingClass}`}
          aria-label="Portfolio"
        >
          <div className="hover:text-bluebellText dark:hover:text-bluebellTextDark">
            Built with &#128156; by SHEMMEE &copy; {year}
          </div>
          {stars !== null && forks !== null && (
            <div className="mt-2 flex justify-center items-center space-x-4">
              <span className="flex items-center space-x-1">
                <StarIcon />
                <span>{stars}</span>
              </span>
              <span className="flex items-center space-x-1">
                <ForkIcon />
                <span>{forks}</span>
              </span>
            </div>
          )}
        </a>
      </motion.div>
    </footer>
  );
};

export default Footer;
