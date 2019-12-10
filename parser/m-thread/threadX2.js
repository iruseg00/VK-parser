const shell = require("shelljs");

var res = shell.exec('cat /proc/cpuinfo|grep processor|wc -l').stdout;