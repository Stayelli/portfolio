import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Set initial value
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Listen for changes
    const listener = () => setMatches(media.matches);
    // 'change' event is the modern way, 'addListener' is for older browsers
    media.addEventListener('change', listener);
    
    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;

