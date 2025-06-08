import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';

const ProfileSection = forwardRef(
   (
      {
         avatar,
         name,
         specialized,
         description,
         facebook,
         linkedIn,
         onInputChange,
         errors = {}
      },
      ref
   ) => {
      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-5'>Profile teacher</h3>
            <div className='flex lg:flex-row flex-col gap-10'>
               <div className='flex-1'>
                  <div className='flex md:flex-row flex-col gap-5 mb-5'>
                     <div className='flex-1'>
                        <Input
                           label='Tên giảng viên'
                           name='name'
                           value={name}
                           onChange={onInputChange}
                           error={errors?.name}
                        />
                     </div>
                     <div className='flex-1'>
                        <Input
                           label='Chuyên ngành'
                           name='specialized'
                           value={specialized}
                           onChange={onInputChange}
                           error={errors?.specialized}
                        />
                     </div>
                  </div>
                  <div>
                     <Textarea
                        label='Mô tả'
                        name='description'
                        value={description}
                        onChange={onInputChange}
                        error={errors?.description}
                        maxLength={380}
                     />
                  </div>
                  <div className='flex md:flex-row flex-col gap-5 mb-5'>
                     <div className='flex-1'>
                        <Input
                           label='Facebook'
                           name='facebook'
                           value={facebook}
                           onChange={onInputChange}
                           error={errors?.facebook}
                        />
                     </div>
                     <div className='flex-1'>
                        <Input
                           label='Linkedin'
                           name='linkedIn'
                           value={linkedIn}
                           onChange={onInputChange}
                           error={errors?.linkedIn}
                        />
                     </div>
                  </div>
               </div>
               <div className='flex-1'>
                  {errors?.avatar && (
                     <p className='text-red-500 text-sm text-medium text-center'>
                        {errors.avatar}
                     </p>
                  )}
                  <ImageSelector
                     src={avatar}
                     name='avatar'
                     className='size-80 mx-auto'
                     onChange={onInputChange}
                     error={!!errors?.avatar}
                  />
               </div>
            </div>
         </section>
      );
   }
);

ProfileSection.displayName = 'ProfileSection';
ProfileSection.propTypes = {
   avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
   name: PropTypes.string,
   specialized: PropTypes.string,
   description: PropTypes.string,
   facebook: PropTypes.string,
   linkedIn: PropTypes.string,
   onInputChange: PropTypes.func,
   errors: PropTypes.object
};

export default ProfileSection;
