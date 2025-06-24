import PropTypes from 'prop-types';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';
import { X } from '~/components/Icons';
import { Controller, useFieldArray } from 'react-hook-form';

const CoreSection = ({
    name = 'coreSection',
    register,
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
            <h3 className='text-xl font-bold uppercase mb-3'>Core Section</h3>
            <div className='lg:max-w-xl border-b mb-3'>
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
            </div>
            <div className='text-center mb-5'>
                <button
                    type='button'
                    className='text-sm uppercase text-blue-500 btn-link'
                    onClick={() =>
                        !isLoading &&
                        append({ icon: '', name: '', description: '' })
                    }
                    disabled={isLoading}
                >
                    Thêm
                </button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className='relative border rounded-lg pt-10 p-5'
                    >
                        <button
                            type='button'
                            className='absolute size-7 top-0 right-0 bg-white text-rose-400 shadow-md rounded-full translate-x-1/2 -translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-60 p-1'
                            onClick={() => !isLoading && remove(index)}
                            disabled={isLoading}
                        >
                            <X strokeWidth={1.5} />
                        </button>
                        <Controller
                            name={`${name}.content[${index}].icon`}
                            control={control}
                            render={({ field, fieldState }) => (
                                <ImageSelector
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className='size-24 rounded-full bg-primary p-5 mx-auto mb-5'
                                    disabled={isLoading}
                                    error={!!fieldState.error}
                                />
                            )}
                        />
                        <div className='mb-3'>
                            <Input
                                id={`${name}.content[${index}].name`}
                                label='Tên'
                                {...register(`${name}.content[${index}].name`)}
                                error={errors.content?.[index]?.name?.message}
                                disabled={isLoading}
                            />
                        </div>
                        <div className='mb-3'>
                            <Textarea
                                id={`${name}.content[${index}].description`}
                                label='Mô tả'
                                {...register(
                                    `${name}.content[${index}].description`
                                )}
                                error={
                                    errors.content?.[index]?.description
                                        ?.message
                                }
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

CoreSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    errors: PropTypes.object,
    isLoading: PropTypes.bool
};
export default CoreSection;
