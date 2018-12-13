const createErr = require('http-errors'),
    uuidv4 = require('uuidv4'),
    logger = require('../winston.js');

class CErr {
    constructor (statusCode, err, userMsg) {
        let httpError = createErr(statusCode, err, {expose: false}),
            uid = uuidv4(),
            timeStamp = new Date();
        timeStamp = timeStamp.toISOString();
        userMsg = statusCode !== 404 ? (!userMsg ? `${httpError.name}: please contact us with error id: ${uid}` : `${userMsg}:  please contact us with error id: ${uid}`) : httpError.name;
        this.id = uid;
        this.timeStamp = timeStamp;
        this.message = httpError.message;
        this.stack = httpError.stack;
        this.userMsg = userMsg;
        this.status = httpError.status;
    }
};
function errHandling (err, req, res, next) {
    if (!(err instanceof CErr)) {
        err = new CErr(500, err);
    }
    logger.error(`id:${err.id} @${err.timeStamp}\n${err.stack}`);
    res.status(err.status).send(err.userMsg);
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
}

  module.exports = {
      CErr: CErr,
      errHandling: errHandling
  };