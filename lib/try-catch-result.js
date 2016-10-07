'use strict';

module.exports = class TryCatchResult {
  constructor(err, result, is_error) {
    this.err = err;
    this.result = result;
    this.is_error = is_error;
  }

  /**
   *
   * @returns {boolean}
   */
  isError() {
    return !!this.is_error;
  }

  /**
   *
   * @returns {boolean}
   */
  isSuccess() {
    return !this.is_error;
  }

  /**
   *
   * @returns {boolean}
   */
  failed() {
    return !!this.is_error;
  }

  /**
   *
   * @returns {boolean}
   */
  succeeded() {
    return !this.is_error;
  }

  /**
   *
   * @returns {*}
   */
  getError() {
    return this.err;
  }

  /**
   *
   * @returns {*}
   */
  getResult() {
    return this.result;
  }
};
