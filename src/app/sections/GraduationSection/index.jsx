import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import ImagePreview from '~/components/ImagePreview';
import { Input } from '~/components/UI';

const GraduationSection = ({
    name = 'graduationSection',
    register,
    control,
    errors = {},
    isLoading
}) => {
    return (
        <section className='mb-5'>
            <h3 className='text-xl font-bold uppercase mb-2'>
                Graduation Section
            </h3>
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
                </div>
                <Controller
                    name={`${name}.images`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <ImagePreview
                            name={field.name}
                            images={field.value || []}
                            max={6}
                            error={fieldState.error?.message}
                            onChange={field.onChange}
                            disabled={isLoading}
                        />
                    )}
                />
            </div>
        </section>
    );
};

GraduationSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};
export default GraduationSection;
