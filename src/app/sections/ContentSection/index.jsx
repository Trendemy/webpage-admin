import PropTypes from 'prop-types';
import { Input } from '~/components/UI';
import Chapter from '~/app/sections/ContentSection/components/Chapter';

const ContentSection = ({
    name = 'contentSection',
    register,
    control,
    errors = {},
    isLoading
}) => {
    return (
        <section className='mb-10'>
            <h3 className='text-xl font-bold uppercase mb-5'>
                Content Section
            </h3>
            <div className='flex lg:flex-row flex-col gap-10'>
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
                    <Chapter
                        name={`${name}.chapters`}
                        register={register}
                        control={control}
                        errors={errors?.chapters}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </section>
    );
};

ContentSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};
export default ContentSection;
