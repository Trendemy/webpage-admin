import { Cloudinary } from '@cloudinary/url-gen';
import { CLOUDINARY_NAME } from './env';

const cloudinary = new Cloudinary({
	cloud: {
		cloudName: CLOUDINARY_NAME,
	},
	url: {
		secure: true,
	},
});

export default cloudinary;
