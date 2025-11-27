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
    if (containerRef.current && window.katex) {
      try {
        window.katex.render(formula, containerRef.current, {
          throwOnError: false,
          displayMode: true
        });
        setRendered(true);
      } catch {
        setRendered(false);
      }
    }
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
