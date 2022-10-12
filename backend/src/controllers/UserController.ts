import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';

import UserService from "../services/UserService";

import ApiError from "../exceptions/ApiError";

import { CLIENT_URL } from "../constants";

class UserController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest('Validation failed', errors.array());
            }
            const { email, password, username }  = req.body;

            const userData = await UserService.registration(email, password, username);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch(e) {
            next(e);
        }
        return;
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;

            const userData = await UserService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);

        } catch(e) {
            next(e);
        }
        return;
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            
            const token = await UserService.logout(refreshToken);
            
            res.clearCookie('refreshToken');
            
            return res.status(200).json(token);
        } catch(e) {
            next(e);
        }
        return;
    }
    async confirm(req: Request, res: Response, next: NextFunction) {
        try {
            const confirmationLink = req.params.link;

            await UserService.confirm(confirmationLink);

            return res.redirect(CLIENT_URL);
        } catch(e) {
            next(e);
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            
            const userData = await UserService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch(e) {
            next(e);
        }
        return;
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.user?.id;
            if (!id) throw ApiError.UnauthorizedError();

            const { user } = req.body;
            
            const userData = await UserService.update({ id, ...user });

            return res.json(userData);
        } catch(e) {
            next(e);
        }
        return;
    }
}

export default new UserController();