'use client';

import PixelEditor from '@/components/guestbook/PixelEditor';
import { addEntry } from '@/lib/guestbook/localWall';

export default function GuestbookEditor() {
  // Demo: drawings are saved in this browser only. See the README to connect a backend.
  const handleSubmit = async (entry: {
    pixels: string;
    bg: string;
    name: string | null;
  }) => {
    addEntry({ pixels: entry.pixels, bg: entry.bg, name: entry.name });
    return { ok: true };
  };

  return <PixelEditor onSubmit={handleSubmit} />;
}
