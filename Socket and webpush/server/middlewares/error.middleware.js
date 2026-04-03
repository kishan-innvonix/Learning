
export const globalErrorHandler = (err, req, res, next) => {
    console.log(err)

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors
    })
}