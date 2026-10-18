export type TeaserDrawing = {
  id: string;
  label: string;
  bg: string;
  pixels: string;
};

export const TEASER_DRAWINGS: TeaserDrawing[] = [
  {
    id: 'heart',
    label: 'Pixel heart drawing by Shemmee',
    bg: 'plum',
    pixels:
      '..................................9999....9999....9999....9999..9999999999999999999999999999999999999999999999999999999999999999..999999999999....999999999999......99999999........99999999..........9999............9999......................................',
  },
  {
    id: 'invader',
    label: 'Pixel invader drawing by Shemmee',
    bg: 'teal',
    pixels:
      '....55....55........55....55..........5555............5555..........55555555........55555555......5555....5555....5555....5555..5555555555555555555555555555555555..55555555..5555..55555555..5555..55....55..5555..55....55..55......5555............5555......',
  },
  {
    id: 'star',
    label: 'Pixel star drawing by Shemmee',
    bg: 'night',
    pixels:
      '......bbbb............bbbb............bbbb............bbbb......bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbb....bbbbbbbbbbbb......bbbbbbbb........bbbbbbbb........bbbbbbbb........bbbbbbbb......bbbb....bbbb....bbbb....bbbb....bb........bb....bb........bb..',
  },
  {
    id: 'smiley',
    label: 'Pixel smiley drawing by Shemmee',
    bg: 'wine',
    pixels:
      '....bbbbbbbb........bbbbbbbb......bbbbbbbbbbbb....bbbbbbbbbbbb..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb00bbbb00bbbbbbbb00bbbb00bbbbbbbb00bbbb00bbbbbbbb00bbbb00bbbbbbbb00000000bbbbbbbb00000000bbbb..bbbbbbbbbbbb....bbbbbbbbbbbb......bbbbbbbb........bbbbbbbb....',
  },
  {
    id: 'mushroom',
    label: 'Pixel mushroom drawing by Shemmee',
    bg: 'forest',
    pixels:
      '....88888888........88888888......888888888888....888888888888..8888888888888888888888888888888888888888888888888888888888888888......1111............1111............1111............1111..........11111111........11111111....................................',
  },
  {
    id: 'ghost',
    label: 'Pixel ghost drawing by Shemmee',
    bg: 'night',
    pixels:
      '....77777777........77777777......777777777777....777777777777..77777777777777777777777777777777777700777700777777770077770077777777007777007777777700777700777777777777777777777777777777777777777777777777777777777777777777777777..7777..77777777..7777..7777',
  },
];
