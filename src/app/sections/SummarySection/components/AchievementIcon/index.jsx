import { cn } from '~/utils';
import PropTypes from 'prop-types';

const AchievementIcon = ({
   id,
   name,
   value,
   onChange,
   isButton,
   primary,
   icon,
   onClick,
   className
}) => {
   const Comp = isButton ? 'button' : 'div';
   return (
      <Comp
         className={cn(
            'relative size-14 bg-[#FFFAFA] rounded-full cursor-pointer shadow-[0px_0px_8px_0px_#26262640_inset,_0px_0px_4px_0px_#26262626_inset] outline-none overflow-hidden p-1.5',
            className
         )}
         onClick={onClick}
      >
         {icon && (
            <div
               className={cn(
                  'flex justify-center items-center rounded-full border-4 aspect-square',
                  primary
                     ? 'border-primary text-primary'
                     : 'border-secondary text-secondary'
               )}
            >
               {icon}
            </div>
         )}

         {!isButton && (
            <div className='absolute inset-0'>
               <label
                  htmlFor={id}
                  className='absolute inset-0 cursor-pointer'
               />
               <input
                  hidden
                  id={id}
                  type='radio'
                  name={name}
                  value={value}
                  onChange={onChange}
               />
            </div>
         )}
      </Comp>
   );
};

AchievementIcon.propTypes = {
   isButton: PropTypes.bool,
   primary: PropTypes.bool,
   icon: PropTypes.node,
   onClick: PropTypes.func,
   className: PropTypes.string,
   id: PropTypes.string,
   name: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func
};
export default AchievementIcon;
