import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';

const HeroSection = forwardRef(
   ({ section = {}, onInputChange, errors = {} }, ref) => {
      const { sectionName } = useSectionName('heroSection');

      const {
         title = '',
         highlightTitle = '',
         description = '',
         images = []
      } = section;

      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-5'>Hero Section</h3>
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
                  <p className='text-sm text-center text-gray-600 mb-3'>
                     [Image Preview]
                  </p>
                  {errors?.images && (
                     <p className='text-sm text-red-500 text-center mb-5'>
                        {errors.images}
                     </p>
                  )}
                  <div className='relative w-1/2 mx-auto'>
                     <ImageSelector
                        src={images[0]}
                        name={sectionName('images', 0)}
                        className='aspect-square'
                        onChange={onInputChange}
                     />
                     <div className='absolute w-1/2 bottom-0 border-t-8 border-r-8'>
                        <ImageSelector
                           src={images[1]}
                           name={sectionName('images', 1)}
                           className='aspect-square'
                           onChange={onInputChange}
                        />
                     </div>
                     <div className='w-5/12 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2'>
                        <ImageSelector
                           src={images[2]}
                           name={sectionName('images', 2)}
                           className='aspect-square rounded-full'
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

HeroSection.displayName = 'HeroSection';
HeroSection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string.isRequired,
      highlightTitle: PropTypes.string,
      description: PropTypes.string,
      images: PropTypes.array.isRequired
   }),
   onInputChange: PropTypes.func,
   errors: PropTypes.object
};
export default HeroSection;
