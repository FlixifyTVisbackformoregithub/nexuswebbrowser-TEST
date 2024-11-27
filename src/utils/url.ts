export function formatUrl(input: string): string {
  // Handle empty input
  if (!input.trim()) return 'about:blank';

  // Handle search queries vs URLs
  if (!input.includes('.') || input.includes(' ')) {
    return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
  }

  // Add https:// if no protocol specified
  if (!input.startsWith('http://') && !input.startsWith('https://')) {
    return `https://${input}`;
  }

  return input;
}

export function getDisplayTitle(url: string): string {
  if (url === 'about:blank') return 'New Tab';
  
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.startsWith('www.')) {
      return urlObj.hostname.slice(4);
    }
    return urlObj.hostname;
  } catch {
    return url;
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}