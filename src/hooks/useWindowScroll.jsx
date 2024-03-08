import { useState, useEffect } from 'react';

const useWindowScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const currentPosition = window.pageYOffset;
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
      setIsScrolled(currentPosition >= 40);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollTop, isScrolled };
};

export default useWindowScroll;
