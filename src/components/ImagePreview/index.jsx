import PropTypes from 'prop-types';
import { AdvancedImage } from '@cloudinary/react';
import cloudinary from '~/config/cloudinary';
import { cn } from '~/utils';
import { Plus } from '~/components/Icons';

const ImagePreview = ({
   title = '[Image Preview]',
   images,
   max,
   error,
   onInputChange,
   className,
   sectionName
}) => {
   return (
      <div className='relative flex-1 pb-5'>
         <p className='text-sm text-center text-gray-600 mb-3'>{title}</p>
         {error && (
            <p className='text-sm text-red-500 text-center mb-3'>{error}</p>
         )}
         <div className='flex flex-wrap gap-3'>
            {Array.isArray(images) &&
               images.map((image, index) => (
                  <div
                     key={index}
                     className={cn(
                        'relative flex w-40 h-fit group/item rounded overflow-hidden',
                        className
                     )}
                  >
                     {image?.url ? (
                        <img
                           src={image.url || image}
                           className='w-full h-full object-cover'
                           alt={`images preview ${index + 1}`}
                        />
                     ) : (
                        <AdvancedImage
                           cldImg={cloudinary.image(image)}
                           className='object-cover'
                           alt={`images preview ${index + 1}`}
                        />
                     )}
                     <label className='absolute invisible group-hover/item:visible size-full top-0 left-0 bg-black/25 flex justify-center items-center text-white text-xs font-medium uppercase cursor-pointer'>
                        Thay đổi
                        <input
                           type='file'
                           name={`${sectionName}.images.${index}`}
                           accept='image/*'
                           hidden
                           onChange={onInputChange}
                        />
                     </label>
                  </div>
               ))}
            {(!max || images.length < max) && (
               <>
                  <label className='h-fit w-fit text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 cursor-pointer p-1.5'>
                     <Plus className='size-3.5' strokeWidth={2} />
                     <input
                        type='file'
                        accept='image/*'
                        data-max={max}
                        name={`${sectionName}.images`}
                        multiple
                        hidden
                        onChange={onInputChange}
                     />
                  </label>
               </>
            )}
            <div className='absolute right-0 bottom-0'>
               <span className='text-sm text-gray-500'>
                  [{max ? images.length + '/' + max : images.length}]
               </span>
            </div>
         </div>
      </div>
   );
};

ImagePreview.propTypes = {
   title: PropTypes.string,
   className: PropTypes.string,
   sectionName: PropTypes.string.isRequired,
   max: PropTypes.number,
   error: PropTypes.string,
   images: PropTypes.arrayOf(
      PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.shape({
            file: PropTypes.object,
            url: PropTypes.string
         })
      ])
   ).isRequired,
   onInputChange: PropTypes.func
};
export default ImagePreview;
