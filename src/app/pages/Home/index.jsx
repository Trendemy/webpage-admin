import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTitle } from '~/hooks';
import CourseTable from './components/Table/Course';
import TeacherTable from './components/Table/Teacher';
import { cn } from '~/utils';

const tabs = [
   { key: 'courses', name: 'Khóa học', component: <CourseTable /> },
   { key: 'teachers', name: 'Giảng viên', component: <TeacherTable /> }
];

const HomePage = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const tab = searchParams.get('tab') || tabs[0].key;
   useTitle('Quản Lý');

   useEffect(() => {
      if (!searchParams.has('tab')) {
         navigate(`/?tab=${tabs[0].key}`, { replace: true });
      }
   }, [searchParams, navigate]);

   return (
      <div className='container'>
         <h1 className='text-3xl font-bold text-center'>Trang Chủ</h1>
         <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200'>
            <ul className='flex flex-wrap -mb-px'>
               {(tabs || []).map((item) => (
                  <li key={item.key} className='me-2'>
                     <Link
                        to={`?tab=${item.key}`}
                        className={cn(
                           'inline-block border-b-2 rounded-t-lg',
                           tab === item.key
                              ? 'text-blue-600 border-blue-600'
                              : 'border-transparent hover:text-gray-600 hover:border-gray-300',
                           'p-4'
                        )}
                     >
                        {item.name}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
         <div className='mt-5 mx-3'>
            {(tabs.find((item) => item.key === tab) || {}).component || ''}
         </div>
      </div>
   );
};

export default HomePage;
