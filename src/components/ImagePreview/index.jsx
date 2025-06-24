import PropTypes from 'prop-types';
import { AdvancedImage } from '@cloudinary/react';
import cloudinary from '~/config/cloudinary';
import { cn, isUrl } from '~/utils';
import { Plus } from '~/components/Icons';
import { useEffect, useState } from 'react';

const ImagePreview = ({
    title = '[Image Preview]',
    images,
    max,
    error,
    onChange,
    className,
    name,
    disabled
}) => {
    const [previewUrls, setPreviewUrls] = useState([]);

    useEffect(() => {
        const urls = [];
        const objectUrls = [];

        images.forEach((image, index) => {
            if (image instanceof File) {
                const url = URL.createObjectURL(image);
                urls[index] = url;
                objectUrls.push(url);
            } else if (typeof image === 'string') {
                urls[index] = image;
            } else if (image?.url) {
                urls[index] = image.url;
            } else {
                urls[index] = image;
            }
        });
        setPreviewUrls(urls);
        return () => {
            objectUrls.forEach((url) => {
                URL.revokeObjectURL(url);
            });
        };
    }, [images]);

    const handleFileChange = (e, index = null) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        let newImages = [...images];
        if (index !== null) {
            newImages[index] = files[0];
        } else {
            const remainingSlots = max ? max - images.length : Infinity;
            const filesToAdd = files.slice(0, remainingSlots);
            newImages = [...newImages, ...filesToAdd];
        }
        onChange({ target: { name, value: newImages } });
        e.target.value = '';
    };

    return (
        <div className='relative flex-1 pb-5'>
            <p className='text-sm text-center text-gray-600 mb-3'>{title}</p>
            {error && (
                <p className='text-sm text-red-500 text-center mb-3'>{error}</p>
            )}
            <div className='flex flex-wrap gap-3'>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            'relative flex w-40 h-fit group/item rounded overflow-hidden',
                            { 'opacity-60': disabled },
                            className
                        )}
                    >
                        {isUrl(previewUrls[index]) ? (
                            <img
                                src={previewUrls[index]}
                                className='w-full h-full object-cover'
                                alt={`images preview ${index + 1}`}
                            />
                        ) : (
                            <AdvancedImage
                                cldImg={cloudinary.image(previewUrls[index])}
                                className='w-full h-full object-cover'
                                alt={`images preview ${index + 1}`}
                            />
                        )}
                        <label
                            className={cn(
                                'absolute invisible group-hover/item:visible size-full top-0 left-0 bg-black/25 flex justify-center items-center text-white text-xs font-medium uppercase cursor-pointer select-none',
                                {
                                    'opacity-60 cursor-not-allowed': disabled
                                }
                            )}
                        >
                            Thay đổi
                            <input
                                type='file'
                                name={`${name}.${index}`}
                                accept='image/*'
                                hidden
                                onChange={(e) => handleFileChange(e, index)}
                                disabled={disabled}
                            />
                        </label>
                    </div>
                ))}
                {(!max || images.length < max) && (
                    <>
                        <label
                            className={cn(
                                'size-fit text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 cursor-pointer p-1.5',
                                { 'opacity-60 cursor-not-allowed': disabled }
                            )}
                        >
                            <Plus className='size-3.5' strokeWidth={2} />
                            <input
                                type='file'
                                accept='image/*'
                                data-max={max}
                                name={name}
                                multiple={!max || max - images.length > 1}
                                hidden
                                onChange={(e) => handleFileChange(e)}
                                disabled={disabled}
                            />
                        </label>
                    </>
                )}
                <div className='absolute right-0 bottom-0'>
                    <span className='text-sm text-gray-500'>
                        [{max ? images.length + '/' + max : images.length}]
                    </span>
                </div>
            </div>
        </div>
    );
};

ImagePreview.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    images: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ).isRequired,
    onChange: PropTypes.func
};
export default ImagePreview;
