import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface NewTabPageProps {
  onSearch: (query: string) => void;
}

export function NewTabPage({ onSearch }: NewTabPageProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#202124]">
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          background: 'linear-gradient(45deg, #ff69b4, #4b0082)',
          opacity: 0.1
        }}
      >
        <div 
          className="absolute bottom-0 left-0 right-0 h-[300px]"
          style={{
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
          }}
        />
      </div>
      
      <h1 className="text-8xl font-bold mb-12 relative z-10 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
        NEXUS
      </h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4 relative z-10">
        <div className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full px-6 py-4 rounded-full
              bg-[#303134] text-white placeholder-gray-400
              outline-none transition-all duration-200
              border-2 border-transparent
              hover:bg-[#3c4043]
              focus:border-pink-500
              text-lg
            "
            placeholder="Search Google or type a URL"
          />
          <button
            type="submit"
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              p-2 rounded-full
              hover:bg-[#404144] transition-colors duration-200
            "
          >
            <Search size={20} className="text-gray-400" />
          </button>
        </div>
      </form>
    </div>
  );
}