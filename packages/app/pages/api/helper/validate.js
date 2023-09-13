import Joi from "joi";

export const createUrlSchema = Joi.object({
  userId: Joi.string().required(),
  expiration: Joi.object({
    date: Joi.date().iso().required(),
    exp: Joi.string().required(),
  }),
  sessionId: Joi.string().required(),
});

export const getUrlSchema = Joi.object({
  id: Joi.string().required(),
});
