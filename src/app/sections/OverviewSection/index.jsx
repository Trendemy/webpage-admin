import PropTypes from 'prop-types';
import { Input, Textarea } from '~/components/UI';

const OverviewSection = ({
    name = 'overviewSection',
    register,
    errors = {},
    isLoading
}) => {
    return (
        <section className='mb-10'>
            <h3 className='text-xl font-bold uppercase mb-5'>
                Overview Section
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
                <div>
                    <Textarea
                        id={`${name}.description`}
                        label='Mô tả'
                        {...register(`${name}.description`)}
                        error={errors?.description?.message}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </section>
    );
};
OverviewSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object,
    isLoading: PropTypes.bool
};
export default OverviewSection;
