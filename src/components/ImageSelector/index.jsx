import PropTypes from 'prop-types';
import { AdvancedImage } from '@cloudinary/react';
import cloudinary from '~/config/cloudinary';
import { cn } from '~/utils';

const ImageSelector = ({
   name,
   src,
   alt = 'image',
   width,
   height,
   className,
   imgClass,
   error,
   loading = 'lazy',
   onChange
}) => {
   return (
      <div
         className={cn(
            'relative group/item flex justify-center items-center text-center border border-dashed border-gray-300',
            { 'border-red-500': error && !src },
            className,
            'overflow-hidden'
         )}
      >
         {src ? (
            <>
               {src?.url ? (
                  <img
                     src={src.url}
                     alt={alt}
                     width={width}
                     height={height}
                     className={cn('size-full object-cover', imgClass)}
                     loading={loading}
                  />
               ) : (
                  <AdvancedImage
                     cldImg={cloudinary.image(src)}
                     className={cn('size-full object-cover', imgClass)}
                     loading={loading}
                     alt={alt}
                  />
               )}
               <div className='absolute invisible group-hover/item:visible size-full flex justify-center items-center bg-black/25'>
                  <span className='text-sm text-white font-medium uppercase'>
                     Thay đổi
                  </span>
               </div>
            </>
         ) : (
            <span className='text-sm font-medium uppercase text-gray-600'>
               Chọn ảnh
            </span>
         )}
         <label className='absolute size-full top-0 left-0 block bg-transparent cursor-pointer'>
            <input
               type='file'
               name={name}
               accept='image/*'
               hidden
               onChange={onChange}
            />
         </label>
      </div>
   );
};

ImageSelector.propTypes = {
   name: PropTypes.string,
   src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
         file: PropTypes.object,
         url: PropTypes.string
      })
   ]),
   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   alt: PropTypes.string,
   className: PropTypes.string,
   imgClass: PropTypes.string,
   error: PropTypes.bool,
   onChange: PropTypes.func,
   loading: PropTypes.string
};
export default ImageSelector;
