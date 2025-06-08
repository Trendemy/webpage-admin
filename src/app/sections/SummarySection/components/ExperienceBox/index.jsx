import PropTypes from 'prop-types';
import ImagePreview from '~/components/ImagePreview';
import { Input } from '~/components/UI';

const ExperienceBox = ({
   title,
   images,
   sectionName,
   onInputChange,
   onUpdateChildOfSection,
   errors
}) => {
   return (
      <div className='border rounded-md p-2'>
         <div className='p-5'>
            <Input
               placeholder='Tiêu đề'
               name={`${sectionName}.title`}
               value={title}
               onChange={onInputChange}
               className='text-xl font-semibold text-center border-none bg-transparent focus:bg-transparent'
               error={errors?.title}
            />
            <div className='border-t border-dashed border-slate-400 my-3'></div>
            <div className='flex justify-center'>
               <ImagePreview
                  title=''
                  sectionName={`${sectionName}`}
                  images={images}
                  max={5}
                  onInputChange={onInputChange}
                  className='!h-12 !w-fit'
                  error={errors?.images}
               />
            </div>
         </div>
         <div className='flex justify-around items-center'>
            <button
               className='text-xs font-medium uppercase text-rose-600 hover:text-rose-500'
               onClick={() => onUpdateChildOfSection(sectionName, 'delete')}
            >
               Xóa mục này
            </button>
         </div>
      </div>
   );
};

ExperienceBox.propTypes = {
   title: PropTypes.string,
   images: PropTypes.array,
   sectionName: PropTypes.string,
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};
export default ExperienceBox;
