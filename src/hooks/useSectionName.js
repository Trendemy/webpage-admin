import { useCallback } from 'react';

/**
 * Custom hook to generate section names dynamically.
 *
 * @param {string} name - The base section name.
 * @returns {object} - An object containing the `sectionName` function.
 *
 * @example
 * const { sectionName } = useSectionName('user');
 * console.log(sectionName('profile', 'email')); // Output: "user.profile.email"
 * console.log(sectionName(0, 'name')); // Output: "user[0].name"
 */
const useSectionName = (name) => {
	/**
	 * Generates a section name based on the provided fields.
	 *
	 * @param {...(string|number)} fields - Additional fields to append to the section name.
	 * @returns {string} - The full section name.
	 */
	const sectionName = useCallback(
		(...fields) => {
			if (fields.length === 0) return name;
			return (
				name +
				fields
					.map((field) =>
						typeof field === 'number' ? `[${field}]` : `.${field}`
					)
					.join('')
			);
		},
		[name]
	);

	return { sectionName };
};

export default useSectionName;
