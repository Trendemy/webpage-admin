import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '~/utils';

const Input = forwardRef(
    (
        {
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
        },
        ref
    ) => {
        const handleChange = (e) => {
            if (!disabled && onChange) {
                onChange(e);
            }
        };

        return (
            <div className='w-full'>
                {label && (
                    <label
                        htmlFor={id}
                        className='text-sm font-medium text-gray-900 mb-1'
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={id}
                    name={name}
                    className={cn(
                        'w-full block bg-gray-50 border-gray-300 border text-gray-900 text-sm rounded-md focus:bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:cursor-not-allowed disabled:opacity-60 transition-colors duration-200 p-2.5',
                        {
                            'border-red-500 bg-red-200/25 focus:bg-red-200/25 focus:ring-red-500 focus:border-red-500':
                                error
                        },
                        className
                    )}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    disabled={disabled}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <span
                        className={cn('text-red-500 text-sm mt-1', errorClass)}
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
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
