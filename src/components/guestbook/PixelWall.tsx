'use client';

import { useEffect, useState } from 'react';
import PixelArt from '@/components/guestbook/PixelArt';
import { TEASER_DRAWINGS } from '@/data/teaserDrawings';
import { readEntries, type WallEntry } from '@/lib/guestbook/localWall';

export default function PixelWall() {
  const [mine, setMine] = useState<WallEntry[]>([]);

  useEffect(() => {
    const load = () => setMine(readEntries());
    load();
    window.addEventListener('guestbook:update', load);
    window.addEventListener('storage', load);
    return () => {
      window.removeEventListener('guestbook:update', load);
      window.removeEventListener('storage', load);
    };
  }, []);

  const samples: WallEntry[] = TEASER_DRAWINGS.map((d) => ({
    id: d.id,
    pixels: d.pixels,
    bg: d.bg,
    name: 'Sample',
  }));
  const all = [...mine, ...samples];

  return (
    <div className="font-serif">
      <p className="mb-8 text-gray-700 dark:text-gray-300">
        <span className="font-semibold text-bluebellText dark:text-bluebellTextDark">
          {all.length}
        </span>{' '}
        {all.length === 1 ? 'drawing' : 'drawings'} on this demo wall. They are
        saved in your browser only. Connect a backend to share them between
        visitors.
      </p>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {all.map((e) => {
          const who = e.name ?? 'Anonymous';
          return (
            <li key={e.id}>
              <figure className="m-0">
                <PixelArt
                  pixels={e.pixels}
                  bg={e.bg}
                  label={`Pixel drawing by ${who}`}
                  className="aspect-square w-full rounded-md border border-gray-400 dark:border-slate-600"
                />
                <figcaption className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {who}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
