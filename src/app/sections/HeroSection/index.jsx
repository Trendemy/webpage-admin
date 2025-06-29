import PropTypes from 'prop-types';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';

const HeroSection = ({
    name = 'heroSection',
    register,
    watch,
    errors = {},
    isLoading
}) => {
    return (
        <section className='mb-10'>
            <h3 className='text-xl font-bold uppercase mb-5'>Hero Section</h3>
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
                            id={`${name}.highlightTitle`}
                            label='Nổi bật tiêu đề'
                            {...register(`${name}.highlightTitle`)}
                            error={errors?.highlightTitle?.message}
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
                <div className='flex-1 mt-2'>
                    <p className='text-sm text-center text-gray-600 mb-3'>
                        [Image Preview]
                    </p>
                    {errors?.images?.root?.message && (
                        <p className='text-sm text-red-500 text-center mb-5'>
                            {errors.images.root.message}
                        </p>
                    )}
                    <div className='relative w-1/2 mx-auto'>
                        <ImageSelector
                            value={watch(`${name}.images.${0}`)}
                            {...register(`${name}.images.${0}`)}
                            className='aspect-square'
                            error={!!errors?.images?.[0]}
                            disabled={isLoading}
                        />
                        <div className='absolute w-1/2 bottom-0 border-t-8 border-r-8 border-white'>
                            <ImageSelector
                                value={watch(`${name}.images.${1}`)}
                                {...register(`${name}.images.${1}`)}
                                className='aspect-square'
                                error={!!errors?.images?.[1]}
                                disabled={isLoading}
                            />
                        </div>
                        <div className='w-5/12 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2'>
                            <ImageSelector
                                value={watch(`${name}.images.${2}`)}
                                {...register(`${name}.images.${2}`)}
                                className='aspect-square rounded-full'
                                error={!!errors?.images?.[2]}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

HeroSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};
export default HeroSection;
