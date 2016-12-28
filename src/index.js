const { TestRunnerFactory } = require('stryker-api/test_runner')
const JestRunner = require('./JestRunner')


TestRunnerFactory.instance().register('jest', JestRunner)
