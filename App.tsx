import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Article from './components/Article';
import { wikiContent } from './services/wikiData';
import { Search, Menu, X } from 'lucide-react';
import { SubSection } from './types';

function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>('0.1');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{id: string, title: string}[]>([]);

  // Find active content
  const activeContent: SubSection | undefined = wikiContent
    .flatMap(c => c.subSections)
    .find(s => s.id === activeSectionId);
  const activeChapter = wikiContent.find(chapter => 
    chapter.subSections.some(sub => sub.id === activeSectionId)
  );

  // Search Logic
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const results = wikiContent
      .flatMap(c => c.subSections)
      .filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(s => ({ id: s.id, title: s.title }));
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans text-gray-900 bg-white">
      
      {/* Sidebar Navigation */}
      <Navigation 
        content={wikiContent}
        activeSection={activeSectionId}
        onSelect={(id) => {
          setActiveSectionId(id);
          setSearchQuery(''); // clear search on select
        }}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="flex-none h-16 border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 bg-white/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex text-sm text-gray-400 breadcrumbs">
              <button
                onClick={() => {
                  setActiveSectionId('0.1');
                  setSearchQuery('');
                }}
                className="text-gray-500 hover:text-brand-700 font-medium transition-colors"
                aria-label="Go to Start Here"
              >
                Stat Inference
              </button>
              <span className="mx-2">/</span>
              <button
                onClick={() => {
                  const target = activeChapter?.subSections[0]?.id;
                  if (target) {
                    setActiveSectionId(target);
                    setSearchQuery('');
                  }
                }}
                className="text-gray-800 font-semibold hover:text-brand-700 transition-colors"
                aria-label="Go to chapter start"
              >
                {activeChapter?.title ?? 'Pick a track'}
              </button>
              {activeContent && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-gray-800 font-medium">{activeContent.title}</span>
                </>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs md:max-w-md ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search concepts (e.g., 'MLE', 'CI', 'power')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {searchQuery && (
              <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-60 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map(res => (
                      <li key={res.id}>
                        <button
                          onClick={() => {
                            setActiveSectionId(res.id);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 border-b border-gray-50 last:border-0"
                        >
                          <span className="font-medium text-gray-900">{res.title}</span>
                          <span className="block text-xs text-gray-500 mt-0.5">Jump to section</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-sm text-gray-500 text-center">No results found.</div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Article Area */}
        <div className="flex-1 overflow-y-auto custom-scroll scroll-smooth">
          {activeContent ? (
            <Article data={activeContent} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a section to begin reading.
            </div>
          )}
          
          <footer className="py-8 text-center text-xs text-gray-400 border-t border-gray-100 mt-auto">
            <p>&copy; {new Date().getFullYear()} Statistical Inference Sprint Wiki.</p>
          </footer>
        </div>

      </main>
    </div>
  );
}

export default App;
