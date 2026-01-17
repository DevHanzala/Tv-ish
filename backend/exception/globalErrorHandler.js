import { HttpError } from "../utils/HttpError.js";
import { error as sendError } from "../utils/response.js"; // your wrapper

export const globalErrorHandler = (err, req, res, next) => {

  if (err instanceof HttpError) {
    // Use statusCode and message from your HttpError
    return sendError(res, err.message, err.statusCode);
  }

  // fallback for unknown errors
  return sendError(res, "Internal Server Error", 500);
};
