import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';

const WhoJoinSection = forwardRef(
   (
      { section = {}, onInputChange, onUpdateChildOfSection, errors = {} },
      ref
   ) => {
      const { sectionName } = useSectionName('joinSection');
      const { title = '', objects = [], images = [] } = section;

      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-5'>Who Join Section</h3>
            <div className='flex lg:flex-row flex-col gap-10'>
               <div className='flex-1'>
                  <div className='mb-5'>
                     <Input
                        label='Tiêu đề: '
                        name={sectionName('title')}
                        value={title}
                        onChange={onInputChange}
                        error={errors.title}
                     />
                  </div>
                  <div className='flex flex-wrap gap-5'>
                     <div className='w-full flex justify-between'>
                        <h5 className='text-sm font-medium'>Đối tượng:</h5>
                        <span
                           className='text-sm cursor-pointer select-none'
                           onClick={() =>
                              onUpdateChildOfSection(
                                 sectionName('objects'),
                                 'add',
                                 {
                                    image: '',
                                    name: '',
                                    description: ''
                                 }
                              )
                           }
                        >
                           Thêm
                        </span>
                     </div>
                     <div className='w-full'>
                        {objects.map((object, index) => (
                           <div key={index} className='mb-3'>
                              <hr className='mb-3' />
                              <div className='flex gap-5'>
                                 <ImageSelector
                                    src={object.image}
                                    name={sectionName(
                                       'objects',
                                       index,
                                       'image'
                                    )}
                                    className='size-28 rounded-full'
                                    onChange={onInputChange}
                                    error={!!errors.objects?.[index]?.image}
                                 />
                                 <div className='flex-1 flex flex-col gap-3'>
                                    <Input
                                       placeholder='Đối tượng'
                                       name={sectionName(
                                          'objects',
                                          index,
                                          'name'
                                       )}
                                       value={object.name}
                                       onChange={onInputChange}
                                       error={errors.objects?.[index]?.name}
                                    />
                                    <Textarea
                                       placeholder='Mô tả'
                                       name={sectionName(
                                          'objects',
                                          index,
                                          'description'
                                       )}
                                       value={object.description}
                                       onChange={onInputChange}
                                       rows={3}
                                       error={
                                          errors.objects?.[index]?.description
                                       }
                                    />
                                 </div>
                              </div>
                              <div className='text-right mt-3'>
                                 <span
                                    className='text-sm text-rose-600 cursor-pointer select-none'
                                    onClick={() =>
                                       onUpdateChildOfSection(
                                          sectionName('objects', index),
                                          'delete'
                                       )
                                    }
                                 >
                                    Xóa
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className='flex-1'>
                  {errors?.images && (
                     <p className='text-sm text-red-500 text-center mb-5'>
                        {errors.images}
                     </p>
                  )}
                  <div className='w-4/5 flex mx-auto gap-10'>
                     <div className='flex-1 mt-auto'>
                        <ImageSelector
                           src={images[0]}
                           name={sectionName('images', 0)}
                           className='rounded-xl aspect-[1/1]'
                           onChange={onInputChange}
                        />
                     </div>
                     <div className='flex-1'>
                        <ImageSelector
                           src={images[1]}
                           name={sectionName('images', 1)}
                           className='rounded-xl aspect-[1/2]'
                           onChange={onInputChange}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      );
   }
);

WhoJoinSection.displayName = 'WhoJoinSection';
WhoJoinSection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string,
      objects: PropTypes.array
   }),
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};

export default WhoJoinSection;
