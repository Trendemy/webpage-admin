import { useFieldArray } from 'react-hook-form';
import PropTypes from 'prop-types';
import ExperienceBox from '../ExperienceBox';

const ExperienceContainer = ({
    name,
    register,
    control,
    errors = {},
    isLoading
}) => {
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <div className='relative border-t py-10'>
            <div className='text-center mb-5'>
                <h3 className='text-xl font-bold uppercase mb-3'>
                    Kinh nghiệm
                </h3>
                <button
                    type='button'
                    className='text-sm text-blue-500 uppercase btn-link'
                    onClick={() =>
                        !isLoading && append({ title: '', images: [] })
                    }
                    disabled={isLoading}
                >
                    Thêm kinh nghiệm
                </button>
            </div>
            <div className='grid lg:grid-cols-2 gap-5 pt-3'>
                {fields.map((field, index) => (
                    <ExperienceBox
                        key={field.id}
                        name={`${name}[${index}]`}
                        register={register}
                        control={control}
                        onRemove={() => remove(index)}
                        errors={errors?.[index]}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
};

ExperienceContainer.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.array
};

export default ExperienceContainer;
