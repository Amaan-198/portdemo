// This middleware will run if a route is not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// This is our main error handler. It will catch any errors thrown in our app.
const errorHandler = (err, req, res, next) => {
  // Sometimes an error might come in with a 200 status code, so we'll default to 500 if that's the case
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // We only want the stack trace if we're not in production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
