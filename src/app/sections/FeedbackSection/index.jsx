import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';

const FeedbackSection = forwardRef(
   (
      {
         section = {},
         imagesPreview,
         onInputChange,
         onUpdateChildOfSection,
         errors = {}
      },
      ref
   ) => {
      const { sectionName } = useSectionName('feedbackSection');
      const {
         title = '',
         subtitle = '',
         feedbacks = [],
         images = []
      } = section;

      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-5'>Feedback Section</h3>
            <div className='flex lg:flex-row flex-col gap-10'>
               <div className={imagesPreview ? 'flex-1' : 'lg:w-1/2'}>
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
                  <div className='flex flex-wrap gap-5'>
                     <div className='w-full flex justify-between'>
                        <h5 className='text-sm font-medium'>Feedbacks:</h5>
                        <span
                           className='text-sm cursor-pointer select-none'
                           onClick={() =>
                              onUpdateChildOfSection(
                                 sectionName('feedbacks'),
                                 'add',
                                 {
                                    avatar: '',
                                    name: '',
                                    role: '',
                                    feedback: ''
                                 }
                              )
                           }
                        >
                           Thêm
                        </span>
                     </div>
                     <div className='w-full'>
                        {feedbacks.map((item, index) => (
                           <div key={index} className='mb-3'>
                              <hr className='mb-3' />
                              <div className='flex gap-5'>
                                 <ImageSelector
                                    src={item.avatar}
                                    name={sectionName(
                                       'feedbacks',
                                       index,
                                       'avatar'
                                    )}
                                    className='size-28 rounded-full'
                                    onChange={onInputChange}
                                    error={!!errors.feedbacks?.[index]?.avatar}
                                 />
                                 <div className='flex-1 flex flex-col gap-3'>
                                    <Input
                                       placeholder='Tên'
                                       name={sectionName(
                                          'feedbacks',
                                          index,
                                          'name'
                                       )}
                                       value={item.name}
                                       onChange={onInputChange}
                                       error={errors.feedbacks?.[index]?.name}
                                    />

                                    <Input
                                       placeholder='Vai trò'
                                       name={sectionName(
                                          'feedbacks',
                                          index,
                                          'role'
                                       )}
                                       value={item.role}
                                       onChange={onInputChange}
                                       error={errors.feedbacks?.[index]?.role}
                                    />
                                    <Textarea
                                       placeholder='Mô tả'
                                       name={sectionName(
                                          'feedbacks',
                                          index,
                                          'feedback'
                                       )}
                                       value={item.feedback}
                                       onChange={onInputChange}
                                       rows={3}
                                       error={
                                          errors.feedbacks?.[index]?.feedback
                                       }
                                       maxLength={380}
                                    />
                                 </div>
                              </div>
                              <div className='text-right mt-3'>
                                 <span
                                    className='text-sm text-rose-600 cursor-pointer select-none'
                                    onClick={() =>
                                       onUpdateChildOfSection(
                                          sectionName('feedbacks', index),
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
               {imagesPreview && (
                  <div className='flex-1'>
                     {errors?.images && (
                        <p className='text-sm text-red-500 text-center mb-5'>
                           {errors.images}
                        </p>
                     )}
                     <div className='w-4/5 flex mx-auto gap-5'>
                        <div className='flex-1 mt-auto'>
                           <ImageSelector
                              src={images[0]}
                              name={sectionName('images', 0)}
                              className='rounded-tl-md rounded-bl-md rounded-tr-[120px] rounded-br-[120px] aspect-[1/1.5]'
                              onChange={onInputChange}
                           />
                        </div>
                        <div className='flex-1'>
                           <ImageSelector
                              src={images[1]}
                              name={sectionName('images', 1)}
                              className='rounded-tl-[120px] rounded-bl-[120px] rounded-tr-md rounded-br-md aspect-[1/1.5]'
                              onChange={onInputChange}
                           />
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </section>
      );
   }
);

FeedbackSection.displayName = 'FeedbackSection';
FeedbackSection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      feedbacks: PropTypes.arrayOf(
         PropTypes.shape({
            avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
            name: PropTypes.string,
            role: PropTypes.string,
            feedback: PropTypes.string
         })
      )
   }),
   imagesPreview: PropTypes.bool,
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};

export default FeedbackSection;
