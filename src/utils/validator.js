import logger from './logger';

/**
 * Formats Joi validation errors into a structured object.
 *
 * @param {Object} error - The validation error object from Joi.
 * @param {Array} error.details - List of validation error details.
 * @returns {Object} A structured error object where each key corresponds to the invalid field.
 *
 * @example
 * const error = {
 *   details: [{ path: ['email'], message: 'Email is required' }]
 * };
 * formatError(error);
 * // Output: { email: 'Email is required' }
 */
const formatError = (error) =>
	error.details.reduce((errors, { path, message }) => {
		path.reduce(
			(current, key, i) =>
				i === path.length - 1
					? (current[key] = message)
					: (current[key] = current[key] || {}),
			errors
		);
		return errors;
	}, {});

/**
 * Validates a form object against a Joi schema.
 *
 * @param {Object} schema - The Joi validation schema.
 * @param {Object|string} form - The data object to validate (can be JSON string).
 * @returns {Object} An object containing `isValid` (boolean), `data` (validated data), or `errors` (if invalid).
 *
 * @example
 * import Joi from 'joi';
 * const schema = Joi.object({ email: Joi.string().email().required() });
 * const result = validator(schema, { email: '' });
 * // Output: { isValid: false, errors: { email: 'Email is required' } }
 */
const validator = (schema, form) => {
	try {
		if (!schema || typeof schema.validate !== 'function') {
			return { isValid: false };
		}
		if (!form) {
			return { isValid: false };
		}
		const parsedForm = typeof form === 'string' ? JSON.parse(form) : form;
		const { error, value: data } = schema.validate(parsedForm, {
			abortEarly: false,
			stripUnknown: true
		});

		if (error) {
			const errors = formatError(error);
			return { isValid: false, errors };
		}

		return { isValid: true, data };
	} catch (error) {
		logger('validator', error);
		return { isValid: false };
	}
};

export default validator;
