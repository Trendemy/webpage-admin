import { Link, useRouteError } from 'react-router';
import { logger } from '~/utils';
import { ArrowLeft } from '~/components/Icons';

const ErrorPage = () => {
   const error = useRouteError();
   logger('error route', error);

   return (
      <div className='h-screen flex justify-center items-center'>
         <div className='flex gap-3'>
            <div className='flex flex-col text-right gap-1'>
               <h3 className='text-3xl font-black'>404</h3>
               <Link
                  to='/'
                  className='inline-flex text-sm font-semibold hover:underline gap-2'
               >
                  <ArrowLeft className='size-5' strokeWidth={2} /> Back to home
               </Link>
            </div>
            <div className='border-2 border-black'></div>
            <div className='my-auto'>
               <h3 className='text-3xl font-black'>NOT FOUND</h3>
            </div>
         </div>
      </div>
   );
};

export default ErrorPage;
