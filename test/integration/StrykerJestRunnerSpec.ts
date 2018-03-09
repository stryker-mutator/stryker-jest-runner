import JestConfigEditor from '../../src/JestConfigEditor';
import { Config } from 'stryker-api/config';
import { RunnerOptions, RunResult, RunStatus, TestResult, TestStatus } from 'stryker-api/test_runner';
import * as sinon from 'sinon';
import { expect } from 'chai';
import JestTestRunner from '../../src/JestTestRunner';
import * as path from 'path';

// Needed for Jest in order to run tests
process.env.BABEL_ENV = 'test';

// Get the project root, we will be stub process.cwd later on
const jestProjectRoot = process.cwd();

describe('Integration StrykerJestRunner', function () {
  // Set timeout for integration tests to 10 seconds for travis
  this.timeout(10000);

  let jestConfigEditor: JestConfigEditor;
  let runOptions: RunnerOptions;
  let processCwdStub: sinon.SinonStub;
  let sandbox: sinon.SinonSandbox;

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
    const FIRST_TEST = 0;

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

    assertExampleProjectRunResult(result);
  });

  it('should run tests on the example custom project using jest.config.js', async () => {
    processCwdStub.returns(getProjectRoot('exampleProjectWithExplicitJestConfig'));
    jestConfigEditor.edit(runOptions.strykerOptions as Config);
    const jestTestRunner = new JestTestRunner(runOptions);

    const result = await jestTestRunner.run();

    assertExampleProjectRunResult(result);
  });
});

function getProjectRoot(testResource: string) {
  return path.join(jestProjectRoot, 'testResources', testResource);
}

function assertExampleProjectRunResult(result: RunResult) {
  const expectedPartialTestResults: Array<Partial<TestResult>> = [
    { name: 'Add should be able to add two numbers', status: TestStatus.Success },
    { name: 'Add should be able to add one to a number', status: TestStatus.Failed },
    { name: 'Add should be able negate a number', status: TestStatus.Success },
    { name: 'Add should be able to recognize a negative number', status: TestStatus.Success },
    { name: 'Add should be able to recognize that 0 is not a negative number', status: TestStatus.Success },
    { name: 'Circle should have a circumference of 2PI when the radius is 1', status: TestStatus.Failed }
  ];

  expect(result).to.have.property('tests');
  expect(result.tests).to.be.an('array').with.length(expectedPartialTestResults.length);
  expect(result.tests.map(t => ({ name: t.name, status: t.status }))).to.have.deep.members(expectedPartialTestResults);
  expect(result.status).to.equal(RunStatus.Complete);
}