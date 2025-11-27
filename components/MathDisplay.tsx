import React from 'react';

interface MathDisplayProps {
  label?: string;
  formula: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ label, formula }) => {
  return (
    <div className="my-6 p-4 bg-white border-l-4 border-brand-500 shadow-sm rounded-r-md">
      {label && (
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </div>
      )}
      <div className="font-mono text-lg text-gray-800 overflow-x-auto">
        {formula}
      </div>
    </div>
  );
};

export default MathDisplay;
