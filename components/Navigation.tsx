import React from 'react';
import { Chapter } from '../types';
import { BookOpen, ChevronRight, Hash } from 'lucide-react';

interface NavigationProps {
  content: Chapter[];
  activeSection: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ content, activeSection, onSelect, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/50 z-20 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-gray-50 border-r border-gray-200 
        transform transition-transform duration-300 z-30 overflow-y-auto custom-scroll
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 text-brand-700 font-bold text-xl">
            <BookOpen className="w-6 h-6" />
            <span>StatMod Wiki</span>
          </div>

          <nav className="space-y-6">
            {content.map((chapter) => (
              <div key={chapter.id}>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  {chapter.title}
                </h3>
                <ul className="space-y-1">
                  {chapter.subSections.map((sub) => {
                    const isActive = activeSection === sub.id;
                    return (
                      <li key={sub.id}>
                        <button
                          onClick={() => {
                            onSelect(sub.id);
                            onClose();
                          }}
                          className={`
                            w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors
                            ${isActive 
                              ? 'bg-brand-100 text-brand-700 font-medium' 
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                          `}
                        >
                          <Hash className={`w-3 h-3 ${isActive ? 'text-brand-500' : 'text-gray-400'}`} />
                          <span className="truncate">{sub.title}</span>
                          {isActive && <ChevronRight className="w-3 h-3 ml-auto text-brand-500" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        
        <div className="p-6 mt-auto border-t border-gray-200">
           <p className="text-xs text-gray-400">
             Based on lecture notes by <br/>David Rossell.
           </p>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
