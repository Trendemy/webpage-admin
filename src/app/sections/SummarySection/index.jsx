import PropTypes from 'prop-types';
import { Input } from '~/components/UI';
import ExperienceContainer from './components/ExperienceContainer';
import EducationContainer from './components/EducationContainer';

const SummarySection = ({
    name = 'summarySection',
    register,
    watch,
    control,
    errors = {},
    isLoading
}) => {
    return (
        <section className='mb-10'>
            <h3 className='text-xl font-bold uppercase mb-5'>
                Summary Section
            </h3>
            <div className='lg:w-1/2 mb-3'>
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
            <EducationContainer
                name={`${name}.education`}
                register={register}
                watch={watch}
                control={control}
                errors={errors.education}
                isLoading={isLoading}
            />
            <ExperienceContainer
                name={`${name}.experience`}
                register={register}
                control={control}
                errors={errors.experience}
                isLoading={isLoading}
            />
        </section>
    );
};

SummarySection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    errors: PropTypes.object,
    isLoading: PropTypes.bool
};

export default SummarySection;
