const { isTestEnv } = require('./testEnv');
const log = require('../../logger');
const config = require('../../../config');
module.exports = function (err, req, res, next) {
  if (!isTestEnv() || config.NODE_ENV === 'development') {
    log.error(
      `${err?.message} - ${err?.originalError?.message}
    ${err?.originalError?.stack ?? err?.stack}`,
    );
  }

  const httpStatusCode = err?.httpStatusCode ?? 500;
  let apiErrorStatus = null;

  if (err?.response?.status) {
    if (!isTestEnv()) {
      console.log(`API Status: ${err.response.status}`);
    }
    apiErrorStatus = err.response.status;
  }

  if (err?.response?.data) {
    if (!isTestEnv()) {
      console.log(err.response.data);
    }
  }

  const errResponse = {
    error: true,
    message: err?.message ?? 'Something broke!',
  };

  if (apiErrorStatus) {
    errResponse.apiErrorStatus = apiErrorStatus;
  }

  if (err?.response?.data) {
    errResponse.context = err.response.data;
  }

  const validationErrors = err?.details || err?.originalError?.details;
  if (validationErrors?.length) {
    return res.status(400).json({
      message: `Validation Failed: ${err.message || ''}`,
      errors: validationErrors,
    });
  }

  if (err?.errors) {
    errResponse.errors = err.errors;
  } else if (err?.originalError?.errors) {
    errResponse.errors = err.originalError.errors;
  }

  res.status(httpStatusCode).send(errResponse);
};
