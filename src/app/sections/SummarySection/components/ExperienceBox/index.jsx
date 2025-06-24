import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import ImagePreview from '~/components/ImagePreview';
import { Input } from '~/components/UI';

const ExperienceBox = ({
    name,
    register,
    control,
    onRemove,
    errors,
    isLoading
}) => {
    return (
        <div className='border rounded-md p-2'>
            <div className='p-5'>
                <Input
                    placeholder='Tiêu đề'
                    {...register(`${name}.title`)}
                    className='text-xl font-semibold text-center border-none bg-transparent focus:bg-transparent'
                    error={errors?.title?.message}
                    disabled={isLoading}
                />
                <div className='border-t border-dashed border-slate-400 my-3'></div>
                <div className='flex justify-center'>
                    <Controller
                        name={`${name}.images`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <ImagePreview
                                title=''
                                name={field.name}
                                images={field.value || []}
                                className={'w-fit h-14'}
                                max={5}
                                error={fieldState.error?.message}
                                onChange={field.onChange}
                                disabled={isLoading}
                            />
                        )}
                    />
                </div>
            </div>
            <div className='flex justify-around items-center'>
                <button
                    type='button'
                    className='text-sm uppercase text-red-500 btn-link'
                    onClick={() => !isLoading && onRemove()}
                    disabled={isLoading}
                >
                    Xóa mục này
                </button>
            </div>
        </div>
    );
};

ExperienceBox.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};
export default ExperienceBox;
