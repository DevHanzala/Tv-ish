import { HttpError } from "./HttpError.js";
import { error as sendError } from "../utils/apiResponse.js";

const  globalErrorHandler = (err, req, res, next) => {

  if (err instanceof HttpError) {
    // Use statusCode and message from your HttpError
    return sendError(res, err.message, err.statusCode);
  }

  // fallback for unknown errors
  return sendError(res, "Internal Server Error", 500);
};

export default globalErrorHandler;