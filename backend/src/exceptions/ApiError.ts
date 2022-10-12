export default class ApiError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
                
        this.status = status;
        this.errors = errors;

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static UnauthorizedError() {
        return new ApiError(401, "User doesn't authorized");
    }
    static NotFound() {
        return new ApiError(404, "This page is not found");
    }
    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors);
    }
}