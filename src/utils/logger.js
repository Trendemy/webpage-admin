import { NODE_ENV } from '~/config/env';

/**
 * Logs messages to the console based on the environment.
 * - In `development`, logs the message and optional context.
 * - In `production`, logging is disabled.
 * - If `NODE_ENV` is missing, it does nothing.
 *
 * @param {string} message - The log message.
 * @param {Object} context - Additional context data (optional).
 *
 * @example
 * logger('Server started', { port: 3000 });
 * // Logs in development: "Server started", { port: 3000 }
 */
const logger = (message, context = {}) => {
   switch (NODE_ENV) {
      case 'development':
         console.log(message, context);
         break;
      case 'production':
         break;
      default:
         break;
   }
};

export default logger;
