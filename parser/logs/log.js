const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.label({label: path.basename(process.mainModule.filename)}),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({ fillExcept: ['level' , 'label' ,'message', 'timestamp'] }),
    format.splat(),
    format.simple()
  ),
  transports: [
    new winston.transports.File(
      { 
        filename: 'logs/output_log/parser.log', 
        level: 'info' ,
      }),
  ]
});

const memory = winston.createLogger({
  level: 'info',
  format: format.combine(
    timestamp(),
    format.splat(),
    format.simple()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/output_log/memory.log', level: 'info' }),
  ]
});

const workTime = winston.createLogger({
  level: 'info',
  format: format.combine(
    timestamp(),
    format.splat(),
    format.simple()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/output_log/workTime.log', level: 'info' }),
  ]
});

module.exports = { logger , memory , workTime };