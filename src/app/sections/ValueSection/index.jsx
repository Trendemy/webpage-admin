import PropTypes from 'prop-types';
import ImageSelector from '~/components/ImageSelector';
import { Input } from '~/components/UI';
import { X } from '~/components/Icons';
import { useFieldArray } from 'react-hook-form';

const ValueSection = ({
    name = 'valueSection',
    register,
    watch,
    control,
    errors = {},
    isLoading
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `${name}.content`
    });
    return (
        <section className='mb-10'>
            <h3 className='text-xl font-bold uppercase mb-5'>Value Section</h3>
            <div className='flex lg:flex-row flex-col gap-10'>
                <div className='flex-1'>
                    <div className='mb-5'>
                        <Input
                            id={`${name}.title`}
                            label='Tiêu đề'
                            {...register(`${name}.title`)}
                            error={errors?.title?.message}
                            disabled={isLoading}
                        />
                    </div>
                    <div className='mb-5'>
                        <Input
                            id={`${name}.subtitle`}
                            label='Tiêu đề phụ'
                            {...register(`${name}.subtitle`)}
                            error={errors?.subtitle?.message}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <div className='flex justify-between items-center mb-3'>
                            <h5 className='text-lg font-semibold uppercase'>
                                Danh sách lợi ích
                            </h5>
                            <button
                                type='button'
                                className='text-sm text-blue-500 uppercase btn-link'
                                onClick={() => !isLoading && append('')}
                                disabled={isLoading}
                            >
                                Thêm lợi ích
                            </button>
                        </div>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className='flex items-center gap-3 mb-5'
                            >
                                <div className='flex-1'>
                                    <Input
                                        placeholder='Nhập lợi ích'
                                        {...register(
                                            `${name}.content.${index}`
                                        )}
                                        error={errors.content?.[index]?.message}
                                        disabled={isLoading}
                                    />
                                </div>

                                <button
                                    type='button'
                                    className='size-fit text-red-500 bg-transparent disabled:cursor-not-allowed disabled:opacity-60 outline-none'
                                    onClick={() => !isLoading && remove(index)}
                                    disabled={isLoading}
                                >
                                    <X className='size-5' />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex-1'>
                    {errors?.images?.root?.message && (
                        <p className='text-sm text-red-500 text-center mb-5'>
                            {errors.images.root.message}
                        </p>
                    )}
                    <div className='w-4/5 flex mx-auto gap-5'>
                        <div className='flex-1'>
                            <ImageSelector
                                value={watch(`${name}.images.${0}`)}
                                {...register(`${name}.images.${0}`)}
                                className='rounded-xl aspect-[1/1.5]'
                                error={!!errors?.images?.[0]}
                                disabled={isLoading}
                            />
                        </div>
                        <div className='flex-1 flex flex-col gap-5'>
                            <div className='flex-1'>
                                <ImageSelector
                                    value={watch(`${name}.images.${1}`)}
                                    {...register(`${name}.images.${1}`)}
                                    className='rounded-xl aspect-[1.4/1]'
                                    error={!!errors?.images?.[1]}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className='flex-1'>
                                <ImageSelector
                                    value={watch(`${name}.images.${2}`)}
                                    {...register(`${name}.images.${2}`)}
                                    className='rounded-xl aspect-[1.4/1]'
                                    error={!!errors?.images?.[2]}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

ValueSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};
export default ValueSection;
