import Service from '~/services/Service';
import { validateTeacher } from '~/validators';
import { logger, slug } from '~/utils';

class TeacherService extends Service {
   constructor() {
      super('teachers');
   }

   /**
    * Creates or updates a course in the Firestore database.
    * @param {string|null} id - The ID (if updating).
    * @param {Object} form - The data to be validated and saved.
    * @returns {Promise<{ isValid: boolean, errors?: Object }>} Validation result and errors (if any).
    * @throws {Error} If Firestore operation fails.
    */
   async createOrUpdate(id, form) {
      try {
         const { isValid, errors, data } = validateTeacher(form);

         if (!isValid) {
            return { isValid, errors };
         }

         const teacher = id ? await super.getById(id) : null;
         if (!teacher || teacher.name !== data.name) {
            let baseSlug = slug(data.name);
            const existingSlug = await super.getOne({ slug: baseSlug });

            if (existingSlug && (!id || existingSlug.id !== id)) {
               data.slug = slug(data.name, true);
            } else {
               data.slug = baseSlug;
            }
         }

         if (id) {
            await super.update(id, data);
         } else {
            await super.create(data);
         }
         return { isValid };
      } catch (error) {
         logger('error createOrUpdate teacher', error);
         throw error;
      }
   }
}
export default new TeacherService();
