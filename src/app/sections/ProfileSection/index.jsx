import PropTypes from 'prop-types';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';

const ProfileSection = ({ register, watch, errors = {}, isLoading }) => {
    return (
        <section className='mb-10'>
            <h3 className='text-xl font-bold uppercase mb-5'>
                Profile teacher
            </h3>
            <div className='flex lg:flex-row flex-col gap-10'>
                <div className='flex-1'>
                    <div className='flex md:flex-row flex-col gap-5 mb-5'>
                        <div className='flex-1'>
                            <Input
                                id='teacher-name'
                                label='Tên giảng viên'
                                {...register('name')}
                                disabled={isLoading}
                                error={errors?.name?.message}
                            />
                        </div>
                        <div className='flex-1'>
                            <Input
                                id='teacher-specialized'
                                label='Chuyên ngành'
                                {...register('specialized')}
                                disabled={isLoading}
                                error={errors?.specialized?.message}
                            />
                        </div>
                    </div>
                    <div>
                        <Textarea
                            id='teacher-description'
                            label='Mô tả'
                            {...register('description')}
                            disabled={isLoading}
                            error={errors?.description?.message}
                        />
                    </div>
                </div>
                <div className='flex-1'>
                    {errors?.avatar?.message && (
                        <p className='text-red-500 text-sm text-medium text-center'>
                            {errors.avatar.message}
                        </p>
                    )}
                    <ImageSelector
                        {...register('avatar')}
                        value={watch('avatar')}
                        className='size-80 mx-auto'
                        disabled={isLoading}
                        error={!!errors?.avatar?.message}
                    />
                </div>
            </div>
        </section>
    );
};
ProfileSection.propTypes = {
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    errors: PropTypes.object,
    isLoading: PropTypes.bool
};

export default ProfileSection;
