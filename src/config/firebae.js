import { initializeApp } from 'firebase/app';
import {
	API_KEY,
	APP_ID,
	AUTH_DOMAIN,
	MEASUREMENT_ID,
	MESSAGING_SENDER_ID,
	PROJECT_ID,
	STORAGE_BUCKET
} from './env';

export default initializeApp({
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID
});
