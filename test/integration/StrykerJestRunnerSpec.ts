import JestConfigEditor from '../../src/JestConfigEditor';
import { Config } from 'stryker-api/config';
import { RunnerOptions, RunStatus, TestStatus } from 'stryker-api/test_runner';
import * as sinon from 'sinon';
import { expect } from 'chai';
import JestTestRunner from '../../src/JestTestRunner';
import * as path from 'path';

describe('StrykerJestRunner', () => {
  const jestTestRunnerRoot = process.cwd();

  let jestConfigEditor: JestConfigEditor;
  let runOptions: RunnerOptions;
  let projectRoot = path.join(jestTestRunnerRoot, 'testResources', 'reactProject');
  let getProjectRootStub: sinon.SinonStub;

  let sandbox: sinon.SinonSandbox;

  process.env.BABEL_ENV = 'test';

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    getProjectRootStub = sandbox.stub(process, 'cwd');
    getProjectRootStub.returns(projectRoot);

    jestConfigEditor = new JestConfigEditor;

    runOptions = {
      files: [],
      port: 0,
      strykerOptions: new Config
    };
  });

  afterEach(() => sandbox.restore());

  it('should run tests on the example react project', async () => {
    runOptions.strykerOptions.set({ jest: { project: 'react' } });

    jestConfigEditor.edit(runOptions.strykerOptions as Config);

    const jestTestRunner = new JestTestRunner(runOptions);

    const result = await jestTestRunner.run();

    expect(result).to.have.property('tests');
    expect(result.tests).to.be.an('array').that.is.not.empty;
    expect(result.tests[0].name).to.equal('renders without crashing');
    expect(result.tests[0].status).to.equal(TestStatus.Success);
    expect(result.tests[0].timeSpentMs).to.be.above(0);
    expect(result.tests[0].failureMessages).to.be.an('array').that.is.empty;
    expect(result.status).to.equal(RunStatus.Complete);
  }).timeout(10000);
});