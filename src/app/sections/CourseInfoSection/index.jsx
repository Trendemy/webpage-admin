import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Input } from '~/components/UI';

const CourseInfoSection = forwardRef(
   ({ name = '', type = '', onInputChange, errors = {} }, ref) => {
      return (
         <section className='mb-10' ref={ref}>
            <div className='lg:w-1/2'>
               <div className='flex md:flex-row flex-col gap-5'>
                  <div className='flex-1'>
                     <Input
                        label='Tên khóa học '
                        name='name'
                        value={name}
                        onChange={onInputChange}
                        error={errors.name}
                     />
                  </div>
                  <div className='flex-1'>
                     <Input
                        label='Thể loại: '
                        name='type'
                        value={type}
                        onChange={onInputChange}
                        error={errors.type}
                     />
                  </div>
               </div>
            </div>
         </section>
      );
   }
);

CourseInfoSection.displayName = 'CourseInfoSection';
CourseInfoSection.propTypes = {
   name: PropTypes.string,
   type: PropTypes.string,
   onInputChange: PropTypes.func,
   errors: PropTypes.object
};
export default CourseInfoSection;
