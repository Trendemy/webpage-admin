import PropTypes from 'prop-types';
import EducationBox from '../EducationBox';

const EducationContainer = ({
    name,
    register,
    watch,
    control,
    errors,
    isLoading
}) => {
    return (
        <div className='border-t mt-10'>
            <h3 className='text-xl font-bold uppercase text-center mt-10'>
                Học vấn
            </h3>
            <div className='h-20 flex justify-between bg-[#F7F2F2] shadow-[0px_0px_4px_0px_#26262626_inset,_0px_0px_8px_0px_#26262640_inset] rounded-[35px] my-60'>
                {[...Array(5)].map((_, index, arr) => {
                    const props = {};
                    const rounded = '25';

                    if (index === 0) props.roundedStart = rounded;
                    if (index === arr.length - 1) props.roundedEnd = rounded;

                    props.type = index % 2 === 0 ? 'primary' : 'secondary';
                    props.position = index % 2 === 0 ? 'top' : 'bottom';

                    return (
                        <EducationBox
                            key={index}
                            name={`${name}[${index}]`}
                            watch={watch}
                            control={control}
                            register={register}
                            errors={errors?.[index]}
                            isLoading={isLoading}
                            {...props}
                        />
                    );
                })}
            </div>
        </div>
    );
};

EducationContainer.propTypes = {
    name: PropTypes.string,
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    control: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    errors: PropTypes.array
};

export default EducationContainer;
