'use client';

import React, { useState } from 'react';
import Logo from '@/components/svgs/logo.svg';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './widgets/ThemeToggle';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'About', url: '/#about' },
  { name: 'Experience', url: '/#experience' },
  { name: 'Projects', url: '/#projects' },
  { name: 'Contact', url: '/#contact' },
  { name: 'Guestbook', url: '/guestbook' },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const formatIndex = (index: number) => {
    return index.toString().padStart(2, '0');
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 font-serif">
      <nav
        className="flex items-center justify-between p-6 lg:px-12"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <motion.a
            href="/"
            className="focus-ring-sm -m-1.5 inline-flex items-center rounded-md p-1.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="sr-only">shemmee</span>
            <Logo className="h-16 w-auto" />
          </motion.a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-1.5 text-bluebellText dark:text-bluebellTextDark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open main menu'}
          >
            <span className="sr-only">
              {mobileMenuOpen ? 'Close menu' : 'Open main menu'}
            </span>
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.url}
              aria-current={item.url === pathname ? 'page' : undefined}
              className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50 hover:text-bluebellText dark:hover:text-bluebellTextDark aria-[current=page]:text-bluebellText dark:aria-[current=page]:text-bluebellTextDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText dark:focus-visible:ring-bluebellTextDark focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 rounded-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
            >
              <span className="text-bluebellText dark:text-bluebellTextDark">
                {formatIndex(index + 1)}.{' '}
              </span>
              {item.name}
            </motion.a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: (navigation.length + 1) * 0.1 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </nav>
      <Dialog
        className="lg:hidden font-serif"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-slate-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="focus-ring-sm -m-1.5 inline-flex items-center rounded-md p-1.5"
            >
              <span className="sr-only">shemmee</span>
              <Logo className="h-16 w-auto" />
            </a>
            <button
              type="button"
              className="focus-ring-sm -m-2.5 rounded-md p-1.5 text-bluebellText dark:text-bluebellTextDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText dark:focus-visible:ring-bluebellTextDark focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.url}
                    aria-current={item.url === pathname ? 'page' : undefined}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-400/10 aria-[current=page]:text-bluebellText dark:aria-[current=page]:text-bluebellTextDark"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-bluebellText dark:text-bluebellTextDark">
                      {formatIndex(index + 1)}.{' '}
                    </span>
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
};

export default Header;
