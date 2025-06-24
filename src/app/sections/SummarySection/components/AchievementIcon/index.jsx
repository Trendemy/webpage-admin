import { cn } from '~/utils';
import PropTypes from 'prop-types';

const AchievementIcon = ({
    id,
    name,
    value,
    onChange,
    isActive,
    primary,
    icon,
    onClick,
    className,
    disabled
}) => {
    return (
        <button
            type='button'
            className={cn(
                'relative size-14 bg-[#FFFAFA] rounded-full cursor-pointer shadow-[0px_0px_8px_0px_#26262640_inset,_0px_0px_4px_0px_#26262626_inset] outline-none overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed p-1',
                className
            )}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
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
            {!isActive && (
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
        </button>
    );
};

AchievementIcon.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.node,
    primary: PropTypes.bool,
    isActive: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};
export default AchievementIcon;
