'use strict';

const mocha = require('co-mocha');
const chai = require('chai');
const tryCatch = require('./..');

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

  it('should catch the error', function *() {
    const error = new Error('');

    const result = yield tryCatch(function *() {
      throw error;
    }());

    shouldError(result);
    result.err.should.equals(error);
  });

  it('should succeed', function *() {
    const result = yield tryCatch(function *() {
      return 10;
    }());

    shouldNotError(result);
    result.result.should.equals(10);
  });

  it('should handle promises', function *() {
    const promise = new Promise(function (resolve, reject) {
      reject(10);
    });

    const result = yield tryCatch(promise);

    shouldError(result);
    result.err.should.equals(10);
  });
});