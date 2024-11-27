import React, { forwardRef } from 'react';
import { X, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabProps {
  title: string;
  active: boolean;
  onClose: (e: React.MouseEvent) => void;
  onClick: () => void;
  favicon?: string;
}

export const Tab = forwardRef<HTMLDivElement, TabProps>(
  ({ title, active, onClose, onClick, favicon }, ref) => {
    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={onClick}
        className={`
          group relative flex items-center gap-2 px-4 py-2 min-w-[180px] max-w-[240px]
          rounded-t-lg transition-all duration-200 select-none cursor-pointer
          ${active 
            ? 'bg-[#303134]' 
            : 'bg-[#202124] hover:bg-[#303134]'
          }
        `}
      >
        <div className="flex items-center gap-2 w-full overflow-hidden">
          {favicon ? (
            <img src={favicon} alt="" className="w-4 h-4" />
          ) : (
            <Globe size={14} className="text-gray-400" />
          )}
          <span className="truncate text-sm font-medium text-gray-300">{title}</span>
        </div>
        <button
          onClick={onClose}
          className={`
            p-1 rounded-full transition-all duration-200
            ${active 
              ? 'hover:bg-[#404144] text-gray-400 hover:text-gray-200' 
              : 'opacity-0 group-hover:opacity-100 hover:bg-[#404144] text-gray-400 hover:text-gray-200'
            }
          `}
        >
          <X size={14} />
        </button>
        
        <div className={`
          absolute bottom-0 left-0 right-0 h-[2px]
          ${active ? 'bg-pink-500' : 'bg-transparent'}
        `} />
      </motion.div>
    );
  }
);