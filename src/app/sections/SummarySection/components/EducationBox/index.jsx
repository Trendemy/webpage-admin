import { Input, Textarea } from '~/components/UI';
import AchievementBox from '../AchievementBox';
import { cn } from '~/utils';
import PropTypes from 'prop-types';

const EducationBox = ({
   data = {},
   sectionName,
   onInputChange,
   type = 'primary',
   position = 'top',
   roundedStart,
   roundedEnd,
   errors = {}
}) => {
   const background = {
      primary: 'bg-primary',
      secondary: 'bg-secondary'
   };
   return (
      <div className='relative flex-1 p-2'>
         <div
            className={cn(
               'absolute w-1.5 h-28 left-1/2 -translate-x-1/2',
               background[type],
               { 'bottom-full -mb-3': position === 'top' },
               { 'top-full -mt-3': position === 'bottom' }
            )}
         >
            <AchievementBox
               name={`${sectionName}.icon`}
               active={data?.icon}
               onChange={onInputChange}
               primary={type === 'primary'}
               position={position}
               error={errors?.icon}
            />
         </div>
         <div
            className={cn(
               'h-full flex justify-center items-center overflow-hidden',
               background[type]
            )}
            style={{
               borderStartStartRadius: roundedStart
                  ? `${roundedStart}px`
                  : undefined,
               borderEndStartRadius: roundedStart
                  ? `${roundedStart}px`
                  : undefined,
               borderStartEndRadius: roundedEnd ? `${roundedEnd}px` : undefined,
               borderEndEndRadius: roundedEnd ? `${roundedEnd}px` : undefined
            }}
         >
            <Input
               name={`${sectionName}.year`}
               placeholder='Năm'
               value={data?.year}
               onChange={onInputChange}
               className='text-2xl font-bold text-center border-none text-white bg-transparent focus:bg-transparent placeholder-slate-200'
               error={errors?.year}
            />
         </div>
         <div
            className={cn(
               'absolute flex inset-x-0 px-5',
               { 'top-full flex-col mt-3': position === 'top' },
               { 'bottom-full flex-col-reverse mb-3': position === 'bottom' }
            )}
         >
            <Input
               name={`${sectionName}.title`}
               value={data?.title}
               placeholder='Tiêu đề'
               onChange={onInputChange}
               className='text-base font-medium text-center border-none bg-transparent focus:bg-transparent'
               error={errors?.title}
            />
            <Textarea
               name={`${sectionName}.details`}
               placeholder='Chi tiết'
               value={data?.details}
               onChange={onInputChange}
               rows={3}
               className='resize-none'
               error={errors?.details}
            />
         </div>
      </div>
   );
};

EducationBox.propTypes = {
   data: PropTypes.object,
   sectionName: PropTypes.string,
   type: PropTypes.oneOf(['primary', 'secondary']),
   position: PropTypes.oneOf(['top', 'bottom']),
   roundedStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
   roundedEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
   onInputChange: PropTypes.func,
   errors: PropTypes.object
};
export default EducationBox;
