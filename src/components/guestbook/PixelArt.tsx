import type { ReactElement } from 'react';
import { BACKGROUNDS, EMPTY, GRID_SIZE, PALETTE } from '@/config/guestbook';

type Props = {
  pixels: string;
  bg: string;
  label: string;
  className?: string;
};

export default function PixelArt({ pixels, bg, label, className }: Props) {
  const bgHex = BACKGROUNDS.find((b) => b.id === bg)?.hex ?? '#2b2250';
  const rects: ReactElement[] = [];

  for (let r = 0; r < GRID_SIZE; r++) {
    let c = 0;
    while (c < GRID_SIZE) {
      const ch = pixels[r * GRID_SIZE + c];
      if (ch === EMPTY) {
        c++;
        continue;
      }
      let end = c + 1;
      while (end < GRID_SIZE && pixels[r * GRID_SIZE + end] === ch) end++;
      const hex = PALETTE.find((p) => p.id === ch)?.hex ?? bgHex;
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={c}
          y={r}
          width={end - c}
          height={1}
          fill={hex}
        />
      );
      c = end;
    }
  }

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
      shapeRendering="crispEdges"
      className={className}
    >
      <rect width={GRID_SIZE} height={GRID_SIZE} fill={bgHex} />
      {rects}
    </svg>
  );
}
