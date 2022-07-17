import { NextFunction, Request, Response } from "express";

import ApiError from "../exceptions/ApiError";
import TaskService from "../services/TaskService";

class TaskController {
    async getTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                throw ApiError.UnauthorizedError();
            }

            const data = await TaskService.getTasks(user.id);

            return res.status(200).json(data);
        } catch(e) {
            return next(e);
        }
    }
    async getTask(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) throw ApiError.UnauthorizedError();

            const id = req.params.id;
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                throw ApiError.NotFound();
            }

            const data = await TaskService.getTask(user.id, id);

            return res.status(200).json(data);
        } catch(e) {
            return next(e);
        }
    }
    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                throw ApiError.UnauthorizedError();
            }

            const { date_start, date_end, title, description, todos } = req.body;

            const data = await TaskService.createTask(user.id, date_start, date_end, title, description, todos);

            return res.status(200).json(data);
        } catch(e) {
            return next(e);
        }
    }
    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) throw ApiError.UnauthorizedError();

            const { id, date_start, date_end, title, description, todos } = req.body;

            const data = await TaskService.updateTask(user.id, id, date_start, date_end, title, description, todos);

            return res.status(200).json(data);
        } catch(e) {
            return next(e);
        }
    }
    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) throw ApiError.UnauthorizedError();

            const id = req.params.id;
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                throw ApiError.NotFound();
            }

            await TaskService.deleteTask(user.id, id);

            return res.status(200).json({});

        } catch(e) {
            return next(e);
        }
    }
}

export default new TaskController();