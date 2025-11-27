import React from 'react';
import { SubSection } from '../types';
import MathDisplay from './MathDisplay';
import OverfittingDemo from './OverfittingDemo';

interface ArticleProps {
  data: SubSection;
}

const Article: React.FC<ArticleProps> = ({ data }) => {
  // Simple paragraph splitter
  const paragraphs = data.content.trim().split('\n').filter(p => p.trim() !== '');

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 lg:py-16 animation-fade-in">
      <header className="mb-8 pb-8 border-b border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
          {data.title}
        </h1>
        <div className="flex gap-2">
           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
             Lecture Notes Part 1
           </span>
           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700">
             {data.id.startsWith('1') ? 'Regression' : data.id.startsWith('2') ? 'Penalized Likelihood' : 'Bayesian'}
           </span>
        </div>
      </header>

      <div className="prose prose-slate prose-lg max-w-none text-gray-600 leading-relaxed">
        {paragraphs.map((para, idx) => {
          // Check if paragraph is a bullet point
          if (para.trim().startsWith('-')) {
            return (
              <li key={idx} className="ml-4 list-disc pl-2 mb-2">
                {para.replace('-', '').trim()}
              </li>
            );
          }
           // Check for bold headers inside text
          if (para.trim().startsWith('**')) {
             return (
               <p key={idx} className="font-semibold text-gray-800 mt-6 mb-2">
                 {para.replaceAll('**', '').trim()}
               </p>
             );
          }
          return <p key={idx} className="mb-4">{para}</p>;
        })}
      </div>

      {/* Inject Interactive Components based on section ID */}
      {data.id === '1.1' && (
        <OverfittingDemo />
      )}

      {/* Render Formulas */}
      {data.equations && data.equations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Key Formulas</h3>
          <div className="grid gap-4">
            {data.equations.map((eq, i) => (
              <MathDisplay key={i} label={eq.label} formula={eq.formula} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default Article;
