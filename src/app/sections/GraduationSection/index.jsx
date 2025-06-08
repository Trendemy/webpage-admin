import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import ImagePreview from '~/components/ImagePreview';
import { Input } from '~/components/UI';

const GraduationSection = forwardRef(
   ({ section = {}, onInputChange, errors = {} }, ref) => {
      const { sectionName } = useSectionName('graduationSection');
      const { title = '', subtitle = '', images = [] } = section;
      return (
         <section className='mb-5' ref={ref}>
            <h3 className='text-xl font-semibold mb-2'>Graduation Section</h3>
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
               </div>
               <ImagePreview
                  sectionName={sectionName()}
                  images={images}
                  max={6}
                  onInputChange={onInputChange}
                  error={errors.images}
               />
            </div>
         </section>
      );
   }
);
GraduationSection.displayName = 'GraduationSection';
GraduationSection.propTypes = {
   section: PropTypes.shape({
      images: PropTypes.array.isRequired
   }),
   onInputChange: PropTypes.func,
   errors: PropTypes.object
};
export default GraduationSection;
