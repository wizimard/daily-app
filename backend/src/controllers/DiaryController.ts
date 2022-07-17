import { NextFunction, Request, Response } from "express";

import DiaryService from "../services/DiaryService";

import ApiError from "../exceptions/ApiError";

class DiaryController {
    async getEntries(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                return ApiError.UnauthorizedError();
            }

            const entries = await DiaryService.getEntries(user.id);            

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

            const entry = await DiaryService.getEntry(user.id, entryId);

            return res.status(200).json(entry);
        } catch(e) {
            return next(e);
        }
    }
    async createEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                return ApiError.UnauthorizedError();
            }

            const { date, title, content, images, notes } = req.body;

            const data = await DiaryService.createEntry(user.id, title, content, date, images, notes);

            return res.status(200).json(data);
        } catch(e) {
            return next(e);
        }
    }
    async updateEntry(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                return ApiError.UnauthorizedError();
            }

            const { id, date, title, content, images, notes } = req.body;

            const data = await DiaryService.updateEntry(id, user.id, title, content, date, images, notes);

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

            await DiaryService.deleteEntry(id, user.id);

            return res.status(200).json({});
        } catch(e) {
            return next(e);
        }
    }
}

export default new DiaryController();