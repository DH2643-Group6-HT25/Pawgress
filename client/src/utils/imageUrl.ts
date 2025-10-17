// Utility to get the correct backend image URL for images stored on the server
// Usage: getImageUrl(imageUrl)

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export function getImageUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http') || url.startsWith('blob')) return url;
  return BACKEND_URL + url;
}
