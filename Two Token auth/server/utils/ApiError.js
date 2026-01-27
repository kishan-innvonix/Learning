export class ApiError extends Error {
  constructor(message, { status = 500, code = "INTERNAL_ERROR", errors = [] }) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.code = code
    this.errors = errors
  }
}


export class BadRequestError extends ApiError {
  constructor(message = "Bad Request", errors){
    super(message, { status: 400, code: "BAD_REQUEST", errors})
  }
}


export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized",errors){
    super(message, { status: 401, code: "UNAUTHORIZED", errors})
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden",errors){
    super(message, { status: 403, code: "FORBIDDEN", errors})
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not found"){
    super(message, { status: 404, code: "NOT_FOUND", errors})
  }
}