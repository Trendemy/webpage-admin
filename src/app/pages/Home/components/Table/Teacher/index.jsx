import { useEffect, useState } from 'react';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Lock, PencilSquare, Trash, UnLock } from '~/components/Icons';
import cloudinary from '~/config/cloudinary';
import NProgress from '~/config/nprogress';
import { useAuth } from '~/hooks';
import { teacherService } from '~/services';
import { logger } from '~/utils';

const TeacherTable = () => {
   const { user } = useAuth();
   const [teachers, setTeachers] = useState([]);

   useEffect(() => {
      (async () => {
         try {
            NProgress.start();
            const data = await teacherService.get();
            setTeachers(data || []);
         } catch (error) {
            logger('get teachers', error);
         } finally {
            NProgress.done();
         }
      })();
   }, []);

   const handleDelete = async (id) => {
      try {
         if (
            window.confirm('Bạn có chắc chắn muốn xóa giảng viên này không?')
         ) {
            await toast.promise(teacherService.delete(id), {
               loading: 'Đang xóa...',
               success: () => {
                  setTeachers((current) =>
                     current.filter((teacher) => teacher.id !== id)
                  );
                  return 'Xóa thành công!';
               },
               error: 'Lỗi rồi!'
            });
         }
      } catch (error) {
         logger('Delete teacher', error);
      }
   };

   const handleStatus = async (id, status) => {
      try {
         if (
            window.confirm(
               `Bạn có chắc chắn muốn ${
                  status ? 'hiện thị' : 'ẩn'
               } giảng viên này không?`
            )
         ) {
            await toast.promise(teacherService.updateStatus(id, status), {
               loading: 'Đang cập nhật...',
               success: () => {
                  setTeachers((current) =>
                     current.map((teacher) =>
                        teacher.id === id ? { ...teacher, status } : teacher
                     )
                  );
                  return 'Cập nhật thành công!';
               },
               error: 'Lỗi rồi!'
            });
         }
      } catch (error) {
         logger('update status', error);
         toast.error('Có lỗi!');
      }
   };

   return (
      <div className='relative overflow-x-auto'>
         <div className='text-right'>
            <Link
               to='/teachers/create'
               className='text-sm font-medium text-blue-600 hover:underline outline-none'
            >
               Thêm giảng viên
            </Link>
         </div>
         <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
               <tr>
                  <th scope='col' className='px-6 py-3'>
                     STT
                  </th>
                  <th scope='col' className='px-6 py-3'>
                     Giảng viên
                  </th>

                  <th scope='col' className='px-6 py-3'>
                     Trạng thái
                  </th>
                  <th scope='col' className='px-6 py-3'></th>
               </tr>
            </thead>
            <tbody>
               {teachers.map((teacher, index) => (
                  <tr key={teacher.id} className='bg-white border-b'>
                     <td className='px-6 py-4'>{index + 1}</td>
                     <th scope='row' className='px-6 py-4'>
                        <div className='flex items-center gap-2'>
                           <AdvancedImage
                              cldImg={cloudinary
                                 .image(teacher.avatar)
                                 .format('auto')
                                 .quality('auto')
                                 .addFlag('progressive')}
                              plugins={[
                                 lazyload(),
                                 placeholder({ mode: 'blur' })
                              ]}
                              className='size-12 object-cover rounded-full'
                              loading='lazy'
                              alt={teacher.name}
                           />
                           <div className='flex flex-col'>
                              <span className='font-medium text-gray-900 whitespace-nowrap'>
                                 {teacher.name}
                              </span>
                              <span className='text-sm font-normal whitespace-nowrap'>
                                 {teacher.specialized}
                              </span>
                           </div>
                        </div>
                     </th>
                     <td className='px-6 py-4'>
                        <span
                           className={`${
                              teacher.status
                                 ? 'bg-blue-100 text-blue-800'
                                 : 'bg-red-100 text-red-800'
                           } text-xs font-medium me-2 px-2.5 py-1 rounded-sm`}
                        >
                           {teacher.status ? 'Hiện thị' : 'Ẩn'}
                        </span>
                     </td>
                     <td className='flex gap-3 px-6 py-4'>
                        <Link
                           to={`/teachers/${teacher.slug}`}
                           className='size-5 text-blue-600 hover:text-blue-500 hover:scale-105 outline-none'
                        >
                           <PencilSquare />
                        </Link>
                        <span className='border-l select-none'></span>
                        <span
                           className='size-5 text-rose-600 hover:text-rose-500 hover:scale-105 cursor-pointer'
                           onClick={() =>
                              handleStatus(teacher.id, !teacher.status)
                           }
                        >
                           {teacher.status ? <Lock /> : <UnLock />}
                        </span>
                        {user?.isSuper && (
                           <>
                              <span className='border-l select-none'></span>
                              <span
                                 className='size-5 text-rose-600 hover:text-rose-500 hover:scale-105 cursor-pointer'
                                 onClick={() => handleDelete(teacher.id)}
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

export default TeacherTable;
