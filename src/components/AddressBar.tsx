import React, { useState, useEffect } from 'react';
import { Search, Lock, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { formatUrl } from '../utils/url';
import { motion } from 'framer-motion';

interface AddressBarProps {
  url: string;
  onNavigate: (url: string) => void;
  onBack?: () => void;
  onForward?: () => void;
  onReload?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

export function AddressBar({ 
  url, 
  onNavigate,
  onBack,
  onForward,
  onReload,
  canGoBack = false,
  canGoForward = false
}: AddressBarProps) {
  const [input, setInput] = useState(url);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setInput(url === 'about:blank' ? '' : url);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onNavigate(input.trim());
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          disabled={!canGoBack}
          className="p-2 rounded-full hover:bg-[#3c4043] disabled:opacity-50 text-gray-300"
        >
          <ArrowLeft size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onForward}
          disabled={!canGoForward}
          className="p-2 rounded-full hover:bg-[#3c4043] disabled:opacity-50 text-gray-300"
        >
          <ArrowRight size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReload}
          className="p-2 rounded-full hover:bg-[#3c4043] text-gray-300"
        >
          <RotateCcw size={16} />
        </motion.button>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1">
        <div className={`
          flex items-center gap-2 px-4 py-2 rounded-full
          transition-all duration-200
          ${focused 
            ? 'bg-[#303134] ring-2 ring-pink-500' 
            : 'bg-[#303134] hover:bg-[#3c4043]'
          }
        `}>
          <Lock size={16} className="text-gray-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-400"
            placeholder="Search Google or enter URL"
          />
          <Search size={16} className="text-gray-400" />
        </div>
      </form>
    </div>
  );
}