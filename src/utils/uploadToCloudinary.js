import axios from 'axios';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from '~/config/env';
import logger from '~/utils/logger';

/**
 * Uploads a file to Cloudinary and returns its public ID.
 *
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<string>} The public ID of the uploaded file.
 * @throws {Error} Throws an error if the upload fails.
 *
 * @example
 * const file = new File(["content"], "image.jpg", { type: "image/jpeg" });
 * uploadToCloudinary(file)
 *   .then((publicId) => console.log(publicId))
 *   .catch((error) => console.error(error));
 */
const uploadToCloudinary = async (file) => {
   const formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

   try {
      const { data } = await axios.post(CLOUDINARY_URL, formData);
      return data.public_id;
   } catch (error) {
      logger('uploadToCloudinary', error);
      throw error;
   }
};

export default uploadToCloudinary;
