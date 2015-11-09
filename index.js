'use strict';

module.exports = tryCatch;

/**
 *
 * @param gen
 * @returns {{result: *, err: *}}
 */
function *tryCatch(gen) {
  let err;
  let result;

  try {
    result = yield gen;
  } catch (e) {
    err = e;
  }

  return { result, err };
}