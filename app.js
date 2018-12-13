const createError = require('http-errors'),
      {CErr, errHandling} = require('./err_handling'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      morgan = require('morgan'),
      fs = require('fs'),
      rfs = require('rotating-file-stream'),
      logger = require('./winston.js'),
      config = require('./config.js'),    
      app = express();

// ====== Morgan setup =========
// ensure log directory exists
fs.existsSync(config.morgan.path) || fs.mkdirSync(config.morgan.path)
// create a rotating write stream
var accessLogStream = rfs('access.log', config.morgan);
app.use(morgan(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: accessLogStream }));
app.use(morgan('dev'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Routers
// Error testing
app.get('/status', (req, res, next) => {
  next(new CErr(500));
});
app.get('/str', (req, res, next) => {
  next(new CErr(500, "I'm err 500"))
});
app.get('/err', (req, res, next) => {
  let err = new Error('Custom error instance');
  next(new CErr(500, err));
});
app.get('/msg', (req, res, next) => {
  let err = new Error('Custom error Instance with user message')
  next(new CErr(500, err, 'userMsg'))
});
app.get('/instance', (req, res, next) => {
  next(new Error("I'm a prototype error"))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new CErr(404));
});
// error handler
app.use(errHandling);


module.exports = app;
