import { Input, Textarea } from '~/components/UI';
import AchievementBox from '../AchievementBox';
import { cn } from '~/utils';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const EducationBox = ({
    name,
    register,
    control,
    type = 'primary',
    position = 'top',
    roundedStart,
    roundedEnd,
    errors = {},
    isLoading
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
                <Controller
                    name={`${name}.icon`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <AchievementBox
                            name={field.name}
                            active={field.value}
                            onChange={field.onChange}
                            primary={type === 'primary'}
                            position={position}
                            error={fieldState.error?.message}
                            disabled={isLoading}
                        />
                    )}
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
                    borderStartEndRadius: roundedEnd
                        ? `${roundedEnd}px`
                        : undefined,
                    borderEndEndRadius: roundedEnd
                        ? `${roundedEnd}px`
                        : undefined
                }}
            >
                <Input
                    placeholder='Năm'
                    {...register(`${name}.year`)}
                    className='text-2xl font-bold text-center border-none text-white bg-transparent focus:bg-transparent placeholder-slate-200'
                    error={errors?.year?.message}
                    disabled={isLoading}
                />
            </div>
            <div
                className={cn(
                    'absolute flex inset-x-0 px-5',
                    { 'top-full flex-col mt-3': position === 'top' },
                    {
                        'bottom-full flex-col-reverse mb-3':
                            position === 'bottom'
                    }
                )}
            >
                <Input
                    placeholder='Tiêu đề'
                    {...register(`${name}.title`)}
                    className='text-base font-medium text-center border-none bg-transparent focus:bg-transparent'
                    disabled={isLoading}
                    error={errors?.title?.message}
                />
                <Textarea
                    placeholder='Chi tiết'
                    {...register(`${name}.details`)}
                    rows={3}
                    className='resize-none'
                    error={errors?.details?.message}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};

EducationBox.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['primary', 'secondary']),
    position: PropTypes.oneOf(['top', 'bottom']),
    roundedStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    roundedEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};
export default EducationBox;
