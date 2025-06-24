import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import { Input } from '~/components/UI';
import { X } from '~/components/Icons';

const ContentOfChapter = ({
    name,
    register,
    control,
    errors = {},
    isLoading
}) => {
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <div className='p-3'>
            <div className='flex justify-between items-center mb-3'>
                <p className='text-sm font-medium uppercase'>Nội dung</p>
                <button
                    type='button'
                    className='text-sm text-blue-500 uppercase btn-link'
                    onClick={() => !isLoading && append('')}
                    disabled={isLoading}
                >
                    Thêm nội dung
                </button>
            </div>
            <div className='flex flex-col gap-3'>
                {fields.map((field, index) => (
                    <div key={field.id} className='flex items-center gap-3'>
                        <div className='flex-1'>
                            <Input
                                placeholder='Nội dung'
                                {...register(`${name}.${index}`)}
                                error={errors?.[index]}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type='button'
                            className='size-fit text-red-500 bg-transparent disabled:cursor-not-allowed disabled:opacity-60'
                            onClick={() => !isLoading && remove(index)}
                            disabled={isLoading}
                        >
                            <X className='size-5' />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

ContentOfChapter.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};

export default ContentOfChapter;
