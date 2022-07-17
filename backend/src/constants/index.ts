import 'dotenv/config';

export const DB_URL = process.env.DB_URL || '';
export const PORT = process.env.PORT || 3010;
export const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY || '';
export const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY || '';
export const SMTP_HOST = process.env.SMTP_HOST || '';
export const SMTP_PORT = Number(process.env.SMTP_PORT) || 0;
export const SMTP_USER = process.env.SMTP_USER || '';
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
export const API_URL = process.env.API_URL || '';
export const CLIENT_URL = process.env.CLIENT_URL || '';