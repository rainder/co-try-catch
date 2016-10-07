'use strict';

const co = require('co');
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
function tryCatch(gen) {
  return co(gen).then(success).catch(fail);
}

/**
 *
 * @param result
 * @returns {*}
 */
function success(result) {
  if (result instanceof TryCatchResult) {
    return result;
  }

  return new TryCatchResult(null, result, false);
}

/**
 *
 * @param err
 * @returns {*}
 */
function fail(err) {
  return new TryCatchResult(err, null, true);
}