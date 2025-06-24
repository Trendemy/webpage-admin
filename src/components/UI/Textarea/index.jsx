import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '~/utils';

const Textarea = forwardRef(
    (
        {
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
            ...props
        },
        ref
    ) => {
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
                <textarea
                    id={id}
                    name={name}
                    rows={rows}
                    ref={ref}
                    className={cn(
                        'w-full block text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:cursor-not-allowed disabled:opacity-60 p-2.5',
                        {
                            'border-red-500 bg-red-200/25 focus:bg-red-200/25 focus:ring-red-500 focus:border-red-500':
                                error
                        },
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
                        <span className='text-red-500 text-sm mt-1'>
                            {error}
                        </span>
                    )}
                </div>
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
Textarea.propTypes = {
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
    error: PropTypes.string
};
export default Textarea;
