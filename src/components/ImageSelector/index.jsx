import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AdvancedImage } from '@cloudinary/react';
import cloudinary from '~/config/cloudinary';
import { cn, isUrl } from '~/utils';

const ImageSelector = forwardRef(
    (
        {
            name,
            alt = 'image',
            width,
            height,
            className,
            imgClass,
            error,
            loading = 'lazy',
            value,
            onChange,
            disabled
        },
        ref
    ) => {
        const [previewUrl, setPreviewUrl] = useState('');

        useEffect(() => {
            let url;
            if (value instanceof File) {
                url = URL.createObjectURL(value);
                setPreviewUrl(url);
            } else if (typeof value === 'string') {
                setPreviewUrl(value);
            } else {
                setPreviewUrl('');
            }

            return () => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            };
        }, [value]);

        return (
            <div
                className={cn(
                    'relative group/item flex justify-center items-center text-center border border-dashed border-gray-300',
                    { 'opacity-60': disabled },
                    className,
                    { 'border-red-500': error && !previewUrl },
                    'overflow-hidden'
                )}
            >
                {previewUrl ? (
                    <>
                        {isUrl(previewUrl) ? (
                            <img
                                src={previewUrl}
                                alt={alt}
                                width={width}
                                height={height}
                                className={cn(
                                    'size-full object-cover',
                                    imgClass
                                )}
                                loading={loading}
                            />
                        ) : (
                            <AdvancedImage
                                cldImg={cloudinary.image(previewUrl)}
                                className={cn(
                                    'size-full object-cover',
                                    imgClass
                                )}
                                loading={loading}
                                alt={alt}
                            />
                        )}
                        <div className='absolute invisible group-hover/item:visible size-full flex justify-center items-center bg-black/25'>
                            <span className='text-sm text-white font-medium uppercase'>
                                Thay đổi
                            </span>
                        </div>
                    </>
                ) : (
                    <span className='text-sm font-medium uppercase text-gray-600'>
                        Chọn ảnh
                    </span>
                )}
                <label
                    className={cn(
                        'absolute size-full top-0 left-0 block bg-transparent cursor-pointer',
                        {
                            'cursor-not-allowed': disabled
                        }
                    )}
                >
                    <input
                        type='file'
                        name={name}
                        accept='image/*'
                        hidden
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                onChange({ target: { name, value: file } });
                            }
                        }}
                        disabled={disabled}
                        ref={ref}
                    />
                </label>
            </div>
        );
    }
);

ImageSelector.displayName = 'ImageSelector';
ImageSelector.propTypes = {
    name: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    alt: PropTypes.string,
    className: PropTypes.string,
    imgClass: PropTypes.string,
    error: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.string
};
export default ImageSelector;
