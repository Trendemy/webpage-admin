import PropTypes from 'prop-types';
import { Button } from '~/components/UI';
import ExperienceBox from '../ExperienceBox';

const ExperienceContainer = ({
   data = [],
   sectionName,
   onInputChange,
   onUpdateChildOfSection,
   errors = {}
}) => {
   return (
      <div className='relative border-t py-10'>
         <div className='mb-3'>
            <h3 className='text-2xl font-bold text-center'>Kinh nghiệm</h3>
         </div>
         <div className='grid lg:grid-cols-2 gap-5 pt-3'>
            {data?.map((item, index) => (
               <ExperienceBox
                  key={index}
                  title={item.title}
                  images={item.images}
                  sectionName={`${sectionName}[${index}]`}
                  onInputChange={onInputChange}
                  onUpdateChildOfSection={onUpdateChildOfSection}
                  errors={errors?.[index]}
               />
            ))}

            <div className='flex justify-center items-center'>
               <Button
                  onClick={() =>
                     onUpdateChildOfSection(`${sectionName}`, 'add', {
                        title: '',
                        images: []
                     })
                  }
               >
                  Thêm
               </Button>
            </div>
         </div>
      </div>
   );
};

ExperienceContainer.propTypes = {
   title: PropTypes.string,
   data: PropTypes.array,
   sectionName: PropTypes.string,
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};

export default ExperienceContainer;
