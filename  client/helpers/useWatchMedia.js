import { useState, useEffect } from 'react';

const useWatchMedia = (mediaquery) =>{
 
const [matches, setMatches] = useState(false);

useEffect(() => {
  const media = window.matchMedia(mediaquery);
  if (media.matches !== matches) {
    setMatches(media.matches);
  }
  const listener = () => setMatches(media.matches);
  window.addEventListener("resize", listener);
  return () => window.removeEventListener("resize", listener);
}, [matches, mediaquery]);

return matches;
}

export default useWatchMedia;
