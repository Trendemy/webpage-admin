import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { cn } from '~/utils';

const Input = ({
   id,
   name,
   label,
   placeholder,
   type = 'text',
   autoFocus,
   value,
   onChange,
   required,
   disabled,
   className,
   errorClass,
   error,
   ...props
}) => {
   const generatedId = useMemo(
      () => id || Math.random().toString(36).slice(2, 11),
      [id]
   );

   const handleChange = (e) => {
      if (!disabled && onChange) {
         onChange(e);
      }
   };

   return (
      <div className='group w-full'>
         {label && (
            <label
               htmlFor={id || generatedId}
               className='text-sm font-medium text-gray-900 mb-1'
            >
               {label}
            </label>
         )}
         <input
            type={type}
            id={id || generatedId}
            name={name}
            className={cn(
               'bg-gray-50 border-gray-300 border text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:ring-blue-500 focus:border-blue-500 block w-full outline-none p-2.5',
               { 'border-red-500 bg-red-200/25': error },
               className
            )}
            placeholder={placeholder}
            autoFocus={autoFocus}
            value={value}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            {...props}
         />
         {error && (
            <span
               className={cn(
                  'text-red-500 text-sm group-focus-within:hidden mt-1',
                  errorClass
               )}
            >
               {error}
            </span>
         )}
      </div>
   );
};

Input.propTypes = {
   className: PropTypes.string,
   errorClass: PropTypes.string,
   type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
   id: PropTypes.string,
   name: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   onChange: PropTypes.func,
   autoFocus: PropTypes.bool,
   required: PropTypes.bool,
   disabled: PropTypes.bool,
   error: PropTypes.string
};

export default Input;
