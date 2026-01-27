import { BadRequestError } from "../utils/ApiError.js";

export const validateSchema = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
    });
    
    if (error) {
      throw new BadRequestError("Invalid Input Data!!!", error?.details);
    }

    req[property] = value;
    next();
  };
};
