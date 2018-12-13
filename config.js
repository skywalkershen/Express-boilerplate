const path = require('path'),
    config = {
        dev: {
            host: 'http://13.231.162.11',
            port: 8000,
            mode: 'dev',
            winston: {
                filename: '%DATE%.log',
                dirname: `${__dirname}/logs`,
                maxSize: '10m',
                maxFiles: '15d',
            },
            morgan: {
                interval: '1d',
                path: path.join(__dirname, 'logs')
            }
        },
        prod: {
            host: 'http://13.231.162.11',
            port: 8000,
            mode: 'prod',
            winston: {
                filename: '%DATE%.log',
                dirname: `${__dirname}/logs`,
                maxSize: '10m',
                maxFiles: '15d',
            },
            morgan: {
                interval: '1d',
                path: path.join(__dirname, 'logs')
            }
        }
    },
    mode = 'dev';
module.exports = config[mode];
