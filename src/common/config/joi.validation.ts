import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  POSTGRES_URL: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  PORT: Joi.number().required().default(3000),
  JWT_SECRET: Joi.string().required(),
  TOKEN_EXPIRATION: Joi.string().required(),
});
