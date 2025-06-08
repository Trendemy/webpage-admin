import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Input, Textarea } from '~/components/UI';

const OverviewSection = forwardRef(
   ({ section = {}, onInputChange, errors = {} }, ref) => {
      const { title = '', description = '' } = section;
      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-5'>Overview Section</h3>
            <div className='lg:w-1/2'>
               <div className='mb-5'>
                  <Input
                     label='Tiêu đề: '
                     name='overviewSection.title'
                     value={title}
                     onChange={onInputChange}
                     error={errors?.title}
                  />
               </div>
               <div>
                  <Textarea
                     label='Mô tả:'
                     name='overviewSection.description'
                     value={description}
                     onChange={onInputChange}
                     error={errors?.description}
                     maxLength={380}
                  />
               </div>
            </div>
         </section>
      );
   }
);

OverviewSection.displayName = 'OverviewSection';
OverviewSection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
   }),
   onInputChange: PropTypes.func,
   errors: PropTypes.object
};
export default OverviewSection;
