import Joi from 'joi';
import { validator } from '~/utils';
import {
   validateArray,
   validateBoolean,
   validateEnum,
   validateImage,
   validateImages,
   validateNumber,
   validateObject,
   validateSection,
   validateString
} from '~/validators/common.validator';

export const schema = Joi.object({
   avatar: validateImage(),
   name: validateString('Tên giảng viên'),
   slug: validateString('Slug', false),
   specialized: validateString('Chuyên ngành'),
   description: validateString('Mô tả', true, 380),
   facebook: validateString('Facebook'),
   linkedIn: validateString('LinkedIn'),
   status: validateBoolean(false),

   countSection: validateArray(
      validateObject({
         name: validateString('Tên Counter'),
         number: validateNumber('Giá trị', true, 0),
         max: validateNumber('Giá trị lớn nhất', false, 0)
      })
   ),

   overviewSection: validateSection({
      title: validateString('Tiêu đề'),
      description: validateString('Mô tả', true, 380)
   }),

   summarySection: validateSection({
      title: validateString('Tiêu đề'),
      subtitle: validateString('', false),
      education: validateArray(
         validateObject({
            icon: validateEnum(
               ['CERTIFICATE', 'ARTICLE', 'EDUCATION', 'PROJECT'],
               'Icon'
            ),
            year: validateString('Năm'),
            title: validateString('Tiêu đề'),
            details: validateString('Chi tiết')
         }),
         'Danh sách roadmap',
         5,
         5
      ),
      experience: validateArray(
         validateObject({
            title: validateString('Tiêu đề'),
            images: validateImages('Danh sách hình', 1, 5)
         })
      )
   }),

   coreSection: validateSection({
      title: validateString('Tiêu đề'),
      subtitle: validateString('', false),
      content: validateArray(
         validateObject({
            icon: validateImage(),
            name: validateString('Tên'),
            description: validateString('Mô tả', true, 380)
         })
      )
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
      )
   })
});

const validateTeacher = (form) => {
   return validator(schema, form);
};

export default validateTeacher;
