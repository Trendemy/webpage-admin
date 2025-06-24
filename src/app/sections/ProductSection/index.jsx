import PropTypes from 'prop-types';
import ImagePreview from '~/components/ImagePreview';
import { Input } from '~/components/UI';
import { Controller } from 'react-hook-form';

const ProductSection = ({
    name = 'productSection',
    register,
    control,
    errors = {},
    isLoading
}) => {
    return (
        <section className='mb-5'>
            <h3 className='text-xl font-bold uppercase mb-2'>
                Product Section
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

ProductSection.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    errors: PropTypes.object,
    isLoading: PropTypes.bool
};
export default ProductSection;
