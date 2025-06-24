import Service from '~/services/Service';
import { logger } from '~/utils';

class TeacherService extends Service {
    constructor() {
        super('teachers');
    }

    /**
     * Creates or updates a course in the Firestore database.
     * @param {string|null} id - The ID (if updating).
     * @param {Object} data - The data to be validated and saved.
     * @returns {Promise<{ isValid: boolean, errors?: Object }>} Validation result and errors (if any).
     * @throws {Error} If Firestore operation fails.
     */
    async createOrUpdate(id, data) {
        try {
            if (id) {
                await super.update(id, data);
            } else {
                data.slug = await super.createUniqueSlug(data.name, id);
                await super.create(data);
            }
        } catch (error) {
            logger('error createOrUpdate teacher', error);
            throw error;
        }
    }
}
export default new TeacherService();
