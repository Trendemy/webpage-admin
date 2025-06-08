import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { courseService } from '~/services';
import NProgress from '~/config/nprogress';
import { logger } from '~/utils';
import { Lock, PencilSquare, Trash, UnLock } from '~/components/Icons';

const CourseTable = () => {
   const { user } = useAuth();
   const [courses, setCourses] = useState([]);

   useEffect(() => {
      (async () => {
         try {
            NProgress.start();
            const data = await courseService.get();
            setCourses(data || []);
         } catch (error) {
            logger('error list course', error);
         } finally {
            NProgress.done();
         }
      })();
   }, []);

   const handleDelete = async (id) => {
      try {
         if (window.confirm('Bạn có chắc chắn muốn xóa khóa học này không?')) {
            await toast.promise(courseService.delete(id), {
               loading: 'Đang xóa...',
               success: () => {
                  setCourses((current) =>
                     current.filter((course) => course.id !== id)
                  );
                  return 'Xóa thành công!';
               },
               error: 'Lỗi rồi!'
            });
         }
      } catch (error) {
         logger('error delete course', error);
         toast.error('Có lỗi!');
      }
   };

   const handleStatus = async (id, status) => {
      try {
         if (
            window.confirm(
               `Bạn có chắc chắn muốn ${
                  status ? 'hiện thị' : 'ẩn'
               } khóa học này không?`
            )
         ) {
            await toast.promise(courseService.updateStatus(id, status), {
               loading: 'Đang cập nhật...',
               success: () => {
                  setCourses((current) =>
                     current.map((course) =>
                        course.id === id ? { ...course, status } : course
                     )
                  );
                  return 'Cập nhật thành công!';
               },
               error: 'Lỗi rồi!'
            });
         }
      } catch (error) {
         logger('error update status', error);
         toast.error('Có lỗi!');
      }
   };

   return (
      <div className='relative overflow-x-auto'>
         <div className='text-right'>
            <Link
               to='/courses/create'
               className='text-sm font-medium text-blue-600 hover:underline outline-none'
            >
               Thêm khóa học
            </Link>
         </div>
         <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
               <tr>
                  <th scope='col' className='px-6 py-3'>
                     STT
                  </th>
                  <th scope='col' className='px-6 py-3'>
                     Tên khóa học
                  </th>
                  <th scope='col' className='px-6 py-3'>
                     Thể loại
                  </th>
                  <th scope='col' className='px-6 py-3'>
                     Trạng thái
                  </th>
                  <th scope='col' className='px-6 py-3'></th>
               </tr>
            </thead>
            <tbody>
               {courses.map((course, index) => (
                  <tr key={course.id} className='bg-white border-b'>
                     <td className='px-6 py-4'>{index + 1}</td>
                     <th scope='row' className='px-6 py-4'>
                        <span className='font-medium text-gray-900 whitespace-nowrap'>
                           {course.name}
                        </span>
                     </th>
                     <td className='px-6 py-4'>{course.type}</td>
                     <td className='px-6 py-4'>
                        <span
                           className={`${
                              course.status
                                 ? 'bg-blue-100 text-blue-800'
                                 : 'bg-red-100 text-red-800'
                           } text-xs font-medium me-2 px-2.5 py-1 rounded-sm`}
                        >
                           {course.status ? 'Hiện thị' : 'Ẩn'}
                        </span>
                     </td>
                     <td className='flex gap-3 px-6 py-4'>
                        <Link
                           to={`/courses/${course.slug}`}
                           className='size-5 text-blue-600 hover:text-blue-500 hover:scale-105 outline-none'
                        >
                           <PencilSquare />
                        </Link>
                        <span className='border-l select-none'></span>
                        <span
                           className='size-5 text-rose-600 hover:text-rose-500 hover:scale-105 cursor-pointer'
                           onClick={() =>
                              handleStatus(course.id, !course.status)
                           }
                        >
                           {course.status ? <Lock /> : <UnLock />}
                        </span>

                        {user?.isSuper && (
                           <>
                              <span className='border-l select-none'></span>
                              <span
                                 className='size-5 text-rose-600 hover:text-rose-500 hover:scale-105 cursor-pointer'
                                 onClick={() => handleDelete(course.id)}
                              >
                                 <Trash />
                              </span>
                           </>
                        )}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default CourseTable;
