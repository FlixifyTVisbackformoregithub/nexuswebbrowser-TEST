import React, { useState, useCallback } from 'react';
import { TabBar } from './TabBar';
import { AddressBar } from './AddressBar';
import { BrowserContent } from './BrowserContent';
import { TabData } from '../types';
import { formatUrl } from '../utils/url';

export function Browser() {
  const [tabs, setTabs] = useState<TabData[]>([
    { id: '1', title: 'New Tab', url: 'about:blank' },
  ]);
  const [activeTab, setActiveTab] = useState('1');
  const [history, setHistory] = useState<{ [key: string]: string[] }>({ '1': [] });
  const [historyIndex, setHistoryIndex] = useState<{ [key: string]: number }>({ '1': -1 });

  const addTab = useCallback(() => {
    const newTab = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Tab',
      url: 'about:blank',
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTab(newTab.id);
    setHistory((prev) => ({ ...prev, [newTab.id]: [] }));
    setHistoryIndex((prev) => ({ ...prev, [newTab.id]: -1 }));
  }, []);

  const closeTab = useCallback((id: string) => {
    setTabs((prevTabs) => {
      const tabIndex = prevTabs.findIndex((tab) => tab.id === id);
      if (prevTabs.length === 1) {
        const newTab = {
          id: Math.random().toString(36).substr(2, 9),
          title: 'New Tab',
          url: 'about:blank',
        };
        setHistory((prev) => ({ ...prev, [newTab.id]: [] }));
        setHistoryIndex((prev) => ({ ...prev, [newTab.id]: -1 }));
        return [newTab];
      }
      const newTabs = prevTabs.filter((tab) => tab.id !== id);
      if (id === activeTab) {
        const newActiveIndex = Math.max(0, tabIndex - 1);
        setActiveTab(newTabs[newActiveIndex].id);
      }
      return newTabs;
    });
  }, [activeTab]);

  const updateTab = useCallback((id: string, updates: Partial<TabData>) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, ...updates } : tab))
    );
  }, []);

  const navigate = useCallback((url: string) => {
    const processedUrl = formatUrl(url);
    updateTab(activeTab, { url: processedUrl });
    
    setHistory((prev) => {
      const currentHistory = prev[activeTab] || [];
      const currentIndex = historyIndex[activeTab] || -1;
      const newHistory = [...currentHistory.slice(0, currentIndex + 1), processedUrl];
      return { ...prev, [activeTab]: newHistory };
    });
    
    setHistoryIndex((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] || -1) + 1
    }));
  }, [activeTab, updateTab, historyIndex]);

  const goBack = useCallback(() => {
    const currentHistory = history[activeTab] || [];
    const currentIndex = historyIndex[activeTab] || 0;
    
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const newUrl = currentHistory[newIndex];
      updateTab(activeTab, { url: newUrl });
      setHistoryIndex((prev) => ({ ...prev, [activeTab]: newIndex }));
    }
  }, [activeTab, history, historyIndex, updateTab]);

  const goForward = useCallback(() => {
    const currentHistory = history[activeTab] || [];
    const currentIndex = historyIndex[activeTab] || 0;
    
    if (currentIndex < currentHistory.length - 1) {
      const newIndex = currentIndex + 1;
      const newUrl = currentHistory[newIndex];
      updateTab(activeTab, { url: newUrl });
      setHistoryIndex((prev) => ({ ...prev, [activeTab]: newIndex }));
    }
  }, [activeTab, history, historyIndex, updateTab]);

  const handleSearch = useCallback((query: string) => {
    navigate(query);
  }, [navigate]);

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const canGoBack = (historyIndex[activeTab] || 0) > 0;
  const canGoForward = (historyIndex[activeTab] || 0) < (history[activeTab]?.length || 0) - 1;

  return (
    <div className="h-screen flex flex-col bg-[#202124]">
      <div className="bg-[#202124] shadow">
        <div className="max-w-full mx-auto">
          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            onTabClose={closeTab}
            onAddTab={addTab}
          />
          <div className="flex items-center gap-4 px-4 pb-2">
            <AddressBar
              url={currentTab.url}
              onNavigate={navigate}
              onBack={goBack}
              onForward={goForward}
              onReload={() => navigate(currentTab.url)}
              canGoBack={canGoBack}
              canGoForward={canGoForward}
            />
          </div>
        </div>
      </div>
      <BrowserContent
        url={currentTab.url}
        onTitleChange={(title) => updateTab(activeTab, { title })}
        onSearch={handleSearch}
      />
    </div>
  );
}