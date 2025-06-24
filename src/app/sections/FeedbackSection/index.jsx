import PropTypes from 'prop-types';
import { Controller, useFieldArray } from 'react-hook-form';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';

const FeedbackSection = ({
    name = 'feedbackSection',
    register,
    control,
    watch,
    withImagePreview,
    errors = {},
    isLoading
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `${name}.feedbacks`
    });
    return (
        <section className='mb-10'>
            <h3 className='text-xl font-bold uppercase mb-5'>
                Feedback Section
            </h3>
            <div className='flex lg:flex-row flex-col gap-10'>
                <div className={withImagePreview ? 'flex-1' : 'lg:w-1/2'}>
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
                    <div className='flex flex-wrap gap-2'>
                        <div className='w-full flex justify-between'>
                            <h5 className='text-lg font-semibold uppercase'>
                                Danh sách phản hồi
                            </h5>
                            <button
                                type='button'
                                className='text-sm text-blue-500 uppercase btn-link'
                                onClick={() =>
                                    !isLoading &&
                                    append({
                                        avatar: '',
                                        name: '',
                                        role: '',
                                        feedback: ''
                                    })
                                }
                                disabled={isLoading}
                            >
                                Thêm phản hồi
                            </button>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className='border rounded-md p-2'
                                >
                                    <div className='flex gap-5'>
                                        <Controller
                                            name={`${name}.feedbacks[${index}].avatar`}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <ImageSelector
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    className='size-28 rounded-full'
                                                    error={!!fieldState.error}
                                                    disabled={isLoading}
                                                />
                                            )}
                                        />
                                        <div className='flex-1 flex flex-col gap-3'>
                                            <Input
                                                id={`${name}.feedbacks[${index}].name`}
                                                placeholder='Tên'
                                                {...register(
                                                    `${name}.feedbacks[${index}].name`
                                                )}
                                                error={
                                                    errors.feedbacks?.[index]
                                                        ?.name?.message
                                                }
                                                disabled={isLoading}
                                            />

                                            <Input
                                                id={`${name}.feedbacks[${index}].role`}
                                                placeholder='Vai trò'
                                                {...register(
                                                    `${name}.feedbacks[${index}].role`
                                                )}
                                                error={
                                                    errors.feedbacks?.[index]
                                                        ?.role?.message
                                                }
                                                disabled={isLoading}
                                            />
                                            <Textarea
                                                id={`${name}.feedbacks[${index}].feedback`}
                                                placeholder='Mô tả'
                                                rows={3}
                                                {...register(
                                                    `${name}.feedbacks[${index}].feedback`
                                                )}
                                                error={
                                                    errors.feedbacks?.[index]
                                                        ?.feedback?.message
                                                }
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    <div className='text-right mt-1'>
                                        <button
                                            type='button'
                                            className='text-sm text-red-500 uppercase btn-link'
                                            onClick={() =>
                                                !isLoading && remove(index)
                                            }
                                            disabled={isLoading}
                                        >
                                            Xóa phản hồi
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {withImagePreview && (
                    <div className='flex-1'>
                        {errors?.images?.root?.message && (
                            <p className='text-sm text-red-500 text-center mb-5'>
                                {errors.images.root.message}
                            </p>
                        )}
                        <div className='w-4/5 flex mx-auto gap-5'>
                            <div className='flex-1 mt-auto'>
                                <ImageSelector
                                    {...register(`${name}.images.0`)}
                                    value={watch(`${name}.images.0`)}
                                    className='rounded-tl-md rounded-bl-md rounded-tr-[120px] rounded-br-[120px] aspect-[1/1.5]'
                                    error={!!errors?.images?.[0]}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className='flex-1'>
                                <ImageSelector
                                    {...register(`${name}.images.1`)}
                                    value={watch(`${name}.images.1`)}
                                    className='rounded-tl-[120px] rounded-bl-[120px] rounded-tr-md rounded-br-md aspect-[1/1.5]'
                                    error={!!errors?.images?.[1]}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

FeedbackSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    withImagePreview: PropTypes.bool,
    errors: PropTypes.object,
    isLoading: PropTypes.bool
};

export default FeedbackSection;
