import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import ImageSelector from '~/components/ImageSelector';
import { Input } from '~/components/UI';
import { X } from '~/components/Icons';

const GoalSection = forwardRef(
   (
      { section = {}, onInputChange, onUpdateChildOfSection, errors = {} },
      ref
   ) => {
      const { sectionName } = useSectionName('goalSection');
      const { title = '', subtitle = '', content = [], images = [] } = section;

      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-5'>Goal Section</h3>
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
                  <div className='mb-5'>
                     <Input
                        label='Tiêu đề phụ: '
                        name={sectionName('subtitle')}
                        value={subtitle}
                        onChange={onInputChange}
                        error={errors.subtitle}
                     />
                  </div>
                  <div>
                     <div className='flex justify-between mb-5'>
                        <h5 className='text-sm font-medium'>
                           Danh sách mục tiêu:
                        </h5>
                        <span
                           className='text-sm select-none cursor-pointer'
                           onClick={() =>
                              onUpdateChildOfSection(
                                 sectionName('content'),
                                 'add'
                              )
                           }
                        >
                           Thêm
                        </span>
                     </div>
                     {content &&
                        content.map((content, index) => (
                           <div
                              key={index}
                              className='group/item relative flex items-center gap-5 mb-5'
                           >
                              <Input
                                 name={sectionName('content', index)}
                                 value={content}
                                 onChange={onInputChange}
                                 error={errors.content?.[index]}
                              />
                              <div className='absolute invisible group-hover/item:visible right-0 bg-transparent translate-x-full pl-2'>
                                 <button
                                    className='h-fit w-fit text-rose-500 bg-transparent rounded-full border border-rose-300 focus:outline-none cursor-pointer p-1.5'
                                    onClick={() =>
                                       onUpdateChildOfSection(
                                          sectionName('content', index),
                                          'delete'
                                       )
                                    }
                                 >
                                    <X className='size-3.5' strokeWidth={1.5} />
                                 </button>
                              </div>
                           </div>
                        ))}
                  </div>
               </div>
               <div className='flex-1'>
                  {errors?.images && (
                     <p className='text-sm text-red-500 text-center mb-5'>
                        {errors.images}
                     </p>
                  )}
                  <div className='w-4/5 relative mx-auto'>
                     <div className='w-3/5 ml-auto'>
                        <ImageSelector
                           src={images[0]}
                           name={sectionName('images', 0)}
                           className='rounded-3xl aspect-[1/1.5]'
                           onChange={onInputChange}
                        />
                     </div>
                     <div className='w-3/5 absolute top-1/2 -translate-y-1/2'>
                        <ImageSelector
                           src={images[1]}
                           name={sectionName('images', 1)}
                           className='rounded-3xl aspect-[1.3/1]'
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

GoalSection.displayName = 'GoalSection';
GoalSection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string).isRequired,
      images: PropTypes.array.isRequired
   }),
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};

export default GoalSection;
