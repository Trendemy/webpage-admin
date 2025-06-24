import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    getDoc,
    getFirestore,
    query,
    where
} from 'firebase/firestore';
import { logger, processData, slug } from '~/utils';

class Service {
    /**
     * Initializes the Service with a Firestore collection.
     * @param {string} collection - The name of the Firestore collection.
     */
    constructor(collection) {
        this.collection = collection;
        this.db = getFirestore();
    }

    /**
     * Retrieves all documents from the Firestore collection.
     * @returns {Promise<Array<Object>>} An array of document data with IDs.
     * @throws {Error} If Firestore operation fails.
     */
    async get() {
        try {
            const querySnapshot = await getDocs(
                collection(this.db, this.collection)
            );
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            return data;
        } catch (error) {
            logger('get', error);
            throw error;
        }
    }

    /**
     * Retrieves a single document based on a query parameter.
     * @param {Object} params - Query parameters (e.g., `{ field: value }`).
     * @returns {Promise<Object|null>} The document data or null if not found.
     * @throws {Error} If Firestore operation fails.
     */
    async getOne(params) {
        try {
            const clt = collection(this.db, this.collection);

            const field = Object.keys(params)[0];
            const value = params[field];
            const q = query(clt, where(field, '==', value));

            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) return null;

            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            logger('getOne', error);
            throw error;
        }
    }

    /**
     * Retrieves a document by its ID.
     * @param {string} id - The document ID.
     * @returns {Promise<Object|null>} The document data or null if not found.
     * @throws {Error} If Firestore operation fails.
     */
    async getById(id) {
        try {
            const ref = doc(this.db, this.collection, id);
            const docSnap = await getDoc(ref);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return null;
            }
        } catch (error) {
            logger('getById', error);
            throw error;
        }
    }

    /**
     * Checks if a document with the given parameter exists.
     * @param {Object} params - Query parameters (e.g., `{ field: value }`).
     * @returns {Promise<boolean>} True if the document exists, otherwise false.
     * @throws {Error} If Firestore operation fails.
     */
    async exists(params) {
        try {
            const clt = collection(this.db, this.collection);

            const field = Object.keys(params)[0];
            const value = params[field];
            const q = query(clt, where(field, '==', value));

            const querySnapshot = await getDocs(q);
            return !querySnapshot.empty;
        } catch (error) {
            logger('exists', error);
            throw error;
        }
    }

    /**
     * Creates a new document in the Firestore collection.
     * @param {Object} form - The data to be added.
     * @returns {Promise<boolean>} True if the operation is successful.
     * @throws {Error} If Firestore operation fails.
     */
    async create(form) {
        try {
            const data = await processData(form);
            await addDoc(collection(this.db, this.collection), data);
            return true;
        } catch (error) {
            logger('create', error);
            throw error;
        }
    }

    /**
     * Updates an existing document in the Firestore collection.
     * @param {string} id - The document ID.
     * @param {Object} form - The updated data.
     * @returns {Promise<boolean>} True if the operation is successful.
     * @throws {Error} If Firestore operation fails.
     */
    async update(id, form) {
        try {
            const data = await processData(form);
            const docRef = doc(this.db, this.collection, id);
            await updateDoc(docRef, data);
            return true;
        } catch (error) {
            logger('update', error);
            throw error;
        }
    }

    /**
     * Updates the `status` field of a document in the Firestore collection.
     * @param {string} id - The document ID.
     * @param {string} status - The new status.
     * @returns {Promise<boolean>} True if the operation is successful.
     * @throws {Error} If Firestore operation fails.
     */
    async updateStatus(id, status) {
        try {
            const docRef = doc(this.db, this.collection, id);
            await updateDoc(docRef, { status });
            return true;
        } catch (error) {
            logger('updateStatus', error);
            throw error;
        }
    }

    /**
     * Deletes a document from the Firestore collection.
     * @param {string} id - The document ID.
     * @returns {Promise<boolean>} True if the operation is successful.
     * @throws {Error} If Firestore operation fails.
     */
    async delete(id) {
        try {
            const docRef = doc(this.db, this.collection, id);
            await deleteDoc(docRef);
            return true;
        } catch (error) {
            logger('delete', error);
            throw error;
        }
    }

    async createUniqueSlug(name, excludeId = null, attempt = 0) {
        try {
            let candidateSlug;
            if (attempt === 0) {
                candidateSlug = slug(name);
            } else {
                candidateSlug = slug(name, true);
            }
            const existing = await this.getOne({ slug: candidateSlug });
            if (!existing || (excludeId && existing.id === excludeId)) {
                return candidateSlug;
            }
            return await this.createUniqueSlug(name, excludeId, attempt + 1);
        } catch (error) {
            logger('createUniqueSlug error:', error);
            throw error;
        }
    }
}

export default Service;
