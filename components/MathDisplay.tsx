import React, { useEffect, useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathDisplayProps {
  label?: string;
  formula: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ label, formula }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    try {
      katex.render(formula, el, {
        throwOnError: false,
        displayMode: true
      });
      const hasContent = el.innerHTML.trim().length > 0;
      setRendered(hasContent);
      if (!hasContent) {
        el.textContent = formula;
      }
    } catch {
      if (el) {
        el.textContent = formula;
      }
      setRendered(false);
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
