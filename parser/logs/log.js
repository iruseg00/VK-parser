const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    timestamp(),
    format.splat(),
    format.simple()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/output_log/parser.log', level: 'info' }),
    // new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

module.exports = logger;