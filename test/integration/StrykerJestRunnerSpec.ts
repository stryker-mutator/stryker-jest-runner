import JestConfigEditor from '../../src/JestConfigEditor';
import { Config } from 'stryker-api/config';
import { RunnerOptions } from 'stryker-api/test_runner'
import * as sinon from 'sinon';
import { expect } from 'chai';
import JestTestRunner from '../../src/JestTestRunner';
import * as path from 'path';

process.env.NODE_ENV = 'test';

describe("StrykerJestRunner", () => {
  const jestTestRunnerRoot = process.cwd();

  let jestConfigEditor: JestConfigEditor;
  let runOptions: RunnerOptions;
  let projectRoot = path.join(jestTestRunnerRoot, 'testResources', 'reactProject');
  let getProjectRootStub: sinon.SinonStub;

  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    getProjectRootStub = sandbox.stub(process, 'cwd');
    getProjectRootStub.returns(projectRoot);

    jestConfigEditor = new JestConfigEditor;

    runOptions = {
      files: [],
      port: 0,
      strykerOptions: new Config
    }
  });

  afterEach(() => sandbox.restore());

  it('should run tests on the example react project', async () => {
    runOptions.strykerOptions.set({ jest: { project: 'react' } });

    jestConfigEditor.edit(runOptions.strykerOptions as Config);

    const jestTestRunner = new JestTestRunner(runOptions);

    const result = await jestTestRunner.run();

    expect(result).to.deep.equal({
      tests:
        [{
          name: 'renders without crashing',
          status: 0,
          timeSpentMs: 13,
          failureMessages: []
        }],
      status: 0
    });
  });
});