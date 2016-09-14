'use strict';

const CoTryCatchResult = require('./lib/co-try-catch-result');

module.exports = {
  tryCatch,
  CoTryCatchResult
};

/**
 *
 * @param gen
 * @returns {CoTryCatchResult}
 */
function *tryCatch(gen) {
  let err;
  let result;

  try {
    result = yield gen;
    if (result instanceof CoTryCatchResult) {
      err = result.err;
      result = result.result;
    }
  } catch (e) {
    err = e;
  }

  return new CoTryCatchResult(err, result);
}
