import { useEffect, useState } from 'react';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');

    if (media.matches !== isMobile) {
      setIsMobile(media.matches);
    }

    const listener = () => {
      setIsMobile(media.matches);
    };

    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [isMobile]);

  return isMobile;
};
