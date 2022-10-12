import { NextFunction, Request, Response } from "express";

import ApiError from "../exceptions/ApiError";
import { API_URL } from "../constants";

class FileController {
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

export default new FileController();