import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathDisplayProps {
  label?: string;
  formula: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ label, formula }) => {
  const renderedHtml = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        throwOnError: false,
        displayMode: true
      });
    } catch {
      return null;
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
        {renderedHtml ? (
          <div
            className="text-base leading-7"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        ) : (
          <div className="font-mono text-lg">{formula}</div>
        )}
      </div>
    </div>
  );
};

export default MathDisplay;
