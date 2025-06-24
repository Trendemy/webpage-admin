import PropTypes from 'prop-types';
import ImageSelector from '~/components/ImageSelector';
import { Textarea, Input } from '~/components/UI';

const IntroduceSection = ({
    name = 'introduceSection',
    register,
    watch,
    errors = {},
    isLoading
}) => {
    return (
        <section className='mb-40'>
            <h3 className='text-xl font-bold uppercase mb-2'>
                Introduce Section
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
                <div className='flex-1'>
                    {errors?.images?.root?.message && (
                        <p className='text-sm text-red-500 text-center mb-5'>
                            {errors.images.root.message}
                        </p>
                    )}
                    <div className='w-4/5 relative mx-auto'>
                        <div className='w-3/5'>
                            <ImageSelector
                                value={watch(`${name}.images.${0}`)}
                                {...register(`${name}.images.${0}`)}
                                className='rounded-3xl aspect-[1/1.5]'
                                error={!!errors?.images?.[0]}
                                disabled={isLoading}
                            />
                        </div>
                        <div className='w-3/5 absolute top-0 right-0 translate-y-28'>
                            <ImageSelector
                                value={watch(`${name}.images.${1}`)}
                                {...register(`${name}.images.${1}`)}
                                className='rounded-3xl aspect-[1/1.5]'
                                error={!!errors?.images?.[1]}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

IntroduceSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.object
};
export default IntroduceSection;
