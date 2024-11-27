import React from 'react';
import { Plus } from 'lucide-react';
import { Tab } from './Tab';
import { TabData } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

interface TabBarProps {
  tabs: TabData[];
  activeTab: string;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onAddTab: () => void;
}

export function TabBar({ tabs, activeTab, onTabClick, onTabClose, onAddTab }: TabBarProps) {
  return (
    <div className="flex items-stretch h-12 px-2">
      <div className="flex-1 flex items-end gap-1 overflow-x-auto scrollbar-hide">
        <AnimatePresence mode="popLayout" initial={false}>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              title={tab.title}
              active={tab.id === activeTab}
              onClose={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              onClick={() => onTabClick(tab.id)}
              favicon={tab.favicon}
            />
          ))}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddTab}
          className="
            p-2 mb-1 rounded-full bg-[#303134] hover:bg-[#404144]
            transition-colors duration-200 text-gray-300
          "
        >
          <Plus size={16} />
        </motion.button>
      </div>
    </div>
  );
}