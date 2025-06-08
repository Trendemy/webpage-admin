import { useState } from 'react';

/**
 * Custom hook to manage form state and handle input changes, including nested structures.
 *
 * @param {Object} initialState - Initial state of the form.
 * @returns {Object} - State, errors, and handlers for input changes and array operations.
 *
 * @example
 * const { state, handleInputChange, updateChildOfSection } = useHandleInputChange();
 *
 * <input name="user.name" value={state.user?.name || ''} onChange={handleInputChange} />
 */

const getPathArray = (path) => path.split('.');

const parseArrayKey = (key) => {
	const match = key.match(/(\w+)\[(\d+)\]/);
	return match ? { key: match[1], index: parseInt(match[2], 10) } : { key };
};

const traversePath = (obj, path, createMissing = false) => {
	return path.reduce((current, key) => {
		const { key: arrayKey, index } = parseArrayKey(key);

		if (typeof index === 'number') {
			if (createMissing) {
				current[arrayKey] = current[arrayKey] || [];
				current[arrayKey][index] = current[arrayKey][index] || {};
			}
			return current[arrayKey]?.[index];
		}

		if (createMissing) {
			current[key] = current[key] || {};
		}
		return current[key];
	}, obj);
};

const setValueAtPath = (obj, path, value) => {
	const pathArray = path.slice(0, -1);
	const lastKey = path[path.length - 1];
	const target = traversePath(obj, pathArray, true);
	const { key: arrayKey, index } = parseArrayKey(lastKey);

	if (typeof index === 'number') {
		target[arrayKey] = target[arrayKey] || [];
		target[arrayKey][index] = value;
	} else {
		target[lastKey] = value;
	}
};

/**
 * Handles file uploads and returns the formatted value.
 *
 * @param {FileList} files - List of uploaded files.
 * @param {boolean} multiple - Whether multiple files can be uploaded.
 * @param {number} maxFiles - Maximum number of files allowed.
 * @param {Array|Object|null} currentValue - Current value of the input field.
 * @returns {Array|Object|null} - Processed file(s) with object URL.
 */
const handleFileUpload = (files, multiple, maxFiles, currentValue) => {
	if (multiple) {
		const newFiles = Array.from(files).slice(
			0,
			maxFiles - (currentValue?.length || 0)
		);

		return [
			...(currentValue || []),
			...newFiles.map((file) => ({
				file,
				url: URL.createObjectURL(file)
			}))
		];
	}

	// Cleanup existing URL if any
	if (currentValue?.url) {
		URL.revokeObjectURL(currentValue.url);
	}

	const file = files[0];
	return file ? { file, url: URL.createObjectURL(file) } : null;
};

/**
 * Recursively cleans up object URLs for images.
 *
 * @param {Object} obj - Object containing image URLs.
 */
const cleanupImageUrls = (obj) => {
	if (!obj || typeof obj !== 'object') return;

	for (const key in obj) {
		if (obj[key]?.url) URL.revokeObjectURL(obj[key].url);
		cleanupImageUrls(obj[key]);
	}
};

/**
 * Updates error state for array fields when an item is removed.
 *
 * @param {Object} errors - Current form errors.
 * @param {string} parentPath - Parent path of the array.
 * @param {string} arrayKey - Array key in the state.
 * @param {number} deletedIndex - Index of the deleted item.
 * @returns {Object} - Updated errors.
 */
const updateArrayErrors = (errors, parentPath, arrayKey, deletedIndex) => {
	const result = { ...errors };
	const pathSegments = parentPath === '' ? [] : parentPath.split('.');
	const target =
		pathSegments.length > 0 ? traversePath(result, pathSegments) : result;
	if (target?.[arrayKey] && typeof target[arrayKey] === 'object') {
		const newErrors = {};
		Object.entries(target[arrayKey]).forEach(([key, value]) => {
			const index = parseInt(key, 10);
			if (!isNaN(index)) {
				if (index > deletedIndex) {
					newErrors[index - 1] = value;
				} else if (index < deletedIndex) {
					newErrors[index] = value;
				}
			}
		});
		if (Object.keys(newErrors).length > 0) {
			target[arrayKey] = newErrors;
		} else {
			delete target[arrayKey];
		}
	}
	return result;
};

/**
 * Custom hook for managing form state, handling input changes, and managing nested fields.
 *
 * @param {Object} initialState - Initial state of the form.
 * @returns {Object} - State, errors, and handlers for input changes and array operations.
 */
const useHandleInputChange = (initialState = {}) => {
	const [state, setState] = useState(initialState);
	const [errors, setErrors] = useState({});

	/**
	 * Handles input field changes and updates the state.
	 *
	 * @param {Event} e - The input change event.
	 */
	const handleInputChange = (e) => {
		const { name, value, type, files, multiple, dataset } = e.target;
		const maxFiles = dataset.max ? parseInt(dataset.max, 10) : Infinity;
		const path = getPathArray(name);

		setErrors((prev) => {
			if (!prev || Object.keys(prev).length === 0) return {};
			const newErrors = { ...prev };
			const clearErrorAtPath = (errors, pathString) => {
				const pathParts = pathString.split('.');
				const segments = [];
				for (const part of pathParts) {
					const { key, index } = parseArrayKey(part);
					if (typeof index === 'number') {
						segments.push(key);
						segments.push(index.toString());
					} else {
						segments.push(part);
					}
				}
				const removeNested = (obj, parts, depth = 0) => {
					if (depth >= parts.length) return true;
					const key = parts[depth];
					if (depth === parts.length - 1) {
						delete obj[key];
						return Object.keys(obj).length === 0;
					} else if (obj[key] && typeof obj[key] === 'object') {
						const isEmpty = removeNested(obj[key], parts, depth + 1);
						if (isEmpty) {
							delete obj[key];
							return Object.keys(obj).length === 0;
						}
					}
					return false;
				};
				removeNested(errors, segments);
				return errors;
			};
			return clearErrorAtPath(newErrors, name);
		});

		setState((prev) => {
			const updated = { ...prev };

			if (type === 'file' && files) {
				const currentValue = traversePath(updated, path);
				const newValue = handleFileUpload(
					files,
					multiple,
					maxFiles,
					currentValue
				);
				setValueAtPath(updated, path, newValue);
			} else {
				setValueAtPath(updated, path, value);
			}
			return updated;
		});
	};

	/**
	 * Handles adding or removing elements in array fields.
	 *
	 * @param {string} section - The section key in state.
	 * @param {'add'|'delete'} action - Action type ('add' or 'delete').
	 * @param {any} init - Initial value when adding a new element.
	 */
	const updateChildOfSection = (section, action, init = '') => {
		const path = getPathArray(section);
		const lastKey = path[path.length - 1];
		const { key: arrayKey, index } = parseArrayKey(lastKey);

		const parentPath = path.length > 1 ? path.slice(0, -1).join('.') : '';
		setErrors((prev) => {
			if (!prev || Object.keys(prev).length === 0) return prev;
			if (action === 'delete') {
				return updateArrayErrors(prev, parentPath, arrayKey, index);
			}
			return prev;
		});

		setState((prev) => {
			const updated = { ...prev };
			const target = traversePath(updated, path.slice(0, -1), true);

			if (action === 'add') {
				target[lastKey] = target[lastKey] || [];
				target[lastKey].push(init);
			} else if (action === 'delete') {
				if (typeof index === 'number') {
					cleanupImageUrls(target[arrayKey][index]);
					target[arrayKey].splice(index, 1);
				}
			}

			return updated;
		});
	};

	return {
		state,
		setState,
		errors,
		setErrors,
		handleInputChange,
		updateChildOfSection
	};
};

export default useHandleInputChange;
