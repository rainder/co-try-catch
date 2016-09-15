# co-try-catch

Provides a nicer way to handle errors avoiding <del>ugly</del> native `try {} catch (e) {}` indentation.


## Example

```js
const { tryCatch } = require('co-try-catch');

function *getData() {
  const response = yield tryCatch(makeAsyncRequest(options));
  if (response.failed()) {
      /* handle error */

     return /* and stop function execution */;
  }
 
  /* continue with the normal function execution */
  console.log(response.getResult());
}

```

...also, if you prefer...

```js
const { err, result } = yield tryCatch(makeAsyncRequest(options));

```

## Api
### \*tryCatch(gen: Function|Function*|Promise): TryCatchResult
### TryCatchResult
#### isError(): Boolean
Returns if function has thrown an error

#### isSuccess(): Boolean
Returns if function didn't throw an error

#### failed(): Boolean
alias of isError()

#### succeeded(): Boolean
alias of isSuccess()

#### getError(): Mixed
Returns the thrown object

#### getResult(): Mixed
Returns result of the function execution

## Supports nested calls
if a function call returns an instance of `TryCatchResult` it is passed up to the caller

```js
const { tryCatch } = require('co-try-catch');

co(function*() {
  const exception = function *() { thrown new Error('test'); }
  const fn1 = function *() { return yield tryCatch(exception()); };
  const fn2 = function *() { return yield tryCatch(fn1)); };

  const result = tryCatch(f2());
  result.isError().should.equals(true);
  result.getError().message.should.equals('test');
});

```
