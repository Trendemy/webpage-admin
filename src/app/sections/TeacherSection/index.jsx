import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AdvancedImage } from '@cloudinary/react';
import { teacherService } from '~/services';
import { useSectionName } from '~/hooks';
import cloudinary from '~/config/cloudinary';
import { Input } from '~/components/UI';
import { Plus, X } from '~/components/Icons';

const TeacherSection = forwardRef(
   (
      { section = {}, onInputChange, onUpdateChildOfSection, errors = {} },
      ref
   ) => {
      const { sectionName } = useSectionName('teacherSection');
      const { title = '', subtitle = '', teachers = [] } = section;

      const [teacherList, setTeacherList] = useState({
         all: [],
         added: [],
         available: []
      });

      useEffect(() => {
         (async () => {
            const data = await teacherService.get();
            if (data) {
               setTeacherList({
                  all: data,
                  added: data.filter((teacher) =>
                     teachers.includes(teacher.id)
                  ),
                  available: data.filter(
                     (teacher) => !teachers.includes(teacher.id)
                  )
               });
            }
         })();
      }, [teachers, teachers.length]);

      return (
         <section className='mb-5' ref={ref}>
            <h3 className='text-xl font-semibold mb-2'>Teacher Section</h3>
            <div className='lg:w-1/2'>
               <div className='mb-5'>
                  <Input
                     label='Tiêu đề: '
                     name={sectionName('title')}
                     value={title}
                     onChange={onInputChange}
                     error={errors.title}
                  />
               </div>
               <div className='mb-5'>
                  <Input
                     label='Tiêu đề phụ: '
                     name={sectionName('subtitle')}
                     value={subtitle}
                     onChange={onInputChange}
                  />
               </div>
            </div>
            <div className='mb-3'>
               <h5 className='text-sm font-medium'>Danh sách giảng viên:</h5>
            </div>
            <div className='flex'>
               <div className='flex-1'>
                  <h5 className='text-sm font-medium mb-3'>
                     Tất cả giảng viên
                  </h5>
                  <div className='flex flex-wrap gap-5'>
                     {teacherList.available.map((teacher) => (
                        <div
                           key={teacher.id}
                           className='relative flex items-center border rounded-md gap-2 p-3'
                        >
                           <button
                              className='absolute size-6 top-0 right-0 bg-white rounded-full shadow-lg translate-x-1/2 -translate-y-1/2 p-1'
                              onClick={() =>
                                 onUpdateChildOfSection(
                                    sectionName('teachers'),
                                    'add',
                                    teacher.id
                                 )
                              }
                           >
                              <Plus strokeWidth={1.5} />
                           </button>
                           <AdvancedImage
                              cldImg={cloudinary
                                 .image(teacher.avatar)
                                 .format('auto')
                                 .quality('auto')
                                 .addFlag('progressive')}
                              className='size-12 object-cover rounded-full'
                              loading='lazy'
                           />
                           <div className='flex flex-col'>
                              <p className='text-sm font-medium'>
                                 {teacher.name}
                              </p>
                              <span className='text-sm text-gray-700'>
                                 {teacher.specialized}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className='w-px bg-gray-200 mx-3'></div>
               <div className='flex-1'>
                  <h5 className='text-sm font-medium mb-3'>
                     Giảng viên đã thêm
                  </h5>
                  <div className='flex flex-wrap gap-5'>
                     {teacherList.added.map((teacher, index) => (
                        <div
                           key={index}
                           className='relative flex items-center border rounded-md gap-2 p-3'
                        >
                           <button
                              className='absolute size-6 top-0 right-0 bg-white text-rose-600 rounded-full shadow-lg translate-x-1/2 -translate-y-1/2 p-1'
                              onClick={() =>
                                 onUpdateChildOfSection(
                                    sectionName(
                                       'teachers',
                                       teachers.indexOf(teacher.id)
                                    ),
                                    'delete'
                                 )
                              }
                           >
                              <X strokeWidth={1.5} />
                           </button>
                           <AdvancedImage
                              cldImg={cloudinary
                                 .image(teacher.avatar)
                                 .format('auto')
                                 .quality('auto')
                                 .addFlag('progressive')}
                              className='size-12 object-cover rounded-full'
                              loading='lazy'
                           />
                           <div className='flex flex-col'>
                              <p className='text-sm font-medium'>
                                 {teacher.name}
                              </p>
                              <span className='text-sm text-gray-700'>
                                 {teacher.specialized}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      );
   }
);

TeacherSection.displayName = 'TeacherSection';
TeacherSection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      teachers: PropTypes.array
   }),
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};

export default TeacherSection;
