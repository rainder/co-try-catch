'use strict';

const TryCatchResult = require('./try-catch-result');

module.exports = {
  tryCatch,
  TryCatchResult
};

/**
 *
 * @param gen
 * @returns {TryCatchResult}
 */
function *tryCatch(gen) {
  let err;
  let result;

  try {
    result = yield gen;
    if (result instanceof TryCatchResult) {
      return result;
    }
  } catch (e) {
    err = e;
  }

  return new TryCatchResult(err, result);
}
