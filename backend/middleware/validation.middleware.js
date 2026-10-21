import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.utils.js';

// Validate request data
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));

    return errorResponse(res, 400, 'Validation failed', formattedErrors);
  }

  next();
};
