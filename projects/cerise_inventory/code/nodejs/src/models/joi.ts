import joi from "joi";

export const loginSchema = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required(),
});
