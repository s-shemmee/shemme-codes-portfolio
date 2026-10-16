'use client';

import { useEffect, useRef } from 'react';

interface AsciiTextParticlesProps {
  src: string;
  alt: string;
  aspect?: number;
  maxWidth?: number;
  targetCell?: number;
  fontScale?: number;
  interactionRadius?: number;
  pushStrength?: number;
  returnSpeed?: number;
  darkColor?: string;
  lightColor?: string;
  lightMinAlpha?: number;
  darkMinAlpha?: number;
}

interface Glyph {
  ox: number;
  oy: number;
  x: number;
  y: number;
  char: string;
  weight: number;
}

const WEIGHT: Record<string, number> = {
  '.': 0,
  ':': 0.25,
  '-': 0.5,
  '=': 0.75,
  '+': 1,
};

export default function AsciiTextParticles({
  src,
  alt,
  aspect = 4 / 5,
  maxWidth = 300,
  targetCell = 4.5,
  fontScale = 1.0,
  interactionRadius = 70,
  pushStrength = 6,
  returnSpeed = 0.08,
  darkColor = '#6A71FA',
  lightColor = '#6A71FA',
  lightMinAlpha = 0.6,
  darkMinAlpha = 0.3,
}: AsciiTextParticlesProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let isDark = false;
    let width = 0;
    let height = 0;
    let lines: string[] = [];
    let glyphs: Glyph[] = [];
    let raf = 0;
    let running = false;
    let cancelled = false;
    const mouse = { x: -9999, y: -9999 };

    const draw = () => {
      const minA = isDark ? darkMinAlpha : lightMinAlpha;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isDark ? darkColor : lightColor;
      for (const g of glyphs) {
        ctx.globalAlpha = minA + (1 - minA) * g.weight;
        ctx.fillText(g.char, g.x, g.y);
      }
      ctx.globalAlpha = 1;
    };

    const readTheme = () => {
      isDark = document.documentElement.classList.contains('dark');
    };
    readTheme();
    const themeObserver = new MutationObserver(() => {
      readTheme();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const layout = () => {
      if (!lines.length) return;
      width = Math.min(wrap.clientWidth, maxWidth);
      height = width / aspect;
      if (width < 10) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.max(...lines.map((l) => l.length));
      const rows = lines.length;
      const sample = Math.max(1, Math.round(cols / (width / targetCell)));
      const outCols = Math.ceil(cols / sample);
      const outRows = Math.ceil(rows / sample);
      const cellW = width / outCols;
      const cellH = height / outRows;

      ctx.font = `${cellH * fontScale}px "DejaVu Sans Mono", "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      glyphs = [];
      for (let r = 0; r < rows; r += sample) {
        for (let c = 0; c < cols; c += sample) {
          const ch = lines[r][c];
          if (!ch || ch === ' ') continue;
          const x = (c / sample) * cellW + cellW / 2;
          const y = (r / sample) * cellH + cellH / 2;
          glyphs.push({
            ox: x,
            oy: y,
            x,
            y,
            char: ch,
            weight: WEIGHT[ch] ?? 1,
          });
        }
      }
      draw();
    };

    const step = () => {
      let moving = false;
      for (const g of glyphs) {
        const dx = g.x - mouse.x;
        const dy = g.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < interactionRadius) {
          const force = (interactionRadius - dist) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          g.x += Math.cos(angle) * force * pushStrength;
          g.y += Math.sin(angle) * force * pushStrength;
          moving = true;
        } else {
          g.x += (g.ox - g.x) * returnSpeed;
          g.y += (g.oy - g.y) * returnSpeed;
          if (Math.abs(g.ox - g.x) > 0.05 || Math.abs(g.oy - g.y) > 0.05)
            moving = true;
        }
      }
      draw();
      if (moving) raf = requestAnimationFrame(step);
      else running = false;
    };
    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return;
        lines = text.replace(/\r/g, '').split('\n');
        while (lines.length && lines[lines.length - 1].trim() === '')
          lines.pop();
        layout();
      });

    let lastW = 0;
    const resizeObserver = new ResizeObserver(() => {
      const w = Math.min(wrap.clientWidth, maxWidth);
      if (Math.abs(w - lastW) < 1) return;
      lastW = w;
      layout();
    });
    resizeObserver.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      wake();
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
      wake();
    };
    if (!reduced) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [
    src,
    aspect,
    maxWidth,
    targetCell,
    fontScale,
    interactionRadius,
    pushStrength,
    returnSpeed,
    darkColor,
    lightColor,
    lightMinAlpha,
    darkMinAlpha,
  ]);

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        maxWidth,
        aspectRatio: String(aspect),
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ display: 'block', cursor: 'crosshair', touchAction: 'pan-y' }}
      />
      <span className="sr-only">{alt}</span>
    </div>
  );
}
