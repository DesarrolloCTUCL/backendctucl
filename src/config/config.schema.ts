import * as Joi from 'joi';

export const configValidationSchema = Joi.object<EnvConfig>({
  PORT: Joi.number().default(3000), // Si no se define, toma 3000 por defecto
  DB_HOST: Joi.string().required().messages({
    'any.required': 'DATABASE_URL es un campo obligatorio',
  }),
});