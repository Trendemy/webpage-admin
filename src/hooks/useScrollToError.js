import { useRef, useMemo } from 'react';

/**
 * Custom hook for scrolling to the section of the first validation error.
 *
 * @param {Object} errorMapping - An object mapping field names to section names.
 * @param {Object} options - Options for scroll behavior.
 * @param {number} [options.offset=80] - Offset to adjust the scroll position.
 * @param {string} [options.behavior='smooth'] - Scroll behavior (e.g., 'smooth', 'auto').
 * @returns {Object} - An object containing section refs and the `scrollToError` function.
 *
 * @example
 * const errorMapping = {
 *   name: 'basicInfo',
 *   email: 'basicInfo',
 *   address: 'contactInfo'
 * };
 *
 * const { refs, scrollToError } = useScrollToError(errorMapping);
 *
 * // Usage in a component:
 * <section ref={refs.basicInfo}>Basic Info Section</section>
 * <section ref={refs.contactInfo}>Contact Info Section</section>
 */
const useScrollToError = (errorMapping, options = {}) => {
	const { offset = 80, behavior = 'smooth' } = options;

	// Create a unique set of section names from the error mapping
	const sections = useMemo(
		() => [...new Set(Object.values(errorMapping))],
		[errorMapping]
	);

	// Store references for each section
	const refs = useRef({});
	useMemo(() => {
		sections.forEach((section) => {
			if (!refs.current[section]) {
				refs.current[section] = { current: null };
			}
		});
	}, [sections]);

	/**
	 * Scrolls to the section of the first validation error.
	 *
	 * @param {Object} errors - An object containing form validation errors.
	 */
	const scrollToError = (errors) => {
		if (!errors) return;

		// Find the first field with an error
		const firstErrorField = Object.keys(errors).find((field) => errors[field]);
		if (!firstErrorField) return;

		// Get the corresponding section key
		const sectionKey = errorMapping[firstErrorField];
		const targetRef = refs.current[sectionKey];

		if (!targetRef?.current) return;

		// Calculate the scroll position
		const elementPosition = targetRef.current.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY - offset;

		// Scroll to the section
		window.scrollTo({
			top: offsetPosition,
			behavior
		});
	};

	return {
		refs: refs.current,
		scrollToError
	};
};

export default useScrollToError;
