# co-try-catch

Provides a nicer way to handle errors avoiding native `try {} catch (e) {}` indentation.
In example:

```js
const tryCatch = require('co-try-catch');

function *getData() {
  const response = yield tryCatch(makeRequest(options));
  if (response.err) {
     /* handle error */
     return;
  }
 
  /* handle success */
  console.log(response.result);
}

```
