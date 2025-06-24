import Joi from 'joi';

const validateString = (name = 'Trường này', required = true, max = null) => {
    let schema = Joi.string().trim();
    if (required) {
        schema = schema.required().messages({
            'string.empty': name + ' là bắt buộc',
            'any.required': name + ' là bắt buộc'
        });
    } else {
        schema = schema.allow('').default('');
    }
    if (max) {
        schema = schema.max(max).messages({
            'string.max': `Giới hạn ${max} ký tự`
        });
    }
    return schema;
};

const validateBoolean = (defaultValue = null, name = 'Trường này') => {
    let schema = Joi.boolean().messages({
        'boolean.base': 'Giá trị phải là kiểu boolean'
    });
    if (defaultValue !== null) {
        schema = schema.default(defaultValue);
    } else {
        schema = schema.required().messages({
            'any.required': `${name}  là bắt buộc`
        });
    }
    return schema;
};

const validateNumber = (
    name = 'Trường này',
    required = true,
    min = null,
    max = null
) => {
    let schema = Joi.number().messages({
        'number.base': `${name} phải là một số`
    });

    if (min !== null) {
        schema = schema.min(min).messages({
            'number.min': `${name} phải lớn hơn hoặc bằng ${min}`
        });
    }

    if (max !== null) {
        schema = schema.max(max).messages({
            'number.max': `${name} phải nhỏ hơn hoặc bằng ${max}`
        });
    }

    if (required) {
        schema = schema.required().messages({
            'any.required': `${name} là bắt buộc`
        });
    } else {
        schema = schema.default(0);
    }

    return schema;
};

const validateEnum = (
    allowedValues = [],
    name = 'Trường này',
    required = true,
    defaultValue = null
) => {
    let schema = Joi.string()
        .valid(...allowedValues)
        .messages({
            'any.only': `${name} phải là một trong các giá trị: ${allowedValues.join(
                ', '
            )}`
        });

    if (required) {
        schema = schema.required().messages({
            'string.empty': `${name} là bắt buộc`,
            'any.required': `${name} là bắt buộc`
        });
    } else {
        schema = schema.allow('');
    }

    if (defaultValue !== null && allowedValues.includes(defaultValue)) {
        schema = schema.default(defaultValue);
    }

    return schema;
};

const validateImage = (name = 'Hình ảnh') => {
    return Joi.alternatives()
        .try(
            Joi.object()
                .instance(File)
                .custom((file, helpers) => {
                    const allowedTypes = [
                        'image/jpg',
                        'image/jpeg',
                        'image/png',
                        'image/webp',
                        'image/gif'
                    ];
                    if (!allowedTypes.includes(file.type)) {
                        return helpers.error('file.invalidType');
                    }
                    return file;
                }, 'Image file validation')
                .required(),
            Joi.string().required()
        )
        .messages({
            'string.empty': `${name} là bắt buộc`,
            'any.required': `${name} là bắt buộc`,
            'alternatives.types': `Định dạng ${name.toLowerCase()} không hợp lệ`,
            'file.invalidType': `${name} phải là file ảnh (JPG, PNG, WebP, GIF)`
        })
        .required();
};

const validateImages = (
    name = 'Danh sách hình',
    min = null,
    max = null,
    required = true
) => {
    let schema = Joi.array().items(validateImage());

    if (min !== null) {
        schema = schema.min(min);
    }
    if (max !== null) {
        schema = schema.max(max);
    }

    if (required) {
        schema = schema.required();
    } else {
        schema = schema.default([]);
    }

    schema = schema.messages({
        'array.base': `${name} phải là một mảng`,
        'array.min': `${name} phải có ít nhất ${min} ảnh`,
        'array.max': `${name} chỉ được ${max} ảnh`,
        'any.required': `${name} không được bỏ trống`
    });

    return schema;
};

const validateStringArray = (required = false) => {
    let schema = Joi.array().items(validateString('Nội dung'));
    if (required) {
        schema = schema.required();
    } else {
        schema = schema.default([]);
    }

    return schema;
};

const validateArray = (
    schema,
    name = 'Danh sách',
    min = null,
    max = null,
    required = false
) => {
    let arraySchema = Joi.array().items(schema);

    if (min !== null) {
        arraySchema = arraySchema.min(min).messages({
            'array.min': `${name} phải có ít nhất ${min} phần tử`
        });
    }
    if (max !== null) {
        arraySchema = arraySchema.max(max).messages({
            'array.max': `${name} có nhiều nhất ${max} phần tử`
        });
    }

    if (required) {
        arraySchema = arraySchema.required().messages({
            'any.required': `${name} là bắt buộc`
        });
    } else {
        arraySchema = arraySchema.default([]);
    }

    return arraySchema;
};

const validateObject = (schema, name = 'Dữ liệu', required = false) => {
    let objectSchema = Joi.object(schema);
    if (required) {
        objectSchema = objectSchema.required().messages({
            'any.required': `${name} là bắt buộc`
        });
    }
    return objectSchema;
};

const validateSection = (fields = {}, required = true) => {
    let schema = Joi.object(fields);
    if (required) {
        schema = schema.required();
    }
    return schema;
};

export {
    validateSection,
    validateString,
    validateNumber,
    validateEnum,
    validateImage,
    validateImages,
    validateArray,
    validateObject,
    validateBoolean,
    validateStringArray
};
