const chalk = require('chalk');

class TimerPlugin {
  constructor() {
    this._beforeRunTime = 0;
    this._doneTime = 0;
  }

  apply(compiler) {
    compiler.hooks.beforeRun.tap('TimerPlugin', (stats) => {
      this._beforeRunTime = +new Date();
    })
    
    compiler.hooks.done.tap('TimerPlugin', (stats) => {
      this._doneTime = +new Date();

      console.log(chalk.green(`打包耗时: ${this._doneTime - this._beforeRunTime}ms`));
    })
  }
}

module.exports = TimerPlugin;