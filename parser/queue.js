var Queue = require("queue");
var queue = Queue();
const {logger , memory} = require('./logs/log');

queue.concurrency = 1;
queue.autostart = true;
queue.timeout = 10000;
var i = 0;

queue.on('error' , function(err , job)
{
  i++;
  logger.warn('error of job # ' + i + ', error: ' + err );
})

queue.on('success', function (result, job) 
{
  i++;
  logger.info( 'job # ' + i + ' added success  ');
  memory.info(`queue.js->add \n` + 
  `rss       : ${process.memoryUsage().rss / 1048576}  MB\n` + 
  `Total Heap: ${process.memoryUsage().heapTotal / 1048576}  MB\n` + 
  `Used Heap : ${process.memoryUsage().heapUsed / 1048576} MB\n`);
})

module.exports = queue;