# Express boilerplate
A boilerplate with error handling and config file.


## How to use
* Require `err_handling/index.js`, create `CErr` instance with following parameters:
  * `statusCode`: HTTP status code, defaults to 500.
  * `err`: String or error object, for error message and stack, will be write to log.
  * `userMsg`: Message for user, defaults to `please contact us with error id: [errorId].`
