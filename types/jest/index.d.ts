declare namespace Jest {
  // RunCLI does not have any official types, this will do for our implementation
  function runCLI(cliParams: RunCliParameters, projectRoots: Array<String>): any 

  // Taken from https://goo.gl/qHifyP, removed all stuff that we are not using
  // Also added 'runInBand' which does not exist in the official types
  interface RunCliParameters {
    config: string;
    runInBand: boolean;
    silent: boolean;
  }

  // Taken from https://goo.gl/qHifyP, removed all stuff that we are not using
  interface Configuration {
    reporters: Array<string>;
    bail: boolean;
    collectCoverage: boolean;
    verbose: boolean;
    testResultsProcessor: Maybe<string>;
  }

  // Taken from https://goo.gl/h48ajP, removed all stuff that we are not using
  interface AggregatedResult {
      numFailedTests: number;
      numFailedTestSuites: number;
      numPassedTests: number;
      numPassedTestSuites: number;
      numPendingTests: number;
      numPendingTestSuites: number;
      numRuntimeErrorTestSuites: number;
      numTotalTests: number;
      numTotalTestSuites: number;
      startTime: number;
      success: boolean;
      testResults: TestResult[];
      wasInterrupted: boolean;
  }

  // Taken from https://goo.gl/nAzQ4J, removed all stuff that we are not using
  interface TestResult {
    failureMessage: Maybe<string>;
    testResults: Array<AssertionResult>;
  }

  // Taken from https://goo.gl/drWMCB, removed all stuff that we are not using
  interface AssertionResult {
    duration?: Maybe<Milliseconds>;
    failureMessages: string[];
    fullName: string;
    status: Status;
  }

  // 
  type Milliseconds = number;
  type Maybe<T> = void | null | undefined | T;
  type Status = 'passed' | 'failed' | 'skipped' | 'pending';
}

declare module "jest" {
  export = Jest;
}