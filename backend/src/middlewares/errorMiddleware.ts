import { NextFunction, Request, Response } from "express";

import ApiError from "../exceptions/ApiError";

export default function errorMiddleware(error: ApiError | Error, _req: Request, res: Response, _next: NextFunction) {

    console.log(error);

    if (error instanceof ApiError) {        
        return res.status(error.status).json({
            message: error.message,
            errors: error.errors
        });
    }
    return res.status(500).json({
        message: 'Server failed'
    });
    
}