import { BACKGROUNDS, EMPTY, NAME_MAX, PIXEL_COUNT } from '@/config/guestbook';

export type EntryInput = { pixels: string; bg: string; name?: string };

export type ValidationResult =
  | { ok: true; value: { pixels: string; bg: string; name: string | null } }
  | { ok: false; error: string };

const PIXELS_RE = new RegExp(
  `^[0-9a-f${EMPTY.replace('.', '\\.')}]{${PIXEL_COUNT}}$`
);

export function validateEntry(input: unknown): ValidationResult {
  if (typeof input !== 'object' || input === null) {
    return { ok: false, error: 'Invalid request.' };
  }
  const { pixels, bg, name } = input as Record<string, unknown>;

  if (typeof pixels !== 'string' || !PIXELS_RE.test(pixels)) {
    return { ok: false, error: 'Invalid drawing.' };
  }
  if (!pixels.split('').some((c) => c !== EMPTY)) {
    return { ok: false, error: 'Draw something first!' };
  }
  if (typeof bg !== 'string' || !BACKGROUNDS.some((b) => b.id === bg)) {
    return { ok: false, error: 'Invalid background.' };
  }

  let cleanName: string | null = null;
  if (name !== undefined && name !== null && name !== '') {
    if (typeof name !== 'string') return { ok: false, error: 'Invalid name.' };
    const trimmed = name.trim();
    if (trimmed.length > NAME_MAX) {
      return {
        ok: false,
        error: `Name must be ${NAME_MAX} characters or fewer.`,
      };
    }
    cleanName = trimmed || null;
  }

  return { ok: true, value: { pixels, bg, name: cleanName } };
}
