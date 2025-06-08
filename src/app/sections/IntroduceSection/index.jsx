import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import ImageSelector from '~/components/ImageSelector';
import { Textarea, Input } from '~/components/UI';

const IntroduceSection = forwardRef(
   ({ section = {}, onInputChange, errors = {} }, ref) => {
      const { sectionName } = useSectionName('introduceSection');
      const {
         title = '',
         highlightTitle = '',
         description = '',
         images = []
      } = section;

      return (
         <section className='mb-40' ref={ref}>
            <h3 className='text-xl font-semibold mb-2'>Introduce Section</h3>
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
                        label='Nổi bật tiêu đề: '
                        name={sectionName('highlightTitle')}
                        value={highlightTitle}
                        onChange={onInputChange}
                        error={errors.highlightTitle}
                     />
                  </div>

                  <div>
                     <Textarea
                        label='Mô tả'
                        name={sectionName('description')}
                        value={description}
                        onChange={onInputChange}
                        error={errors.description}
                        maxLength={380}
                     />
                  </div>
               </div>
               <div className='flex-1'>
                  {errors?.images && (
                     <p className='text-sm text-red-500 text-center mb-5'>
                        {errors.images}
                     </p>
                  )}
                  <div className='w-4/5 relative mx-auto'>
                     <div className='w-3/5'>
                        <ImageSelector
                           src={images[0]}
                           name={sectionName('images', 0)}
                           className='rounded-3xl aspect-[1/1.5]'
                           onChange={onInputChange}
                        />
                     </div>
                     <div className='w-3/5 absolute top-0 right-0 translate-y-28'>
                        <ImageSelector
                           src={images[1]}
                           name={sectionName('images', 1)}
                           className='rounded-3xl aspect-[1/1.5]'
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

IntroduceSection.displayName = 'IntroduceSection';
IntroduceSection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string.isRequired,
      highlightTitle: PropTypes.string,
      description: PropTypes.string,
      images: PropTypes.array.isRequired
   }),
   onInputChange: PropTypes.func,
   errors: PropTypes.object
};
export default IntroduceSection;
