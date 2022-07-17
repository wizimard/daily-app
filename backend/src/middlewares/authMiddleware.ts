import { NextFunction, Request, Response } from "express";

import TokenService from "../services/TokenService";

import ApiError from "../exceptions/ApiError";

export default function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    } catch(e) {
        next(ApiError.UnauthorizedError());
    }
}