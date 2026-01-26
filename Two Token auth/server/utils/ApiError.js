export class ApiError extends Error {
  constructor(message, { status = 500, code = "INTERNAL_ERROR" }) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.code = code
  }
}


export class BadRequestError extends ApiError {
  constructor(message = "Bad Request"){
    super(message, { status: 400, code: "BAD_REQUEST"})
  }
}


export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized"){
    super(message, { status: 401, code: "UNAUTHORIZED"})
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden"){
    super(message, { status: 403, code: "FORBIDDEN"})
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not found"){
    super(message, { status: 404, code: "NOT_FOUND"})
  }
}