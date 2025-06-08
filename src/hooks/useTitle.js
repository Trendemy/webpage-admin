import { useEffect } from 'react';
import { APP_NAME } from '~/config/env';

const useTitle = (title = '') => {
   useEffect(() => {
      if (title) {
         document.title = APP_NAME ? `${title} - ${APP_NAME}` : title;
      }
   }, [title]);
};

export default useTitle;
