import JestConfigEditor from '../../src/JestConfigEditor';
import { Config } from 'stryker-api/config';
import { RunnerOptions, RunStatus, TestStatus, TestResult } from 'stryker-api/test_runner';
import * as sinon from 'sinon';
import { expect } from 'chai';
import JestTestRunner from '../../src/JestTestRunner';
import * as path from 'path';
import matchTestResult from '../unit/utils/matchTestResult';

// Get the project root, we will be stub process.cwd later on
const jestProjectRoot = process.cwd();

// Needed for Jest in order to run tests
process.env.BABEL_ENV = 'test';

const FIRST_TEST = 0;

describe('Integration StrykerJestRunner', function () {
  // Set timeout for integration tests to 10 seconds for travis
  this.timeout(10000);

  let jestConfigEditor: JestConfigEditor;
  let runOptions: RunnerOptions;
  let processCwdStub: sinon.SinonStub;
  let sandbox: sinon.SinonSandbox;

  // Partial of the expected test results
  const partialExpectedTestResults: Array<Partial<TestResult>> = [
    { name: 'Add should be able to add two numbers', status: TestStatus.Success },
    { name: 'Add should be able to add one to a number', status: TestStatus.Failed },
    { name: 'Add should be able negate a number', status: TestStatus.Success },
    { name: 'Add should be able to recognize a negative number', status: TestStatus.Success },
    { name: 'Add should be able to recognize that 0 is not a negative number', status: TestStatus.Success },
    { name: 'Circle should have a circumference of 2PI when the radius is 1', status: TestStatus.Failed }
  ];

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    processCwdStub = sandbox.stub(process, 'cwd');

    jestConfigEditor = new JestConfigEditor();

    runOptions = {
      files: [],
      port: 0,
      strykerOptions: new Config
    };
  });

  afterEach(() => sandbox.restore());

  it('should run tests on the example react project', async () => {
    processCwdStub.returns(getProjectRoot('reactProject'));
    runOptions.strykerOptions.set({ jest: { project: 'react' } });

    jestConfigEditor.edit(runOptions.strykerOptions as Config);

    const jestTestRunner = new JestTestRunner(runOptions);

    const result = await jestTestRunner.run();

    expect(result).to.have.property('tests');
    expect(result.tests).to.be.an('array').that.is.not.empty;
    expect(result.tests[FIRST_TEST].name).to.equal('renders without crashing');
    expect(result.tests[FIRST_TEST].status).to.equal(TestStatus.Success);
    expect(result.tests[FIRST_TEST].timeSpentMs).to.be.above(-1);
    expect(result.tests[FIRST_TEST].failureMessages).to.be.an('array').that.is.empty;
    expect(result.status).to.equal(RunStatus.Complete);
  });

  it('should run tests on the example custom project using package.json', async () => {
    processCwdStub.returns(getProjectRoot('exampleProject'));

    jestConfigEditor.edit(runOptions.strykerOptions as Config);
    const jestTestRunner = new JestTestRunner(runOptions);

    const result = await jestTestRunner.run();

    expect(result).to.have.property('tests');
    expect(result.tests).to.be.an('array').with.length(partialExpectedTestResults.length);

    for (const test of result.tests) {
      expect(partialExpectedTestResults.map(testResult => testResult.name)).to.include(test.name);

      const expectedTestResult = matchTestResult(test, partialExpectedTestResults);

      if (expectedTestResult) {
        expect(test.status).to.equal(expectedTestResult.status);
        expect(test.timeSpentMs).to.be.above(-1);
        expect(test.failureMessages).to.be.an('array');
      }
    }

    expect(result.status).to.equal(RunStatus.Complete);
  });

  it('should run tests on the example custom project using jest.config.js', async () => {
    processCwdStub.returns(getProjectRoot('exampleProjectWithExplicitJestConfig'));

    jestConfigEditor.edit(runOptions.strykerOptions as Config);
    const jestTestRunner = new JestTestRunner(runOptions);

    const result = await jestTestRunner.run();

    expect(result).to.have.property('tests');
    expect(result.tests).to.be.an('array').with.length(partialExpectedTestResults.length);

    for (const test of result.tests) {
      expect(partialExpectedTestResults.map(testResult => testResult.name)).to.include(test.name);

      const expectedTestResult = matchTestResult(test, partialExpectedTestResults);

      if (expectedTestResult) {
        expect(test.status).to.equal(expectedTestResult.status);
        expect(test.timeSpentMs).to.be.above(-1);
        expect(test.failureMessages).to.be.an('array');
      }
    }

    expect(result.status).to.equal(RunStatus.Complete);
  });
});

function getProjectRoot(testResource: string) {
  return path.join(jestProjectRoot, 'testResources', testResource);
}