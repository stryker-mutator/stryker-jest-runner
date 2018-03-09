import { TestResult } from 'stryker-api/test_runner';

export default (testResult: TestResult, expectedTestResults: Array<Partial<TestResult>>): Partial<TestResult> | undefined => {
    return expectedTestResults.find(expectedTestResult => {
        return expectedTestResult.name === testResult.name;
    });
};

