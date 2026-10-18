export const GRID_SIZE = 16;
export const PIXEL_COUNT = GRID_SIZE * GRID_SIZE; // 256
export const EMPTY = '.';
export const NAME_MAX = 30;

export const PALETTE = [
  { id: '0', name: 'Black', hex: '#0d1020' },
  { id: '1', name: 'White', hex: '#f4f4fb' },
  { id: '2', name: 'Gray', hex: '#6b7098' },
  { id: '3', name: 'Navy', hex: '#2a2f57' },
  { id: '4', name: 'Indigo', hex: '#6366f1' },
  { id: '5', name: 'Periwinkle', hex: '#8b8dfc' },
  { id: '6', name: 'Violet', hex: '#7a5bd6' },
  { id: '7', name: 'Lilac', hex: '#d4c5ff' },
  { id: '8', name: 'Red', hex: '#ef4444' },
  { id: '9', name: 'Pink', hex: '#f472b6' },
  { id: 'a', name: 'Orange', hex: '#fb923c' },
  { id: 'b', name: 'Yellow', hex: '#fbbf24' },
  { id: 'c', name: 'Green', hex: '#34d399' },
  { id: 'd', name: 'Teal', hex: '#2dd4bf' },
  { id: 'e', name: 'Sky', hex: '#38bdf8' },
  { id: 'f', name: 'Brown', hex: '#92613a' },
] as const;

export const BACKGROUNDS = [
  { id: 'plum', name: 'Plum', hex: '#2b2250' },
  { id: 'teal', name: 'Deep teal', hex: '#13303a' },
  { id: 'night', name: 'Night blue', hex: '#1f2a5c' },
  { id: 'wine', name: 'Wine', hex: '#3a1f3f' },
  { id: 'forest', name: 'Forest', hex: '#14342f' },
] as const;
