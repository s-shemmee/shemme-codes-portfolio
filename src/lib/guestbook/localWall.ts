import { validateEntry } from '@/lib/guestbook/validate';

const KEY = 'guestbook-demo-entries';
const MAX = 60;

export type WallEntry = {
  id: string;
  pixels: string;
  bg: string;
  name: string | null;
};

export function readEntries(): WallEntry[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(list)) return [];
    return list.flatMap((e) => {
      const r = validateEntry(e);
      return r.ok && typeof e?.id === 'string'
        ? [{ id: e.id, ...r.value }]
        : [];
    });
  } catch {
    return [];
  }
}

export function addEntry(entry: Omit<WallEntry, 'id'>): void {
  try {
    const next = [{ id: String(Date.now()), ...entry }, ...readEntries()].slice(
      0,
      MAX
    );
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('guestbook:update'));
  } catch {
    // Storage can be unavailable (private mode, full): ignore.
  }
}
