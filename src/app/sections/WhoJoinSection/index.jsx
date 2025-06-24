import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';

const WhoJoinSection = ({
    name = 'joinSection',
    register,
    watch,
    control,
    errors = {},
    isLoading
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `${name}.objects`
    });
    return (
        <section className='mb-10'>
            <h3 className='text-xl font-bold uppercase mb-5'>
                Who Join Section
            </h3>
            <div className='flex lg:flex-row flex-col gap-10'>
                <div className='flex-1'>
                    <div className='mb-5'>
                        <Input
                            label='Tiêu đề: '
                            {...register(`${name}.title`)}
                            error={errors?.title?.message}
                            disabled={isLoading}
                        />
                    </div>
                    <div className='flex flex-wrap gap-1'>
                        <div className='w-full flex justify-between items-center'>
                            <h5 className='text-lg font-semibold uppercase'>
                                danh sách đối tượng
                            </h5>
                            <button
                                type='button'
                                className='text-sm text-blue-500 uppercase btn-link'
                                onClick={() =>
                                    !isLoading &&
                                    append({
                                        image: '',
                                        name: '',
                                        description: ''
                                    })
                                }
                                disabled={isLoading}
                            >
                                Thêm đối tượng
                            </button>
                        </div>
                        <div className='w-full flex flex-col gap-5'>
                            {fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className='border rounded-md p-3'
                                >
                                    <div className='flex gap-5'>
                                        <ImageSelector
                                            value={watch(
                                                `${name}.objects.${index}.image`
                                            )}
                                            {...register(
                                                `${name}.objects.${index}.image`
                                            )}
                                            className='size-28 rounded-full'
                                            error={
                                                !!errors.objects?.[index]?.image
                                                    ?.message
                                            }
                                            disabled={isLoading}
                                        />
                                        <div className='flex-1 flex flex-col gap-3'>
                                            <Input
                                                placeholder='Đối tượng'
                                                {...register(
                                                    `${name}.objects.${index}.name`
                                                )}
                                                error={
                                                    errors.objects?.[index]
                                                        ?.name?.message
                                                }
                                                disabled={isLoading}
                                            />
                                            <Textarea
                                                placeholder='Mô tả'
                                                rows={3}
                                                {...register(
                                                    `${name}.objects.${index}.description`
                                                )}
                                                error={
                                                    errors.objects?.[index]
                                                        ?.description?.message
                                                }
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
                                            Xóa đối tượng
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    {errors?.images?.root?.message && (
                        <p className='text-sm text-red-500 text-center mb-5'>
                            {errors.images.root.message}
                        </p>
                    )}
                    <div className='w-4/5 flex mx-auto gap-10'>
                        <div className='flex-1 mt-auto'>
                            <ImageSelector
                                value={watch(`${name}.images.${0}`)}
                                {...register(`${name}.images.${0}`)}
                                className='rounded-xl aspect-[1/1]'
                                error={!!errors?.images?.[0]}
                                disabled={isLoading}
                            />
                        </div>
                        <div className='flex-1'>
                            <ImageSelector
                                value={watch(`${name}.images.${1}`)}
                                {...register(`${name}.images.${1}`)}
                                className='rounded-xl aspect-[1/2]'
                                error={!!errors?.images?.[1]}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

WhoJoinSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};

export default WhoJoinSection;
