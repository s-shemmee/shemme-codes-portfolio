'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import {
  BACKGROUNDS,
  EMPTY,
  GRID_SIZE,
  NAME_MAX,
  PALETTE,
  PIXEL_COUNT,
} from '@/config/guestbook';
import { validateEntry } from '@/lib/guestbook/validate';

type Tool = 'pencil' | 'eraser' | 'fill';

type SubmitResult = { ok: boolean; error?: string };

type Props = {
  onSubmit?: (entry: {
    pixels: string;
    bg: string;
    name: string | null;
    website: string;
  }) => Promise<SubmitResult>;
  submitting?: boolean;
};

const TOOLS: { id: Tool; label: string }[] = [
  { id: 'pencil', label: 'Pencil' },
  { id: 'eraser', label: 'Eraser' },
  { id: 'fill', label: 'Fill' },
];

const blankGrid = () => Array<string>(PIXEL_COUNT).fill(EMPTY);

function floodFill(grid: string[], start: number, next: string): string[] {
  const target = grid[start];
  if (target === next) return grid;
  const out = [...grid];
  const stack = [start];
  while (stack.length) {
    const i = stack.pop() as number;
    if (out[i] !== target) continue;
    out[i] = next;
    const r = Math.floor(i / GRID_SIZE);
    const c = i % GRID_SIZE;
    if (r > 0) stack.push(i - GRID_SIZE);
    if (r < GRID_SIZE - 1) stack.push(i + GRID_SIZE);
    if (c > 0) stack.push(i - 1);
    if (c < GRID_SIZE - 1) stack.push(i + 1);
  }
  return out;
}

const PixelEditor: React.FC<Props> = ({ onSubmit, submitting = false }) => {
  const [pixels, setPixels] = useState<string[]>(blankGrid);
  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState<string>('9');
  const [bg, setBg] = useState<string>(BACKGROUNDS[0].id);
  const [name, setName] = useState('');
  const [cursor, setCursor] = useState({ r: 0, c: 0 });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot, must stay empty

  const gridRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastIndex = useRef(-1);

  const bgHex = BACKGROUNDS.find((b) => b.id === bg)?.hex ?? '#2b2250';
  const colorHex = (id: string) =>
    id === EMPTY ? bgHex : PALETTE.find((p) => p.id === id)?.hex ?? bgHex;
  const colorName = (id: string) =>
    id === EMPTY ? 'empty' : PALETTE.find((p) => p.id === id)?.name ?? '';

  const applyAt = (index: number, isStart: boolean) => {
    setError('');
    setDone(false);
    setPixels((prev) => {
      if (tool === 'fill') {
        return isStart ? floodFill(prev, index, color) : prev;
      }
      const value = tool === 'eraser' ? EMPTY : color;
      if (prev[index] === value) return prev;
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const indexFromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return -1;
    const clamp = (n: number) => Math.min(GRID_SIZE - 1, Math.max(0, n));
    const c = clamp(
      Math.floor(((e.clientX - rect.left) / rect.width) * GRID_SIZE)
    );
    const r = clamp(
      Math.floor(((e.clientY - rect.top) / rect.height) * GRID_SIZE)
    );
    setCursor({ r, c });
    return r * GRID_SIZE + c;
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    const i = indexFromPointer(e);
    lastIndex.current = i;
    if (i >= 0) applyAt(i, true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || tool === 'fill') return;
    const i = indexFromPointer(e);
    if (i < 0 || i === lastIndex.current) return;
    lastIndex.current = i;
    applyAt(i, false);
  };

  const stopDrawing = () => {
    dragging.current = false;
    lastIndex.current = -1;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const move = (dr: number, dc: number) => {
      e.preventDefault();
      setCursor(({ r, c }) => ({
        r: Math.min(GRID_SIZE - 1, Math.max(0, r + dr)),
        c: Math.min(GRID_SIZE - 1, Math.max(0, c + dc)),
      }));
    };
    const i = cursor.r * GRID_SIZE + cursor.c;
    switch (e.key) {
      case 'ArrowUp':
        return move(-1, 0);
      case 'ArrowDown':
        return move(1, 0);
      case 'ArrowLeft':
        return move(0, -1);
      case 'ArrowRight':
        return move(0, 1);
      case ' ':
      case 'Enter':
        e.preventDefault();
        return applyAt(i, true);
      case 'Backspace':
      case 'Delete':
        e.preventDefault();
        return setPixels((prev) => {
          const next = [...prev];
          next[i] = EMPTY;
          return next;
        });
    }
  };

  const handleSubmit = async () => {
    const result = validateEntry({ pixels: pixels.join(''), bg, name });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError('');
    setDone(false);
    const res = await onSubmit?.({ ...result.value, website });
    if (!res) return;
    if (res.ok) {
      setPixels(blankGrid());
      setName('');
      setDone(true);
    } else {
      setError(res.error ?? 'Something went wrong.');
    }
  };

  const activeIndex = cursor.r * GRID_SIZE + cursor.c;

  const toolBtn = (active: boolean) =>
    `min-h-[44px] rounded-md border px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText dark:focus-visible:ring-bluebellTextDark ${
      active
        ? 'border-bluebellText bg-bluebellText text-white dark:border-bluebellTextDark dark:bg-bluebellTextDark dark:text-slate-950'
        : 'border-gray-400 text-gray-900 dark:border-slate-600 dark:text-gray-50'
    }`;

  const swatch = (selected: boolean) =>
    `h-11 w-11 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText dark:focus-visible:ring-bluebellTextDark focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
      selected
        ? 'border-[3px] border-white ring-2 ring-slate-900 dark:ring-white'
        : 'border border-gray-400 dark:border-slate-600'
    }`;

  return (
    <div className="flex flex-col items-start gap-10 font-serif lg:flex-row">
      <div className="w-full max-w-[416px] rounded-lg border border-bluebellText bg-white p-4 shadow-[8px_8px_0_rgba(99,102,241,0.25)] dark:border-bluebellTextDark dark:bg-slate-900">
        <div
          ref={gridRef}
          role="application"
          aria-label="Pixel drawing canvas, 16 by 16. Use arrow keys to move, space to paint, backspace to erase."
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          className="grid aspect-square w-full cursor-crosshair select-none gap-px rounded bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText dark:focus-visible:ring-bluebellTextDark"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            touchAction: 'none',
          }}
        >
          {pixels.map((p, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{ backgroundColor: colorHex(p) }}
              className={
                i === activeIndex
                  ? 'outline outline-2 -outline-offset-2 outline-white mix-blend-difference'
                  : ''
              }
            />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Row {cursor.r + 1}, column {cursor.c + 1},{' '}
          {colorName(pixels[activeIndex])}
        </p>
      </div>

      <div className="flex w-full flex-1 flex-col gap-6">
        <fieldset>
          <legend className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            Tools
          </legend>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={tool === t.id}
                onClick={() => setTool(t.id)}
                className={toolBtn(tool === t.id)}
              >
                {t.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPixels(blankGrid())}
              className={toolBtn(false)}
            >
              Clear
            </button>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            Colors
          </legend>
          <div className="flex flex-wrap gap-2">
            {PALETTE.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-label={p.name}
                aria-pressed={color === p.id}
                onClick={() => {
                  setColor(p.id);
                  if (tool === 'eraser') setTool('pencil');
                }}
                style={{ backgroundColor: p.hex }}
                className={swatch(color === p.id)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            Background
          </legend>
          <div className="flex flex-wrap gap-2">
            {BACKGROUNDS.map((b) => (
              <button
                key={b.id}
                type="button"
                aria-label={`Background ${b.name}`}
                aria-pressed={bg === b.id}
                onClick={() => setBg(b.id)}
                style={{ backgroundColor: b.hex }}
                className={swatch(bg === b.id)}
              />
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="gb-name"
            className="mb-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            Name (optional, max {NAME_MAX} characters)
          </label>
          <input
            id="gb-name"
            type="text"
            maxLength={NAME_MAX}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name or a nickname"
            className="w-full rounded-md border border-gray-400 bg-transparent px-3 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText dark:border-slate-600 dark:text-gray-50 dark:focus-visible:ring-bluebellTextDark"
          />
        </div>

        {/* Honeypot: invisible to people, bots tend to fill it */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="min-h-[44px] rounded-md bg-bluebellText px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluebellText focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-bluebellTextDark dark:text-slate-950 dark:focus-visible:ring-bluebellTextDark dark:focus-visible:ring-offset-slate-950"
          >
            {submitting ? 'Sending…' : 'Submit my pixel'}
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Appears on the wall right away.
          </span>
        </div>

        <p
          role="alert"
          className="min-h-[1.25rem] text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
        <p
          role="status"
          className="min-h-[1.25rem] text-sm text-green-700 dark:text-green-400"
        >
          {done ? 'Thanks! Your pixel is on the wall.' : ''}
        </p>
      </div>
    </div>
  );
};

export default PixelEditor;
