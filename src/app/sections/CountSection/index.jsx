import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import { Input } from '~/components/UI';
import { X } from '~/components/Icons';

const CountSection = ({
    name = 'countSection',
    register,
    control,
    errors = {},
    isLoading
}) => {
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <section className='mb-10'>
            <div className='lg:w-1/2'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-xl font-bold uppercase mb-5'>
                        Counter Section
                    </h3>
                    <button
                        type='button'
                        className='text-sm text-blue-500 uppercase btn-link'
                        onClick={() =>
                            !isLoading &&
                            append({ name: '', number: 0, max: 0 })
                        }
                        disabled={isLoading}
                    >
                        Thêm counter
                    </button>
                </div>
                <div className='flex flex-col gap-5'>
                    {fields?.map((field, index) => (
                        <div key={field.id} className='border-b'>
                            <div className='flex-1 flex gap-3'>
                                <div className='flex-1'>
                                    <Input
                                        id={`${name}.${index}.name`}
                                        label='Tên'
                                        {...register(`${name}.${index}.name`)}
                                        error={errors?.[index]?.name?.message}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Input
                                        id={`${name}.${index}.number`}
                                        label='Giá trị'
                                        {...register(`${name}.${index}.number`)}
                                        error={errors?.[index]?.number?.message}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Input
                                        id={`${name}.${index}.max`}
                                        label='Giá trị lớn nhất'
                                        {...register(`${name}.${index}.max`)}
                                        error={errors?.[index]?.max?.message}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div className='text-center mt-3'>
                                <button
                                    type='button'
                                    className='text-sm text-red-500 uppercase btn-link'
                                    onClick={() => !isLoading && remove(index)}
                                    disabled={isLoading}
                                >
                                    Xoá counter {index + 1}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
CountSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.array
};
export default CountSection;
