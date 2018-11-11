export const THROTTLE = parseInt(process.env.THROTTLE || '0', 10) || 0;
export const PORT = process.env.PORT || 8080;
export const SANDBOX = !!process.env.SANDBOX || false;
export const POLLING_INTERVAL =
  parseInt(process.env.POLLING_INTERVAL || '0', 10) || 30 * 1000;
