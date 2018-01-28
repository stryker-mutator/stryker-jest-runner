import { RunnerOptions, RunResult, TestRunner, RunStatus, TestResult, TestStatus } from 'stryker-api/test_runner';
import { EventEmitter } from 'events';
import JestTestAdapterFactory from './jestTestAdapters/JestTestAdapterFactory';

export default class JestTestRunner extends EventEmitter implements TestRunner {
  private jestConfig: any;
  private projectRoot: string;

  public constructor(options: RunnerOptions) {
    super();

    this.projectRoot = process.cwd();

    this.jestConfig = options.strykerOptions.jest.config;
    this.jestConfig.rootDir = this.projectRoot;
  }

  public async run(): Promise<RunResult> {
    const jestTestRunner = JestTestAdapterFactory.getJestTestAdapter();

    const { results } = await jestTestRunner.run(this.jestConfig, process.cwd());

    return {
      tests: this.processTestResults(results.testResults),
      status: (results.numRuntimeErrorTestSuites > 0) ? RunStatus.Error : RunStatus.Complete
    };
  }

  private processTestResults(fileResults: Array<any>): Array<TestResult> {
    const testResults: Array<TestResult> = [];

    for (let fileResult of fileResults) {
      for (let testResult of fileResult.testResults) {
        testResults.push({
          name: testResult.fullName,
          status: (testResult.status === 'passed') ? TestStatus.Success : TestStatus.Failed,
          timeSpentMs: testResult.duration,
          failureMessages: testResult.failureMessages
        });
      }
    }

    return testResults;
  }
}