const { sendError } = require('../utils/response');

const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });

  if (error) {
    const errors = error.details.map((d) => ({
      field: d.path.join('.'),
      message: d.message.replace(/['"]/g, ''),
    }));
    return sendError(res, { statusCode: 422, message: 'Validation failed', errors });
  }

  req[property] = value;
  next();
};

module.exports = validate;
