import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import { Input } from '~/components/UI';
import ContentOfChapter from '~/app/sections/ContentSection/components/ContentOfChapter';

const Chapter = ({ name, register, control, errors = {}, isLoading }) => {
    const { fields, append, remove } = useFieldArray({ control, name });
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex justify-between items-center'>
                <h5 className='text-lg font-semibold uppercase'>
                    Danh sách chương
                </h5>
                <button
                    type='button'
                    className='text-sm text-blue-500 uppercase btn-link'
                    onClick={() =>
                        !isLoading && append({ title: '', content: [] })
                    }
                    disabled={isLoading}
                >
                    Thêm chương
                </button>
            </div>
            <div className='flex flex-col gap-5'>
                {fields.map((field, index) => (
                    <div key={field.id} className='border rounded-md'>
                        <div className='flex'>
                            <Input
                                placeholder='Tên chương'
                                className='text-lg text-center font-semibold bg-transparent focus:bg-transparent border-none'
                                {...register(`${name}.${index}.title`)}
                                error={errors?.[index]?.title?.message}
                                disabled={isLoading}
                            />
                        </div>
                        <ContentOfChapter
                            name={`${name}.${index}.content`}
                            register={register}
                            control={control}
                            isLoading={isLoading}
                            errors={errors?.content}
                        />
                        <div className='flex justify-center mb-1'>
                            <button
                                type='button'
                                className='text-sm text-red-500 uppercase btn-link'
                                onClick={() => !isLoading && remove(index)}
                                disabled={isLoading}
                            >
                                xoá chương {index + 1}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Chapter.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.array
};

export default Chapter;
