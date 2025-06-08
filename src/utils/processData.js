import uploadToCloudinary from './uploadToCloudinary';

/**
 * Recursively processes an object, uploading any `File` instances to Cloudinary.
 * If a property contains a `File`, it uploads the file and replaces it with the URL.
 * It also handles nested objects.
 *
 * @param {Object} data - The input object that may contain files.
 * @returns {Promise<Object>} A new object with files replaced by their uploaded URLs.
 *
 * @example
 * const inputData = {
 *   name: "Product A",
 *   image: { file: new File(["content"], "image.jpg", { type: "image/jpeg" }) }
 * };
 * const result = await processData(inputData);
 * console.log(result);
 * // { name: "Product A", image: "https://cloudinary.com/uploaded-image-url" }
 */
const processData = async (data) => {
	const processItem = async (item) => {
		if (item && item.file && item.file instanceof File) {
			item = await uploadToCloudinary(item.file);
		}
		for (let key in item) {
			if (item[key] && typeof item[key] === 'object') {
				item[key] = await processItem(item[key]);
			}
		}
		return item;
	};

	return processItem(data);
};

export default processData;
