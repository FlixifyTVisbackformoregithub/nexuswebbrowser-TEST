import React, { useEffect, useRef, useState } from 'react';
import { NewTabPage } from './NewTabPage';
import { getDisplayTitle } from '../utils/url';

interface BrowserContentProps {
  url: string;
  onTitleChange: (title: string) => void;
  onSearch: (query: string) => void;
}

export function BrowserContent({ url, onTitleChange, onSearch }: BrowserContentProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previousUrlRef = useRef(url);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (url !== previousUrlRef.current) {
      const title = getDisplayTitle(url);
      onTitleChange(title);
      previousUrlRef.current = url;
      setError(null);
    }
  }, [url, onTitleChange]);

  if (url === 'about:blank') {
    return <NewTabPage onSearch={onSearch} />;
  }

  const handleIframeError = () => {
    setError('Failed to load the page. Please check the URL and try again.');
  };

  return (
    <div className="flex-1 bg-[#202124] relative">
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="bg-[#303134] p-8 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Oops!</h2>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-none bg-white"
          title="browser-content"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
          onError={handleIframeError}
        />
      )}
    </div>
  );
}