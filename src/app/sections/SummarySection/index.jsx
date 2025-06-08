import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import { Input } from '~/components/UI';
import ExperienceContainer from './components/ExperienceContainer';
import EducationContainer from './components/EducationContainer';

const SummarySection = forwardRef(
   (
      { section = {}, onInputChange, onUpdateChildOfSection, errors = {} },
      ref
   ) => {
      const { sectionName } = useSectionName('summarySection');
      const {
         title = '',
         subtitle = '',
         education = [],
         experience = []
      } = section;

      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-5'>Summary Section</h3>
            <div className='lg:w-1/2 mb-3'>
               <div className='mb-5'>
                  <Input
                     label='Tiêu đề'
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
            <EducationContainer
               data={education}
               sectionName={sectionName('education')}
               onInputChange={onInputChange}
               errors={errors.education}
            />

            <ExperienceContainer
               data={experience}
               sectionName={sectionName('experience')}
               onUpdateChildOfSection={onUpdateChildOfSection}
               onInputChange={onInputChange}
               errors={errors.experience}
            />
         </section>
      );
   }
);

SummarySection.displayName = 'SummarySection';
SummarySection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      education: PropTypes.array,
      experience: PropTypes.array
   }),
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};

export default SummarySection;
