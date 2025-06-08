import Joi from 'joi';
import { validator } from '~/utils';
import {
   validateArray,
   validateBoolean,
   validateImage,
   validateImages,
   validateObject,
   validateSection,
   validateString,
   validateStringArray
} from '~/validators/common.validator';

export const schema = Joi.object({
   name: validateString('Tên khóa học'),
   slug: validateString('Slug', false),
   type: validateString('Thể Loại'),
   status: validateBoolean(false),

   heroSection: validateSection({
      title: validateString('Tiêu đề'),
      highlightTitle: validateString('', false),
      description: validateString('Mô tả', true, 380),
      images: validateImages('Danh sách hình', 3, 3)
   }),

   introduceSection: validateSection({
      title: validateString('Tiêu đề'),
      highlightTitle: validateString('', false),
      description: validateString('Mô tả', true, 380),
      images: validateImages('Danh sách hình', 2, 2)
   }),

   goalSection: validateSection({
      title: validateString('Tiêu đề'),
      subtitle: validateString('', false),
      content: validateStringArray(),
      images: validateImages('Danh sách hình', 2, 2)
   }),

   contentSection: validateSection({
      title: validateString('Tiêu đề'),
      subtitle: validateString('', false),
      chapters: validateArray(
         validateObject({
            title: validateString('Tiêu đề'),
            content: validateStringArray()
         })
      )
   }),

   valueSection: validateSection({
      title: validateString('Tiêu đề'),
      subtitle: validateString('', false),
      content: validateStringArray(),
      images: validateImages('Danh sách hình', 3, 3)
   }),

   joinSection: validateSection({
      title: validateString('Tiêu đề'),
      objects: validateArray(
         validateObject({
            image: validateImage(),
            name: validateString('Tên đối tượng'),
            description: validateString('Mô tả', true, 380)
         })
      ),
      images: validateImages('Danh sách hình', 2, 2)
   }),

   teacherSection: validateSection({
      title: validateString('Tiêu đề'),
      subtitle: validateString('', false),
      teachers: validateStringArray()
   }),

   feedbackSection: validateSection({
      title: validateString('Tiêu đề'),
      subtitle: validateString('', false),
      feedbacks: validateArray(
         validateObject({
            avatar: validateImage(),
            name: validateString('Tên'),
            role: validateString('Vai trò'),
            feedback: validateString('Mô tả', true, 380)
         })
      ),
      images: validateImages('Danh sách hình', 2, 2)
   }),

   graduationSection: validateSection({
      title: validateString('Tiêu đề'),
      subtitle: validateString('', false),
      images: validateImages('Danh sách hình', 6, 6)
   }),

   productSection: validateSection({
      title: validateString('Tiêu đề'),
      subtitle: validateString('', false),
      images: validateImages('Danh sách hình', 6, 6)
   })
});

const validateCourse = (form) => {
   return validator(schema, form);
};

export default validateCourse;
