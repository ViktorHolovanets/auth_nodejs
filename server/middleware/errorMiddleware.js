const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Internal Server Error' : err.message;

    res.status(statusCode).json({
        success: false,
        message: message,
    });
    console.error(err);
   
};

export default errorMiddleware;
