
export const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}


export class AppError extends Error {
    constructor(
        message,
        { status = 500, code = "INTERNAL_ERROR"}
    ){
        super(message);
        this.name = this.contructor.name;
        this.status = status;
        this.code = code;
    }
}


export class BadRequestError extends AppError {
  constructor(message = "Bad Request"){
    super(message, { status: 400, code: "BAD_REQUEST"})
  }
}


export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized"){
    super(message, { status: 401, code: "UNAUTHORIZED"})
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden"){
    super(message, { status: 403, code: "FORBIDDEN"})
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found"){
    super(message, { status: 404, code: "NOT_FOUND"})
  }
}