'use strict';

module.exports = class TryCatchResult {
  constructor(err, result) {
    this.err = err;
    this.result = result;
  }

  /**
   *
   * @returns {boolean}
   */
  isError() {
    return !!this.err;
  }

  /**
   *
   * @returns {boolean}
   */
  isSuccess() {
    return !this.err;
  }

  /**
   *
   * @returns {boolean}
   */
  failed() {
    return !!this.err;
  }

  /**
   *
   * @returns {boolean}
   */
  succeeded() {
    return !this.err;
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
