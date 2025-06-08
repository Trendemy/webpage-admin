import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import ImageSelector from '~/components/ImageSelector';
import { Input, Textarea } from '~/components/UI';
import { X } from '~/components/Icons';

const CoreSection = forwardRef(
   (
      { section = {}, onInputChange, onUpdateChildOfSection, errors = {} },
      ref
   ) => {
      const { sectionName } = useSectionName('coreSection');
      const { title = '', subtitle = '', content = [] } = section;

      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-3'>Core Section</h3>
            <div className='lg:max-w-xl border-b mb-3'>
               <div className='mb-5'>
                  <Input
                     label='Tiêu đề: '
                     name={sectionName('title')}
                     value={title}
                     onChange={onInputChange}
                     error={errors.title}
                  />
               </div>
               <div className='mb-5'>
                  <Input
                     label='Tiêu đề phụ: '
                     name={sectionName('subtitle')}
                     value={subtitle}
                     onChange={onInputChange}
                     error={errors.subtitle}
                  />
               </div>
            </div>
            <div className='text-center mb-5'>
               <button
                  className='text-sm font-medium uppercase bg-blue-600 hover:bg-blue-700 text-white rounded-full select-none px-3 py-2'
                  onClick={() =>
                     onUpdateChildOfSection(sectionName('content'), 'add', {
                        icon: '',
                        name: '',
                        description: ''
                     })
                  }
               >
                  Thêm
               </button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'>
               {content.map((item, index) => (
                  <div
                     key={index}
                     className='relative border rounded-lg pt-10 p-5'
                  >
                     <button
                        className='absolute size-7 top-0 right-0 bg-white text-rose-400 shadow-md rounded-full translate-x-1/2 -translate-y-1/2 p-1'
                        onClick={() =>
                           onUpdateChildOfSection(
                              sectionName('content', index),
                              'delete'
                           )
                        }
                     >
                        <X strokeWidth={1.5} />
                     </button>
                     <ImageSelector
                        src={item.icon}
                        name={sectionName('content', index, 'icon')}
                        className='size-24 rounded-full bg-primary p-5 mx-auto mb-5'
                        onChange={onInputChange}
                        error={!!errors.content?.[index]?.icon}
                     />
                     <div className='mb-3'>
                        <Input
                           label='Tên:'
                           name={sectionName('content', index, 'name')}
                           value={item.name}
                           onChange={onInputChange}
                           error={errors.content?.[index]?.name}
                        />
                     </div>
                     <div className='mb-3'>
                        <Textarea
                           label='Mô tả:'
                           name={sectionName('content', index, 'description')}
                           value={item.description}
                           onChange={onInputChange}
                           error={errors.content?.[index]?.description}
                           maxLength={380}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </section>
      );
   }
);

CoreSection.displayName = 'CoreSection';
CoreSection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      content: PropTypes.arrayOf(
         PropTypes.shape({
            icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
            name: PropTypes.string,
            description: PropTypes.string
         })
      )
   }),
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};
export default CoreSection;
