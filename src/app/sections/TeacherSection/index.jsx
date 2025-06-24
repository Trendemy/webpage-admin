import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import TeacherCard from '~/app/sections/TeacherSection/components/TeacherCard';
import { Input } from '~/components/UI';

const TeacherSection = ({
    name = 'teacherSection',
    register,
    control,
    errors = {},
    isLoading
}) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `${name}.teachers`
    });
    return (
        <section className='mb-5'>
            <h3 className='text-xl font-bold uppercase mb-2'>
                Teacher Section
            </h3>
            <div className='lg:w-1/2'>
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
                <hr />
            </div>
            <h5 className='text-lg font-semibold text-center uppercase my-2'>
                Danh sách giảng viên
            </h5>
            <div className='text-center'>
                <button
                    type='button'
                    className='text-blue-500 text-sm uppercase btn-link'
                    onClick={() =>
                        !isLoading &&
                        append({
                            avatar: '',
                            name: '',
                            specialized: '',
                            description: '',
                            facebook: '',
                            linkedin: ''
                        })
                    }
                    disabled={isLoading}
                >
                    Thêm giảng viên
                </button>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mt-5'>
                {fields.map((field, index) => (
                    <TeacherCard
                        key={field.id}
                        name={`${name}.teachers.${index}`}
                        register={register}
                        control={control}
                        onRemove={() => remove(index)}
                        errors={errors?.teachers?.[index]}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </section>
    );
};

TeacherSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};

export default TeacherSection;
