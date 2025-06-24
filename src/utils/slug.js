import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a URL-friendly slug from a given text.
 * Optionally appends a unique identifier (UUID).
 *
 * @param {string} text - The text to be converted into a slug.
 * @param {boolean} [uuid=false] - Whether to append a unique identifier.
 * @returns {string} The generated slug.
 *
 * @example
 * slug("Hello World");
 * // Output: "hello-world"
 *
 * slug("Hello World", true);
 * // Output: "hello-world-abc123" (random UUID suffix)
 */
const slug = (text, withUuid) =>
    slugify(withUuid ? text + '-' + uuidv4().slice(0, 6) : text, {
        lower: true,
        strict: true
    });

export default slug;
