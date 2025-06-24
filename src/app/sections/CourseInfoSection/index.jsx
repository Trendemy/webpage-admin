import PropTypes from 'prop-types';

import { Input } from '~/components/UI';

const CourseInfoSection = ({
    register,

    errors = {},
    isLoading
}) => {
    return (
        <section className='mb-10'>
            <div className='flex md:flex-row flex-col gap-10'>
                <div className='flex-1'>
                    <Input
                        id='course-name'
                        label='Tên khóa học '
                        {...register('name')}
                        error={errors?.name?.message}
                        disabled={isLoading}
                    />
                </div>
                <div className='flex-1'>
                    <Input
                        id='course-type'
                        label='Thể loại'
                        {...register('type')}
                        error={errors?.type?.message}
                        disabled={isLoading}
                    />
                </div>
            </div>
        </section>
    );
};

CourseInfoSection.propTypes = {
    register: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};
export default CourseInfoSection;
