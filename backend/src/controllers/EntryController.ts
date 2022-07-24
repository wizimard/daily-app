import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import EntryService from "../services/EntryService";

import ApiError from "../exceptions/ApiError";
import { API_URL } from "../constants";

class EntryController {
    async getEntries(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                return ApiError.UnauthorizedError();
            }

            const page = (typeof req.query.page === 'string') ? parseInt(req.query.page) : 0;

            const entries = await EntryService.getEntries(user.id, page);

            return res.status(200).json(entries);
        } catch(e) {
            return next(e);
        }
    }
    async getEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                throw ApiError.UnauthorizedError();
            }

            const entryId = req.params.id;

            if (!entryId.match(/^[0-9a-fA-F]{24}$/)) {
                throw ApiError.NotFound();
            }

            const entry = await EntryService.getEntry(user.id, entryId);

            return res.status(200).json(entry);
        } catch(e) {
            return next(e);
        }
    }
    async createEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest('Enty content must not be empty!', errors.array());
            }

            const user = req.user;
            if (!user) {
                return ApiError.UnauthorizedError();
            }

            const { date, title, content, images, notes } = req.body;

            const data = await EntryService.createEntry(user.id, title, content, date, images, notes);

            return res.status(200).json(data);
        } catch(e) {
            return next(e);
        }
    }
    async updateEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest('Enty content must not be empty!', errors.array());
            }

            const user = req.user;
            if (!user) {
                return ApiError.UnauthorizedError();
            }

            const { id, date, title, content, images, notes } = req.body;

            const data = await EntryService.updateEntry(id, user.id, title, content, date, images, notes);

            return res.status(200).json(data);
        } catch(e) {
            return next(e);
        }
    }
    async deleteEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                throw ApiError.UnauthorizedError();
            }
            const id = req.params.id;

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                throw ApiError.NotFound();
            }

            await EntryService.deleteEntry(id, user.id);

            return res.status(200).json({});
        } catch(e) {
            return next(e);
        }
    }
    async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                throw ApiError.UnauthorizedError();
            }

            if (!req.files) {
                throw ApiError.BadRequest('no images');
            }
            
            const data = (req.files as Express.Multer.File[]).map((file) => {
                const destination = file.destination.replace('./uploads', '');
                return `${API_URL}${destination}${file.filename}`;
            });

            return res.status(200).json(data);
        } catch(e) {
            return next(e);
        }
    }
}

export default new EntryController();