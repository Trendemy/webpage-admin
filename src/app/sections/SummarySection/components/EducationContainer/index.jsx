import PropTypes from 'prop-types';
import EducationBox from '../EducationBox';

const EducationContainer = ({
   data = [],
   sectionName,
   onInputChange,
   errors = {}
}) => {
   return (
      <div className='border-t mt-10'>
         <h3 className='text-2xl font-bold text-center mt-10'>Học vấn</h3>
         <div className='h-20 flex justify-between bg-[#F7F2F2] shadow-[0px_0px_4px_0px_#26262626_inset,_0px_0px_8px_0px_#26262640_inset] rounded-[35px] my-60'>
            {[...Array(5)].map((_, index, arr) => {
               const props = {};
               const rounded = '25';

               if (index === 0) props.roundedStart = rounded;
               if (index === arr.length - 1) props.roundedEnd = rounded;

               props.type = index % 2 === 0 ? 'primary' : 'secondary';
               props.position = index % 2 === 0 ? 'top' : 'bottom';

               return (
                  <EducationBox
                     key={index}
                     data={data?.[index]}
                     sectionName={`${sectionName}[${index}]`}
                     onInputChange={onInputChange}
                     errors={errors?.[index]}
                     {...props}
                  />
               );
            })}
         </div>
      </div>
   );
};

EducationContainer.propTypes = {
   data: PropTypes.array,
   sectionName: PropTypes.string,
   onInputChange: PropTypes.func,
   errors: PropTypes.object
};

export default EducationContainer;
