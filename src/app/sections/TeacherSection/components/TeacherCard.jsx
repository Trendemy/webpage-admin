import PropTypes from 'prop-types';
import { Textarea, Input } from '~/components/UI';
import ImageSelector from '~/components/ImageSelector';
import { Controller } from 'react-hook-form';

const TeacherCard = ({
    name,
    register,
    control,
    onRemove,
    errors,
    isLoading
}) => {
    return (
        <div className='flex border rounded-2xl overflow-hidden'>
            <div className='w-1/3 -my-px -ml-px'>
                <Controller
                    name={`${name}.avatar`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <ImageSelector
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            className='size-full border-solid border-gray-200'
                            disabled={isLoading}
                            error={!!fieldState.error}
                        />
                    )}
                />
            </div>
            <div className='w-2/3 flex flex-col p-3 gap-5'>
                <div className='flex-1'>
                    <div className='flex'>
                        <Input
                            className='text-xl font-bold border-none bg-transparent focus:bg-transparent rounded-none p-1'
                            placeholder='Tên giảng viên'
                            {...register(`${name}.name`)}
                            error={errors?.name?.message}
                            disabled={isLoading}
                        />
                    </div>
                    <div className='flex mt-2'>
                        <Input
                            className='border-none bg-transparent focus:bg-transparent rounded-none p-1'
                            placeholder='Chuyên ngành'
                            {...register(`${name}.specialized`)}
                            error={errors?.specialized?.message}
                            disabled={isLoading}
                        />
                    </div>
                    <div className='border rounded-md mt-3'>
                        <Textarea
                            className='border-none bg-transparent rounded-none focus:bg-transparent resize-none p-2'
                            placeholder='Mô tả'
                            {...register(`${name}.description`)}
                            error={errors?.description?.message}
                            disabled={isLoading}
                        />
                    </div>
                    <div className='flex flex-col gap-1 mt-2'>
                        <div className='flex items-center gap-1'>
                            <span className='text-sm'>Facebook:</span>
                            <div className='flex-1 border-b'>
                                <Input
                                    className='text-blue-400 border-none bg-transparent focus:bg-transparent rounded-none p-1'
                                    placeholder='https://www.facebook.com/example'
                                    {...register(`${name}.facebook`)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        {errors?.facebook?.message && (
                            <span className='text-sm text-red-500'>
                                {errors.facebook.message}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col gap-1 mt-2'>
                        <div className='flex items-center gap-1'>
                            <span className='text-sm'>Linkedin:</span>
                            <div className='flex-1 border-b'>
                                <Input
                                    className='text-blue-400 border-none bg-transparent focus:bg-transparent rounded-none p-1'
                                    placeholder='https://vn.linkedin.com/in/example'
                                    {...register(`${name}.linkedin`)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        {errors?.linkedin?.message && (
                            <span className='text-sm text-red-500'>
                                {errors.linkedin.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className='flex justify-end items-end'>
                    <button
                        type='button'
                        className='text-sm text-red-500 uppercase btn-link'
                        onClick={isLoading ? undefined : onRemove}
                        disabled={isLoading}
                    >
                        Xoá giảng viên
                    </button>
                </div>
            </div>
        </div>
    );
};

TeacherCard.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    onRemove: PropTypes.func,
    errors: PropTypes.object,
    isLoading: PropTypes.bool
};

export default TeacherCard;
