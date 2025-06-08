import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { cn } from '~/utils';

const Textarea = ({
   label,
   placeholder,
   id,
   name,
   rows = 5,
   value,
   onChange,
   disabled,
   className,
   error,
   maxLength,
   ...props
}) => {
   const generatedId = useMemo(
      () => id || Math.random().toString(36).slice(2, 11),
      [id]
   );

   const charactersCount = value?.length || 0;
   const isNearLimit = maxLength && charactersCount >= maxLength * 0.9;
   const isAtLimit = maxLength && charactersCount >= maxLength;

   return (
      <div className='group w-full'>
         {label && (
            <label
               htmlFor={generatedId}
               className='text-sm font-medium text-gray-900 mb-1'
            >
               {label}
            </label>
         )}
         <textarea
            id={generatedId}
            name={name}
            rows={rows}
            className={cn(
               'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none',
               { 'border-red-500 bg-red-200/25': error || isAtLimit },
               className
            )}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
         ></textarea>
         <div className='flex gap-3'>
            {error && (
               <span className='text-red-500 text-sm group-focus-within:hidden mt-1'>
                  {error}
               </span>
            )}
            {maxLength && (
               <span
                  className={cn('text-sm font-medium ml-auto', {
                     'text-gray-500': !isNearLimit && !isAtLimit,
                     'text-yellow-600': isNearLimit && !isAtLimit,
                     'text-red-500': isAtLimit
                  })}
               >
                  {charactersCount}/{maxLength}
               </span>
            )}
         </div>
      </div>
   );
};

Textarea.propTypes = {
   type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
   id: PropTypes.string,
   name: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   className: PropTypes.string,
   value: PropTypes.string,
   rows: PropTypes.number,
   onChange: PropTypes.func,
   autoFocus: PropTypes.bool,
   required: PropTypes.bool,
   disabled: PropTypes.bool,
   error: PropTypes.string,
   maxLength: PropTypes.number
};
export default Textarea;
