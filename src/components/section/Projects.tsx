'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import GitHubIcon from '@/components/icons/GithubIcon';
import LinkIcon from '@/components/icons/LinkIcon';
import Image from 'next/image';
import projectData from '@/data/projects.json';
import { Project } from '@/types/types';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const buttonStyles =
  'focus-ring-sm inline-flex items-center justify-center rounded-full p-2 text-gray-700 transition-colors duration-300 hover:bg-gray-200 hover:text-bluebellText dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-bluebellTextDark';

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  hasBeenInView: boolean;
}> = ({ project, index, hasBeenInView }) => {
  const isImageLeft = index % 2 === 0;

  return (
    <motion.div
      className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} mb-16`}
      initial="hidden"
      animate={hasBeenInView ? 'visible' : 'hidden'}
      variants={textVariants}
      custom={index + 1}
    >
      <div className="md:w-1/2 relative">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src={project.image}
            alt={`${project.title} - Project Preview`}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105 hover:brightness-110"
            width={600}
            height={400}
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-bluebell opacity-15 hover:opacity-0 transition-opacity duration-300 rounded-lg"></div>
        </div>
      </div>
      <div
        className={`md:w-1/2 p-4 flex flex-col justify-center ${
          isImageLeft ? 'md:pl-10' : 'md:pr-10'
        }`}
      >
        <h3 className="text-xl font-sans font-bold mb-4">{project.title}</h3>
        <p className="text-gray-700 text-base font-sans leading-loose dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <ul className="flex flex-wrap space-x-2 mb-4">
          {project.techStack.map((tech: string) => (
            <li
              key={tech}
              className="font-serif text-sm text-bluebellText dark:text-bluebellTextDark"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex space-x-4 mt-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code of ${project.title} on GitHub`}
            title="Source Code"
            className={buttonStyles}
          >
            <GitHubIcon />
          </a>
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Check out the live demo of ${project.title}`}
            title="Live Demo"
            className={buttonStyles}
          >
            <LinkIcon />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const { hasBeenInView } = useInView(projectsRef, { threshold: 0.1 });

  return (
    <motion.div
      ref={projectsRef}
      className="w-full p-4 md:p-6 lg:px-12"
      id="projects"
      initial="hidden"
      animate={hasBeenInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="max-w-custom mx-auto py-16 md:py-28">
        <motion.h2
          className="text-[1.75rem] text-gray-900 font-sans font-semibold dark:text-gray-50 flex items-center mb-16"
          initial="hidden"
          animate={hasBeenInView ? 'visible' : 'hidden'}
          variants={textVariants}
          custom={0}
        >
          <span
            className="text-xl text-bluebellText dark:text-bluebellTextDark font-serif"
            style={{ transform: 'translateY(-0.15em)' }}
          >
            03.
          </span>
          <span className="ml-4">Some Things I&apos;ve Built</span>
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700 ml-4 max-w-xs"></span>
        </motion.h2>
        {projectData.map((project: Project, index: number) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            hasBeenInView={hasBeenInView}
          />
        ))}
        <div className="mt-10 flex justify-end">
          <a
            href="https://github.com/s-shemmee?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See More Projects"
            className="focus-ring inline-flex items-center justify-center rounded-lg border-2 border-bluebell bg-transparent px-4 py-3 font-serif text-bluebellText transition-all duration-300 hover:-translate-y-0.5 hover:bg-bluebell hover:bg-opacity-10 hover:shadow-lg dark:text-bluebellTextDark"
          >
            See More Projects
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
