import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSectionName } from '~/hooks';
import { Input } from '~/components/UI';
import { X } from '~/components/Icons';

const ContentSection = forwardRef(
   (
      { section = {}, onInputChange, onUpdateChildOfSection, errors = {} },
      ref
   ) => {
      const { sectionName } = useSectionName('contentSection');
      const { title = '', subtitle = '', chapters = [] } = section;
      return (
         <section className='mb-10' ref={ref}>
            <h3 className='text-xl font-semibold mb-5'>Content Section</h3>
            <div className='flex lg:flex-row flex-col gap-10'>
               <div className='lg:w-1/2'>
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
                  <div>
                     <div className='flex justify-between mb-5'>
                        <h5 className='text-sm font-medium'>
                           Danh sách chương:
                        </h5>
                        <span
                           className='text-sm select-none cursor-pointer'
                           onClick={() =>
                              onUpdateChildOfSection(
                                 sectionName('chapters'),
                                 'add',
                                 {
                                    title: '',
                                    content: []
                                 }
                              )
                           }
                        >
                           Thêm
                        </span>
                     </div>
                     {chapters &&
                        chapters.map((chapter, chapterIndex) => (
                           <div key={chapterIndex} className='mb-5'>
                              <div className='group/item relative'>
                                 <Input
                                    label={`Chương ${chapterIndex + 1}`}
                                    name={sectionName(
                                       'chapters',
                                       chapterIndex,
                                       'title'
                                    )}
                                    value={chapter.title}
                                    onChange={onInputChange}
                                    error={
                                       errors.chapters?.[chapterIndex]?.title
                                    }
                                 />
                                 <div className='absolute invisible group-hover/item:visible top-1/2 right-0 bg-transparent translate-x-full pl-2'>
                                    <button
                                       className='h-fit w-fit text-rose-500 bg-transparent rounded-full border border-rose-300 focus:outline-none cursor-pointer p-1.5'
                                       onClick={() =>
                                          onUpdateChildOfSection(
                                             sectionName(
                                                'chapters',
                                                chapterIndex
                                             ),
                                             'delete'
                                          )
                                       }
                                    >
                                       <X
                                          className='size-3.5'
                                          strokeWidth={1.5}
                                       />
                                    </button>
                                 </div>
                              </div>
                              <div className='p-3'>
                                 <div className='flex justify-between mb-3'>
                                    <p className='text-sm font-medium'>
                                       Nội dung
                                    </p>
                                    <span
                                       className='text-sm select-none cursor-pointer'
                                       onClick={() =>
                                          onUpdateChildOfSection(
                                             sectionName(
                                                'chapters',
                                                chapterIndex,
                                                'content'
                                             ),
                                             'add'
                                          )
                                       }
                                    >
                                       Thêm
                                    </span>
                                 </div>
                                 {chapter.content &&
                                    chapter.content.map(
                                       (content, contentIndex) => (
                                          <div
                                             key={contentIndex}
                                             className='group/item relative mb-3'
                                          >
                                             <Input
                                                name={sectionName(
                                                   'chapters',
                                                   chapterIndex,
                                                   'content',
                                                   contentIndex
                                                )}
                                                value={content}
                                                onChange={onInputChange}
                                                error={
                                                   errors.chapters?.[
                                                      chapterIndex
                                                   ]?.content?.[contentIndex]
                                                }
                                             />
                                             <div className='absolute invisible group-hover/item:visible top-1/2 right-0 bg-transparent translate-x-full -translate-y-1/2 pl-2'>
                                                <button
                                                   className='h-fit w-fit text-rose-500 bg-transparent rounded-full border border-rose-300 focus:outline-none cursor-pointer p-1.5'
                                                   onClick={() =>
                                                      onUpdateChildOfSection(
                                                         sectionName(
                                                            'chapters',
                                                            chapterIndex,
                                                            'content',
                                                            contentIndex
                                                         ),
                                                         'delete'
                                                      )
                                                   }
                                                >
                                                   <X
                                                      className='size-3.5'
                                                      strokeWidth={1.5}
                                                   />
                                                </button>
                                             </div>
                                          </div>
                                       )
                                    )}
                              </div>
                              {chapters.length !== chapterIndex + 1 && <hr />}
                           </div>
                        ))}
                  </div>
               </div>
            </div>
         </section>
      );
   }
);

ContentSection.displayName = 'ContentSection';
ContentSection.propTypes = {
   section: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      chapters: PropTypes.arrayOf(
         PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.arrayOf(PropTypes.string)
         })
      )
   }),
   onInputChange: PropTypes.func,
   onUpdateChildOfSection: PropTypes.func,
   errors: PropTypes.object
};
export default ContentSection;
