import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import { Input } from '~/components/UI';
import { X } from '~/components/Icons';

const CountSection = forwardRef(
   (
      { section = {}, onInputChange, onUpdateChildOfSection, errors = {} },
      ref
   ) => {
      const { sectionName } = useSectionName('countSection');
      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-5'>Counter Section</h3>
            <div>
               <span
                  className='text-sm select-none cursor-pointer'
                  onClick={() =>
                     onUpdateChildOfSection(sectionName(), 'add', {
                        name: '',
                        number: 0,
                        max: 0
                     })
                  }
               >
                  Thêm
               </span>
               {section?.map((item, index) => (
                  <div
                     key={index}
                     className='relative group/item w-fit flex border-t py-5 gap-5'
                  >
                     <div className='absolute right-0 bottom-0 invisible group-hover/item:visible translate-x-full -translate-y-full pl-3'>
                        <button
                           className='h-fit w-fit text-rose-500 bg-transparent rounded-full border border-rose-300 focus:outline-none cursor-pointer p-1.5'
                           onClick={() =>
                              onUpdateChildOfSection(
                                 sectionName(index),
                                 'delete'
                              )
                           }
                        >
                           <X className='size-3.5' strokeWidth={1.5} />
                        </button>
                     </div>
                     <div>
                        <Input
                           label='Tên'
                           name={sectionName(index, 'name')}
                           value={item?.name}
                           onChange={onInputChange}
                           error={errors?.[index]?.name}
                        />
                     </div>
                     <div>
                        <Input
                           label='Giá trị'
                           name={sectionName(index, 'number')}
                           type='number'
                           value={item?.number}
                           onChange={onInputChange}
                           error={errors?.[index]?.number}
                        />
                     </div>

                     <div>
                        <Input
                           label='Giá trị lớn nhất'
                           name={sectionName(index, 'max')}
                           type='number'
                           value={item?.max}
                           onChange={onInputChange}
                           error={errors?.[index]?.max}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </section>
      );
   }
);

CountSection.displayName = 'CountSection';
CountSection.propTypes = {
   section: PropTypes.arrayOf(
      PropTypes.shape({
         name: PropTypes.string,
         number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
         max: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
   ),
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};
export default CountSection;
