import Link from 'next/link';
import PixelArt from '@/components/guestbook/PixelArt';
import Reveal from '@/components/widgets/Reveal';
import { TEASER_DRAWINGS } from '@/data/teaserDrawings';

export default function GuestbookTeaser() {
  return (
    <section
      id="guestbook-teaser"
      aria-labelledby="guestbook-teaser-title"
      className="w-full px-4 py-12 sm:px-6 md:p-6 lg:px-12"
    >
      <div className="max-w-custom mx-auto">
        <Reveal inView>
          <div className="flex flex-col items-start gap-10 rounded-lg border border-bluebellText bg-white p-8 shadow-[8px_8px_0_rgba(99,102,241,0.25)] dark:border-bluebellTextDark dark:bg-slate-900 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-md">
              <p className="mb-2 font-serif text-sm text-bluebellText dark:text-bluebellTextDark">
                &lt;guestbook&gt;
              </p>
              <h2
                id="guestbook-teaser-title"
                className="mb-3 font-sans text-2xl font-semibold leading-tight text-lavenderRoseText dark:text-softLilac sm:text-3xl"
              >
                Leave a pixel. Become part of the wall.
              </h2>
              <p className="mb-6 font-serif text-base leading-7 text-gray-700 dark:text-gray-300">
                Draw a tiny 8-bit signature and say you were here. No email, no
                account. Every drawing joins the wall.
              </p>
              <Link
                href="/guestbook"
                className="inline-flex min-h-[44px] items-center rounded-md bg-bluebellText px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText focus-visible:ring-offset-2 dark:bg-bluebellTextDark dark:text-slate-950 dark:focus-visible:ring-bluebellTextDark dark:focus-visible:ring-offset-slate-950"
              >
                Sign the guestbook →
              </Link>
            </div>

            <ul
              aria-label="Example guestbook drawings"
              className="grid shrink-0 grid-cols-3 gap-3"
            >
              {TEASER_DRAWINGS.map((d) => (
                <li key={d.id}>
                  <PixelArt
                    pixels={d.pixels}
                    bg={d.bg}
                    label={d.label}
                    className="h-[72px] w-[72px] rounded border border-gray-400 dark:border-slate-600 sm:h-20 sm:w-20"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
