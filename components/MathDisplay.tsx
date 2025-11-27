import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    katex?: {
      render: (tex: string, el: HTMLElement, opts?: Record<string, unknown>) => void;
    };
  }
}

interface MathDisplayProps {
  label?: string;
  formula: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ label, formula }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const renderMath = async (attempt = 0) => {
      if (!containerRef.current || cancelled) return;

      let katexLib = window.katex;
      // If the global is not ready, try a dynamic import (falls back to CDN).
      if (!katexLib) {
        try {
          const mod = await import('https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.mjs');
          katexLib = mod.default || (mod as any).katex;
        } catch (err) {
          // Retry shortly if katex still not available.
        }
      }

      if (!katexLib) {
        if (attempt < 5) {
          setTimeout(() => renderMath(attempt + 1), 120);
        }
        return;
      }

      try {
        katexLib.render(formula, containerRef.current, {
          throwOnError: false,
          displayMode: true
        });
        if (!cancelled) setRendered(true);
      } catch {
        if (!cancelled) setRendered(false);
      }
    };

    renderMath();
    return () => {
      cancelled = true;
    };
  }, [formula]);

  return (
    <div className="my-6 p-4 bg-white border-l-4 border-brand-500 shadow-sm rounded-r-md">
      {label && (
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </div>
      )}
      <div className="text-gray-800 overflow-x-auto">
        <div ref={containerRef} className={`${rendered ? 'text-base leading-7' : 'font-mono text-lg'}`}>
          {!rendered && formula}
        </div>
      </div>
    </div>
  );
};

export default MathDisplay;
