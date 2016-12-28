const os = require('os')

const { RunnerOptions, RunOptions, RunResult, TestResult, RunStatus, TestStatus } = require('stryker-api/test_runner')
const { EventEmitter } = require('events')

const childProcess = require('child_process')


module.exports = class JestRunner extends EventEmitter {
  /**
   * @constructor
   * @param {!RunnerOptions} options
   */
  constructor(options) {
    super()
    this._files = options.files.filter((file) => {
      return file.included
    })
  }

  purgeFiles() {
    this._files.forEach((f) => {
      delete require.cache[f.path]
    });
  }

  /**
   * Executes a test run.
   * @param {!RunOptions} options
   * @return {!Promise<!RunResult>}
   */
  run(options) {
    return new Promise((resolve, reject) => {
      this.purgeFiles()

      const paths = this._files.map((file) => {
        return file.path
      })
      childProcess.exec('npm test -- ' + paths.join(' '), (err, stdout, stderr) => {
        let testCount = paths.length

        const testCountMatch = stderr.match(/\nTests:.*?(\d+)\stotal/)
        if (testCountMatch) {
          testCount = Number(testCountMatch[1])
        }

        resolve({
          // NOTE: All test result objects are the same. Only the `tests` array
          //   length is what matteres here.
          // TODO: Create individual test result objects.
          tests: new Array(testCount).fill({
            name: 'jest',
            status: err ? TestStatus.Failed : TestStatus.Success,
          }),
          status: RunStatus.Complete,
        })
      })
    })
  }
}
