const winston = require('winston'),
    dailyRotateFile = require('winston-daily-rotate-file'),
    colors = {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta'
    },
    config = require('./config.js').winston;
winston.addColors(colors);
// let {combine, label, prettyPrint} = winston.format;

//const tsFormat = () => (new Date()).toISOString();
let logOptions = {
        console: {
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true,
            silent: false,
        //　 prettyPrint: true
        },
        dailyRotateFile:{
            level: 'warn',
            json: true,
            colorize: true,
            timestamp: true,
            zippedArchive: false,
            filename: config.filename,
            dirname: config.dirname,
            maxSize: config.maxSize,
            maxFiles: config.maxFiles,
            handleExceptions: true,

        }
    },
    logger = winston.createLogger({
        format: winston.format.combine(
            // winston.format.colorize(),
            winston.format.simple()
        ),

        transports:[
            new winston.transports.Console(logOptions.console),
            new winston.transports.DailyRotateFile(logOptions.dailyRotateFile)
        ],
        exitOnError: false
    })

module.exports = logger;