import * as jwt from 'jsonwebtoken';

export { Express } from 'express';

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        id: string
    }
}
declare global {
    namespace Express {
        interface Request {
            user?: jwt.UserIDJwtPayload | null;
        }
    }
}