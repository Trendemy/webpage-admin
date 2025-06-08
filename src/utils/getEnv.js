/**
 * Retrieves an environment variable from import.meta.env (for Vite projects).
 * @param {string} key - The name of the environment variable.
 * @param {string} fallback - A default value to return if the variable is not found.
 * @returns {string} The value of the environment variable or the fallback value.
 *
 * @example
 * const apiUrl = getEnv('VITE_API_URL', 'https://default-api.com');
 * console.log(apiUrl); // 'https://default-api.com' if VITE_API_URL is not defined
 */
const getEnv = (key, fallback = '') => import.meta.env[key] || fallback;

export default getEnv;
