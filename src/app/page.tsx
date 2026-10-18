'use client';

import React, { useState, useEffect } from 'react';
import Loading from './loading';
import Header from '@/components/Header';
import Hero from '@/components/section/Hero';
import About from '@/components/section/About';
import Experience from '@/components/section/Experience';
import Projects from '@/components/section/Projects';
import Footer from '@/components/section/Footer';
import Contact from '@/components/section/Contact';
import Sides from '@/components/section/Sides';
import GuestbookTeaser from '@/components/section/GuestbookTeaser';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="flex flex-col items-center px-2">
          <Header />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <GuestbookTeaser />
          <Contact />
          <Footer />
          <Sides />
        </main>
      )}
    </>
  );
}
