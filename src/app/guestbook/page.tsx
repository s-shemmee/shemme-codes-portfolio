import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import GuestbookHero from '@/components/guestbook/GuestbookHero';
import GuestbookEditor from '@/components/guestbook/GuestbookEditor';
import PixelWall from '@/components/guestbook/PixelWall';
import Reveal from '@/components/widgets/Reveal';

export const metadata: Metadata = {
  title: 'Guestbook',
  description:
    'Leave a tiny 8-bit drawing on my corner of the internet and join the wall.',
};

const SectionTitle = ({
  n,
  id,
  children,
}: {
  n: string;
  id: string;
  children: React.ReactNode;
}) => (
  <h2 id={id} className="mb-8 text-2xl font-semibold">
    <span className="mr-2 font-serif text-base text-bluebellText dark:text-bluebellTextDark">
      {n}.
    </span>
    {children}
  </h2>
);

export default function GuestbookPage() {
  return (
    <SiteShell>
      <GuestbookHero />

      <div className="w-full px-4 pb-16 sm:px-6 lg:px-12">
        <div className="max-w-custom mx-auto">
          <section
            id="draw"
            aria-labelledby="draw-title"
            className="pb-12 pt-8 lg:pt-12"
          >
            <Reveal inView>
              <SectionTitle n="01" id="draw-title">
                Draw
              </SectionTitle>
            </Reveal>
            <Reveal inView delay={0.1}>
              <GuestbookEditor />
            </Reveal>
          </section>

          <section
            id="wall"
            aria-labelledby="wall-title"
            className="scroll-mt-8 py-12 sm:py-16"
          >
            <Reveal inView>
              <SectionTitle n="02" id="wall-title">
                Visitors who left a mark
              </SectionTitle>
            </Reveal>
            <Reveal inView delay={0.1}>
              <PixelWall />
            </Reveal>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
