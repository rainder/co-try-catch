'use strict';

const co = require('co');
const chai = require('chai');
const { tryCatch, TryCatchResult } = require('./..');

chai.should();

describe('try-catch', function () {

  function shouldError(result) {
    (!!result.err).should.equals(true);
    (!!result.result).should.equals(false);
  }

  function shouldNotError(result) {
    (!!result.err).should.equals(false);
    (!!result.result).should.equals(true);
  }

  it('should catch the error', co.wrap(function *() {
    const error = new Error('');

    const result = yield tryCatch(function *() {
      throw error;
    }());

    shouldError(result);
    result.err.should.equals(error);
  }));

  it('should succeed', co.wrap(function *() {
    const result = yield tryCatch(function *() {
      return 10;
    }());

    shouldNotError(result);
    result.result.should.equals(10);
  }));

  it('should handle promises', co.wrap(function *() {
    const promise = new Promise(function (resolve, reject) {
      reject(10);
    });

    const result = yield tryCatch(promise);

    shouldError(result);
    result.err.should.equals(10);
  }));

  it('should handle tryCatch inide tryCatch', co.wrap(function *() {
    const exception = function *() {
      throw new Error('test');
    };

    const f1 = function *() {
      return yield tryCatch(exception())
    };

    const f2 = function *() {
      return yield tryCatch(f1())
    };

    const r = yield f2();
    r.should.instanceof(TryCatchResult);
    r.isError().should.equals(true);
    r.getError().message.should.equals('test');

    const { err } = yield f2();
    err.message.should.equals('test');
  }));

  it('should throw null', co.wrap(function *() {
    const result = yield tryCatch(Promise.reject());
    result.failed().should.equals(true);
    result.err.should.be.instanceOf(Error);
  }));
});
