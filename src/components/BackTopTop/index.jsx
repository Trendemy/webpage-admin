import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '~/utils';
import { ChevronUp } from '~/components/Icons';

const BackTopTop = () => {
   const [isVisible, setIsVisible] = useState(false);
   const { pathname } = useLocation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);

   useEffect(() => {
      const toggleVisibility = () => {
         if (window.scrollY > 300) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      };
      window.addEventListener('scroll', toggleVisibility);
      return () => {
         window.removeEventListener('scroll', toggleVisibility);
      };
   }, []);

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   };

   return (
      <button
         type='button'
         className={cn(
            'fixed right-3 size-8 rounded-full bg-white text-zinc-900 border border-zinc-900 active:scale-[1.05]',
            isVisible ? 'bottom-3 translate-y-0' : 'bottom-0 translate-y-full',
            'transition-all p-2 z-10'
         )}
         onClick={scrollToTop}
      >
         <ChevronUp strokeWidth={2} />
      </button>
   );
};

export default BackTopTop;
