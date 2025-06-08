import { useState } from 'react';
import PropTypes from 'prop-types';
import { useClickOutside } from '~/hooks';
import { cn } from '~/utils';
import { Article, Certificate, Education, Project } from '~/components/Icons';
import AchievementIcon from '../AchievementIcon';

const AchievementBox = ({
   name,
   active,
   position = 'top',
   primary,
   onChange,
   error
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const boxRef = useClickOutside(() => setIsOpen(false));
   const icons = {
      CERTIFICATE: Certificate,
      ARTICLE: Article,
      EDUCATION: Education,
      PROJECT: Project
   };

   const IconActive = icons[active];
   return (
      <div
         className={cn(
            'absolute size-14 left-1/2 -translate-x-1/2',
            { 'top-px -translate-y-full': position === 'top' },
            { 'bottom-px translate-y-full': position === 'bottom' }
         )}
         ref={boxRef}
      >
         <p className='absolute'>{error}</p>
         <AchievementIcon
            className='absolute size-full'
            isButton
            primary={primary}
            icon={icons[active] && <IconActive />}
            onClick={() => setIsOpen(!isOpen)}
         />
         <div
            className={cn(
               'absolute left-1/2 -translate-x-1/2 flex gap-3 rounded-full cursor-default select-none',
               { invisible: !isOpen },
               { 'bottom-full mb-3': position === 'top' },
               { 'top-full mt-3': position === 'bottom' }
            )}
            onClick={(e) => e.stopPropagation()}
         >
            {Object.entries(icons)
               .filter(([key]) => key !== active)
               .map(([key, IconComponent]) => (
                  <AchievementIcon
                     key={name + '-' + key}
                     id={name + '-' + key}
                     name={name}
                     primary={primary}
                     icon={<IconComponent />}
                     value={key}
                     onChange={onChange}
                  />
               ))}
         </div>
      </div>
   );
};

AchievementBox.propTypes = {
   name: PropTypes.string.isRequired,
   error: PropTypes.string,
   active: PropTypes.string,
   position: PropTypes.oneOf(['top', 'bottom']),
   primary: PropTypes.bool,
   onChange: PropTypes.func
};
export default AchievementBox;
